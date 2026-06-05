// === CONFIG ===
const SPREADSHEET_ID = '1ZjGBG0oVZXiMcRHBDe2eRVkvMDHnsCX3ZVHhQGY0dGw';
const SHEET_NAME = 'Family Registration';
const DEBUG_SHEET_NAME = 'Debug';
const STRIPE_SECRET_PROP = 'STRIPE_SECRET_KEY';
const PUBLISHED_SITE_URL = 'https://trudan12345.github.io/kids-camp-2026-registration/';
const WEB_APP_URL_FALLBACK = 'https://script.google.com/macros/s/AKfycbz6o-4Zo8QymsJ217SoD2dC9UtlssJqGQiO_SizNKk9BMySxH_kEByJ4uKlohzqpwLYow/exec';

const HEADERS = [
  'Submitted At',
  'Family',
  'Primary First Name',
  'Primary Last Name',
  'Mobile Phone',
  'Number of Kids',
  'Kids First Names',
  'Total Due',
  'Registration Status',
  'Paid',
  'Payment Status',
  'Stripe Checkout Session ID',
  'Stripe Payment Intent ID',
  'Paid At',
  'Source Timestamp'
];

function doGet(e) {
  const action = asString(e && e.parameter && e.parameter.action);

  if (action === 'checkout') {
    return handleCheckoutRequest(e);
  }

  if (action === 'verifyPayment') {
    return handlePaymentVerification(e);
  }

  return jsonResponse({ status: 'ok', message: 'Kids Camp registration endpoint is live.' });
}

function doPost(e) {
  // Kept for compatibility with old clients. New clients use doGet?action=checkout
  // because Apps Script web apps do not provide reliable CORS for readable fetch responses.
  const action = asString(e && e.parameter && e.parameter.action);
  if (action === 'checkout') {
    return handleCheckoutRequest(e);
  }

  return handleRegistrationWriteOnly(e);
}

function handleCheckoutRequest(e) {
  let ss;
  let debugSheet;
  let rowNumber;
  const callback = asString(e && e.parameter && e.parameter.callback);

  try {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    debugSheet = getOrCreateSheet(ss, DEBUG_SHEET_NAME);
    const sheet = getOrCreateSheet(ss, SHEET_NAME);
    ensureHeaderRow(sheet);

    const data = parseCheckoutData(e, debugSheet);
    const row = buildRegistrationRow(data);
    sheet.appendRow(row);
    rowNumber = sheet.getLastRow();

    const session = createStripeCheckoutSession(data, row, rowNumber);
    sheet.getRange(rowNumber, 12, 1, 2).setValues([[session.id, '']]);

    debugSheet.appendRow([
      new Date(),
      'CHECKOUT SESSION CREATED',
      row[1],
      JSON.stringify({ rowNumber, sessionId: session.id, totalDue: row[7] })
    ]);

    if (callback) {
      return javascriptResponse(callback, { status: 'ok', url: session.url, sessionId: session.id });
    }

    return redirectHtml(session.url, 'Opening secure Stripe checkout...');
  } catch (err) {
    try {
      if (!ss) ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      debugSheet = debugSheet || getOrCreateSheet(ss, DEBUG_SHEET_NAME);
      debugSheet.appendRow([new Date(), 'CHECKOUT ERROR', rowNumber || '', String(err)]);
    } catch (_) { }

    if (callback) {
      return javascriptResponse(callback, { status: 'error', message: String(err) });
    }

    return redirectHtml(`${PUBLISHED_SITE_URL}?payment=error&message=${encodeURIComponent(String(err))}`, 'Returning to registration...');
  }
}

