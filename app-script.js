// === CONFIG ===
const SPREADSHEET_ID = '1ZjGBG0oVZXiMcRHBDe2eRVkvMDHnsCX3ZVHhQGY0dGw';
const SHEET_NAME = 'Family Registration';
const DEBUG_SHEET_NAME = 'Debug';

const HEADERS = [
  'Submitted At',
  'Family',
  'Primary First Name',
  'Primary Last Name',
  'Mobile Phone',
  'Number of Kids',
  'Kids First Names',
  'Total Due',
  'Status',
  'Source Timestamp'
];

function doGet() {
  return jsonResponse({ status: 'ok', message: 'Kids Camp registration endpoint is live.' });
}

function doPost(e) {
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
      JSON.stringify({
        kids: row[5],
        names: row[6],
        totalDue: row[7]
      })
    ]);

    return jsonResponse({
      status: 'ok',
      message: 'Registration saved.',
      family: row[1],
      kids: row[5],
      totalDue: row[7]
    });
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
    'Registered',
    sourceTimestamp
  ];
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