function handlePaymentVerification(e) {
  let ss;
  let debugSheet;
  const sessionId = asString(e && e.parameter && e.parameter.session_id);

  try {
    if (!sessionId) throw new Error('Missing Stripe Checkout Session ID.');

    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    debugSheet = getOrCreateSheet(ss, DEBUG_SHEET_NAME);
    const sheet = getOrCreateSheet(ss, SHEET_NAME);
    ensureHeaderRow(sheet);

    const session = retrieveStripeCheckoutSession(sessionId);
    const rowNumber = findRowBySessionId(sheet, sessionId);
    if (!rowNumber) throw new Error(`No registration row found for session ${sessionId}.`);

    const isPaid = session.payment_status === 'paid' || session.status === 'complete';
    if (isPaid) {
      sheet.getRange(rowNumber, 9, 1, 6).setValues([[
        'Registered - paid',
        '✅',
        session.payment_status || 'paid',
        session.id,
        session.payment_intent || '',
        new Date()
      ]]);
    } else {
      sheet.getRange(rowNumber, 9, 1, 5).setValues([[
        'Registered - payment pending',
        '',
        session.payment_status || session.status || 'pending',
        session.id,
        session.payment_intent || ''
      ]]);
    }

    debugSheet.appendRow([
      new Date(),
      'PAYMENT VERIFIED',
      sessionId,
      JSON.stringify({ rowNumber, status: session.status, paymentStatus: session.payment_status })
    ]);

    if (asString(e && e.parameter && e.parameter.mode) === 'silent') {
      return HtmlService.createHtmlOutput(`<!doctype html><html><body>Payment ${isPaid ? 'verified' : 'pending'}.</body></html>`);
    }

    const target = isPaid
      ? `${PUBLISHED_SITE_URL}?payment=success&session_id=${encodeURIComponent(sessionId)}`
      : `${PUBLISHED_SITE_URL}?payment=pending&session_id=${encodeURIComponent(sessionId)}`;
    return redirectHtml(target, 'Payment verified. Returning to registration...');
  } catch (err) {
    try {
      if (!ss) ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      debugSheet = debugSheet || getOrCreateSheet(ss, DEBUG_SHEET_NAME);
      debugSheet.appendRow([new Date(), 'PAYMENT VERIFY ERROR', sessionId, String(err)]);
    } catch (_) { }

    return redirectHtml(`${PUBLISHED_SITE_URL}?payment=error&message=${encodeURIComponent(String(err))}`, 'Returning to registration...');
  }
}

function handleRegistrationWriteOnly(e) {
  let ss;
  let debugSheet;

  try {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    debugSheet = getOrCreateSheet(ss, DEBUG_SHEET_NAME);

    const data = parseRequestData(e, debugSheet);
    const row = buildRegistrationRow(data);
    const sheet = getOrCreateSheet(ss, SHEET_NAME);
    ensureHeaderRow(sheet);
    sheet.appendRow(row);

    debugSheet.appendRow([
      new Date(),
      'REGISTRATION WRITE SUCCESS',
      row[1],
      JSON.stringify({ kids: row[5], names: row[6], totalDue: row[7] })
    ]);

    return jsonResponse({ status: 'ok', message: 'Registration saved.', family: row[1], kids: row[5], totalDue: row[7] });
  } catch (err) {
    try {
      if (!ss) ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      debugSheet = debugSheet || getOrCreateSheet(ss, DEBUG_SHEET_NAME);
      debugSheet.appendRow([new Date(), 'REGISTRATION WRITE ERROR', String(err)]);
    } catch (_) { }

    return jsonResponse({ status: 'error', message: String(err) });
  }
}

function buildRegistrationRow(data) {
  const primaryFirstName = asString(data.primaryFirstName);
  const primaryLastName = asString(data.primaryLastName);
  const phone = asString(data.phone);
  const kids = Math.max(1, Number(data.kids || data.kidCount || 1) || 1);
  const kidNames = normalizeNameList(data.kidNames);
  const totalDue = Number(data.sheetCost || data.totalCost || kids * 35) || 0;
  const family = primaryLastName ? `${primaryLastName} family` : 'Family';
  const sourceTimestamp = asString(data.timestamp);

  if (!primaryFirstName) throw new Error('Primary first name is required.');
  if (!primaryLastName) throw new Error('Last name is required.');
  if (!phone) throw new Error('Mobile phone is required.');
  if (kidNames.length !== kids) {
    throw new Error(`Expected ${kids} kid name(s), received ${kidNames.length}.`);
  }
  if (kidNames.some((name) => !name)) {
    throw new Error('Every kid first name is required.');
  }

  return [
    new Date(),
    family,
    primaryFirstName,
    primaryLastName,
    phone,
    kids,
    kidNames.join(', '),
    totalDue,
    'Registered - payment pending',
    '',
    'unpaid',
    '',
    '',
    '',
    sourceTimestamp
  ];
}

function createStripeCheckoutSession(data, row, rowNumber) {
  const secretKey = PropertiesService.getScriptProperties().getProperty(STRIPE_SECRET_PROP);
  if (!secretKey) throw new Error('Stripe sandbox secret key is not configured in Apps Script properties.');

  const amount = Math.round(Number(row[7]) * 100);
  if (!amount || amount < 50) throw new Error('Payment amount is invalid.');

  const family = row[1];
  const description = `${row[5]} kid${Number(row[5]) === 1 ? '' : 's'}: ${row[6]}`;
  const successUrl = `${PUBLISHED_SITE_URL}?payment=success&session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${PUBLISHED_SITE_URL}?payment=cancelled`;

  const payload = {
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    client_reference_id: String(rowNumber),
    'line_items[0][quantity]': '1',
    'line_items[0][price_data][currency]': 'usd',
    'line_items[0][price_data][unit_amount]': String(amount),
    'line_items[0][price_data][product_data][name]': 'Kids Camp 2026 Registration',
    'line_items[0][price_data][product_data][description]': description,
    'metadata[registration_row]': String(rowNumber),
    'metadata[family]': family,
    'metadata[primary_first_name]': row[2],
    'metadata[primary_last_name]': row[3],
    'metadata[phone]': row[4],
    'metadata[kids]': String(row[5]),
    'metadata[kid_names]': row[6]
  };

  const response = UrlFetchApp.fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'post',
    payload,
    headers: { Authorization: `Bearer ${secretKey}` },
    muteHttpExceptions: true
  });

  const status = response.getResponseCode();
  const body = response.getContentText();
  const session = JSON.parse(body);

  if (status < 200 || status >= 300) {
    throw new Error(`Stripe Checkout failed: ${session.error && session.error.message ? session.error.message : body}`);
  }
  if (!session.url) throw new Error('Stripe did not return a Checkout URL.');

  return session;
}

function retrieveStripeCheckoutSession(sessionId) {
  const secretKey = PropertiesService.getScriptProperties().getProperty(STRIPE_SECRET_PROP);
  if (!secretKey) throw new Error('Stripe sandbox secret key is not configured in Apps Script properties.');

  const response = UrlFetchApp.fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, {
    method: 'get',
    headers: { Authorization: `Bearer ${secretKey}` },
    muteHttpExceptions: true
  });

  const status = response.getResponseCode();
  const body = response.getContentText();
  const session = JSON.parse(body);

  if (status < 200 || status >= 300) {
    throw new Error(`Stripe session lookup failed: ${session.error && session.error.message ? session.error.message : body}`);
  }

  return session;
}

function findRowBySessionId(sheet, sessionId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;

  const values = sheet.getRange(2, 12, lastRow - 1, 1).getValues();
  for (let i = 0; i < values.length; i += 1) {
    if (asString(values[i][0]) === sessionId) {
      return i + 2;
    }
  }
  return null;
}

function parseCheckoutData(e, debugSheet) {
  const body = e && e.postData && typeof e.postData.contents === 'string'
    ? e.postData.contents.trim()
    : '';
  const params = body ? parseFormBody(body) : ((e && e.parameter) || {});
  const encoded = asString(params.data);
  if (!encoded) throw new Error('Missing registration data.');

  try {
    const data = JSON.parse(encoded);
    debugSheet.appendRow([new Date(), 'PARSE MODE', 'CHECKOUT GET JSON']);
    return data;
  } catch (err) {
    debugSheet.appendRow([new Date(), 'CHECKOUT JSON PARSE FAILED', String(err)]);
    throw new Error('Registration data could not be read.');
  }
}

function parseFormBody(body) {
  return body.split('&').reduce((params, part) => {
    const [rawKey, rawValue = ''] = part.split('=');
    if (!rawKey) return params;
    const key = decodeURIComponent(rawKey.replace(/\+/g, ' '));
    params[key] = decodeURIComponent(rawValue.replace(/\+/g, ' '));
    return params;
  }, {});
}

function parseRequestData(e, debugSheet) {
  const body = e && e.postData && typeof e.postData.contents === 'string'
    ? e.postData.contents.trim()
    : '';

  if (!body) {
    debugSheet.appendRow([new Date(), 'PARSE MODE', 'PARAMETER ONLY']);
    return (e && e.parameter) || {};
  }

  try {
    const data = JSON.parse(body);
    debugSheet.appendRow([new Date(), 'PARSE MODE', 'JSON']);
    return data;
  } catch (err) {
    debugSheet.appendRow([new Date(), 'JSON PARSE FAILED', String(err)]);
    return (e && e.parameter) || {};
  }
}

function normalizeNameList(value) {
  if (Array.isArray(value)) {
    return value.map(asString).filter(Boolean);
  }
  const text = asString(value);
  if (!text) return [];
  return text.split(',').map(asString).filter(Boolean);
}

function ensureHeaderRow(sheet) {
  const lastColumn = Math.max(sheet.getLastColumn(), HEADERS.length);
  const currentHeaders = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  const hasHeaders = currentHeaders.some((value) => asString(value));

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
    return;
  }

  const needsHeaderUpdate = HEADERS.some((header, index) => currentHeaders[index] !== header);
  if (needsHeaderUpdate) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function getOrCreateSheet(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function asString(value) {
  return value == null ? '' : String(value).trim();
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function javascriptResponse(callback, payload) {
  if (!/^[A-Za-z_$][0-9A-Za-z_$]*(\.[A-Za-z_$][0-9A-Za-z_$]*)*$/.test(callback)) {
    return ContentService.createTextOutput('/* Invalid callback */')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService.createTextOutput(`${callback}(${JSON.stringify(payload)});`)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function getWebAppUrl() {
  return ScriptApp.getService().getUrl() || WEB_APP_URL_FALLBACK;
}

function redirectHtml(url, message) {
  const safeUrl = String(url).replace(/"/g, '%22');
  const safeMessage = String(message || 'Redirecting...')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  return HtmlService.createHtmlOutput(`<!doctype html>
<html><head><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="0;url=${safeUrl}"><title>Kids Camp Payment</title></head>
<body style="font-family:system-ui,sans-serif;padding:24px;color:#123a6f;background:#f7fdfe;">
  <p>${safeMessage}</p>
  <p><a href="${safeUrl}">Continue</a></p>
  <script>window.top.location.replace(${JSON.stringify(safeUrl)});</script>
</body></html>`);
}

function testRegistrationWrite() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        primaryFirstName: 'Test',
        primaryLastName: 'Family',
        phone: '555-0100',
        kids: 2,
        kidNames: ['Ava', 'Noah'],
        sheetCost: '70',
        totalCost: '70',
        timestamp: new Date().toISOString()
      })
    }
  };

  Logger.log(doPost(fakeEvent).getContent());
}

function authorizeStripeAccess() {
  const secretKey = PropertiesService.getScriptProperties().getProperty(STRIPE_SECRET_PROP);
  Logger.log(secretKey ? 'Stripe key is configured.' : 'Stripe key is missing.');
  const response = UrlFetchApp.fetch('https://api.stripe.com/v1/checkout/sessions?limit=1', {
    method: 'get',
    headers: { Authorization: `Bearer ${secretKey || ''}` },
    muteHttpExceptions: true
  });
  Logger.log(response.getResponseCode());
}
