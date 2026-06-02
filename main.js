const COSTS = { kid: 35 };
const TRANSLATIONS = {
  en: {
    countdownHeading: "New Year starts in",
    heroBadge: "New Year's Celebration 2025-2026 Form",
    step1Pill: "Step 1",
    step1Label: "Adult/guardian Contact",
    primaryFirstNameLabel: "Primary First Name",
    firstNamePlaceholder: "First name",
    lastNamePlaceholder: "Last name",
    phonePlaceholder: "Phone number",
    lastNameLabel: "Last Name",
    mobilePhoneLabel: "Mobile Phone",
    spouseFirstNameLabel: "Spouse First Name",
    spouseFirstNameNote: "Do not fill if not applicable",
    step2Pill: "Step 2",
    step2Label: "Attendance Details",
    step2Subtext:
      "Registration is open for kids at a flat rate of $35.",
    adultsFieldLabel: "Adults (14+)",
    childrenFieldLabel: "Number of Kids",
    toddlersFieldLabel: "Children (0-5)",
    priceNote: "$35 per child",
    primaryFirstNameRequired: "Primary first name is required.",
    lastNameRequired: "Last name is required.",
    phoneRequired: "Mobile phone is required.",
    step3Pill: "Step 3",
    step3Label: "First Names",
    step3Subtext: "Please enter the first name of each kid.",
    adultTableHeading: "Adult First Names (14+)",
    childTableHeading: "Child First Names (6-13)",
    toddlerTableHeading: "Toddler First Names (0-5)",
    childTableNote: "We'll have something special for each child. List them here.",
    submitButton: "Submit Registration",
    paymentHeading: "Submitted! You will be approved after payment.",
    paymentDescription:
      "Thank you for registering. To finalize your family reservation, please send your payment right away using one of the options below. Include the memo so we can match it quickly.",
    paymentZelleLabel: "Zelle",
    paymentCashAppLabel: "Cash App",
    paymentMemoLabel: "Memo",
    daysLabel: "days",
    successMessage: "Form successfully submitted.",
    successTotalLabel: "Your total is",
    cardPaymentEyebrow: "Secure card payment",
    cardPaymentDueLabel: "Amount due",
    feeLabel: "fees",
    payButtonLabel: "Pay now",
    payButtonProcessing: "Processing...",
    paymentUnavailable: "Card payments are unavailable right now. Please use another option.",
    paymentSuccess: "Payment received! You're all set.",
    cashPaymentNote: "<strong>Cash Option:</strong> You can bring cash directly to Daniel Trushkov.",
    adultLabel: "Adult",
    childLabel: "Child",
    toddlerLabel: "Toddler",
    submittingMessage: "Submitting...",
    genericError: "Unknown error",
    tryAgainMessage: "Please try again.",
    paymentLoadError: "Failed to load payment form. Please refresh and try again.",
    paymentFailed: "Payment could not be completed.",
    serverResponseError: "Unable to read server response.",
    finalSuccessTitle: "You're all set!",
    finalSuccessBody: "Your registration was received.",
    kidsCampTitle: "Kids Camp 2026",
    kidsCampSubtitle: "June 26-27",
    submitButtonText: "Register Now",
  },
  es: {
    countdownHeading: "El Año Nuevo comienza en",
    heroBadge: "Formulario Celebración de Año Nuevo 2025-2026",
    step1Pill: "Paso 1",
    step1Label: "Contacto del adulto/tutor",
    primaryFirstNameLabel: "Nombre del responsable",
    firstNamePlaceholder: "Nombre",
    lastNamePlaceholder: "Apellido",
    phonePlaceholder: "Número de teléfono",
    lastNameLabel: "Apellido",
    mobilePhoneLabel: "Teléfono móvil",
    spouseFirstNameLabel: "Nombre del cónyuge",
    spouseFirstNameNote: "No llenar si no aplica",
    step2Pill: "Paso 2",
    step2Label: "Detalles de asistencia",
    step2Subtext:
      "El registro está abierto para niños a una tarifa plana de $35.",
    adultsFieldLabel: "Adultos (14+)",
    childrenFieldLabel: "Número de niños",
    toddlersFieldLabel: "Niños (0-5)",
    priceNote: "$35 por niño",
    primaryFirstNameRequired: "El nombre del responsable es obligatorio.",
    lastNameRequired: "El apellido es obligatorio.",
    phoneRequired: "El teléfono móvil es obligatorio.",
    step3Pill: "Paso 3",
    step3Label: "Nombres",
    step3Subtext: "Por favor ingrese el primer nombre de cada niño.",
    adultTableHeading: "Nombres de adultos",
    childTableHeading: "Nombres de niños (6-13)",
    toddlerTableHeading: "Nombres de niños (0-5)",
    childTableNote: "Tenemos algo especial para cada niño. Escríbelos aquí.",
    submitButton: "Enviar registro",
    paymentHeading: "¡Enviado! Serás aprobado después del pago.",
    paymentDescription:
      "Gracias por registrarte. Para finalizar tu reserva familiar, envía tu pago ahora utilizando una de las siguientes opciones. Incluye la nota para identificarlo.",
    paymentZelleLabel: "Zelle",
    paymentCashAppLabel: "Cash App",
    paymentMemoLabel: "Nota",
    daysLabel: "días",
    successMessage: "Formulario enviado con éxito.",
    successTotalLabel: "Tu total es",
    cardPaymentEyebrow: "Pago con tarjeta seguro",
    cardPaymentDueLabel: "Monto a pagar",
    feeLabel: "comisiones",
    payButtonLabel: "Pagar ahora",
    payButtonProcessing: "Procesando...",
    paymentUnavailable: "Los pagos con tarjeta no están disponibles. Usa otra opción.",
    paymentSuccess: "¡Pago recibido! Todo listo.",
    cashPaymentNote: "<strong>Opción en efectivo:</strong> Puedes entregar el efectivo directamente a Daniel Trushkov.",
    adultLabel: "Adulto",
    childLabel: "Niño",
    toddlerLabel: "Pequeño",
    submittingMessage: "Enviando...",
    genericError: "Error desconocido",
    tryAgainMessage: "Inténtalo de nuevo.",
    paymentLoadError: "No se pudo cargar el formulario de pago. Actualiza e inténtalo de nuevo.",
    paymentFailed: "No se pudo completar el pago.",
    serverResponseError: "No se pudo leer la respuesta del servidor.",
    finalSuccessTitle: "Todo listo",
    finalSuccessBody: "Recibimos tu registro.",
    kidsCampTitle: "Campamento de Niños 2026",
    kidsCampSubtitle: "26-27 de Junio",
    submitButtonText: "Registrarse ahora",
  },
  ru: {
    countdownHeading: "До Нового года осталось",
    heroBadge: "Форма регистрации Новогодний праздник 2025-2026",
    step1Pill: "Шаг 1",
    step1Label: "Контактные данные взрослого/опекуна",
    primaryFirstNameLabel: "Имя ответственного",
    firstNamePlaceholder: "Имя",
    lastNamePlaceholder: "Фамилия",
    phonePlaceholder: "Номер телефона",
    lastNameLabel: "Фамилия",
    mobilePhoneLabel: "Мобильный телефон",
    spouseFirstNameLabel: "Имя супруга(и)",
    spouseFirstNameNote: "Не заполняйте, если не применимо",
    step2Pill: "Шаг 2",
    step2Label: "Детали посещения",
    step2Subtext:
      "Регистрация открыта для детей по фиксированной стоимости $35.",
    adultsFieldLabel: "Взрослые (14+)",
    childrenFieldLabel: "Количество детей",
    toddlersFieldLabel: "Дети (0-5)",
    priceNote: "$35 за ребенка",
    primaryFirstNameRequired: "Имя ответственного обязательно.",
    lastNameRequired: "Фамилия обязательна.",
    phoneRequired: "Необходим мобильный телефон.",
    step3Pill: "Шаг 3",
    step3Label: "Имена",
    step3Subtext: "Пожалуйста, введите имя каждого ребенка.",
    adultTableHeading: "Имена взрослых",
    childTableHeading: "Имена детей (6-13)",
    toddlerTableHeading: "Имена детей (0-5)",
    childTableNote: "Для каждого ребенка приготовлен сюрприз — перечислите их.",
    submitButton: "Отправить регистрацию",
    paymentHeading: "Заявка отправлена! Подтверждение после оплаты.",
    paymentDescription:
      "Спасибо за регистрацию. Чтобы закрепить место, оплатите одним из способов ниже и укажите пометку.",
    paymentZelleLabel: "Zelle",
    paymentCashAppLabel: "Cash App",
    paymentMemoLabel: "Пометка",
    daysLabel: "дней",
    successMessage: "Форма успешно отправлена.",
    successTotalLabel: "Ваш итог",
    cardPaymentEyebrow: "Безопасная оплата картой",
    cardPaymentDueLabel: "Сумма к оплате",
    feeLabel: "комиссия",
    payButtonLabel: "Оплатить",
    payButtonProcessing: "Обработка...",
    paymentUnavailable: "Оплата картой сейчас недоступна. Выберите другой способ.",
    paymentSuccess: "Платеж получен! Все готово.",
    cashPaymentNote: "<strong>Наличные:</strong> Вы можете передать наличные лично Даниилу Трушкову.",
    adultLabel: "Взрослый",
    childLabel: "Ребенок",
    toddlerLabel: "Малыш",
    submittingMessage: "Отправка...",
    genericError: "Неизвестная ошибка",
    tryAgainMessage: "Пожалуйста, попробуйте еще раз.",
    paymentLoadError: "Не удалось загрузить форму оплаты. Обновите страницу и попробуйте снова.",
    paymentFailed: "Не удалось завершить оплату.",
    serverResponseError: "Не удалось прочитать ответ сервера.",
    finalSuccessTitle: "Все готово!",
    finalSuccessBody: "Ваша регистрация получена.",
    kidsCampTitle: "Детский лагерь 2026",
    kidsCampSubtitle: "26-27 Июня",
    submitButtonText: "Зарегистрироваться",
  },
  uk: {
    countdownHeading: "До Нового року залишилося",
    heroBadge: "Форма реєстрації Новорічне свято 2025-2026",
    step1Pill: "Крок 1",
    step1Label: "Контактні дані дорослого/опікуна",
    primaryFirstNameLabel: "Ім'я відповідального",
    firstNamePlaceholder: "Ім'я",
    lastNamePlaceholder: "Прізвище",
    phonePlaceholder: "Номер телефону",
    lastNameLabel: "Прізвище",
    mobilePhoneLabel: "Мобільний телефон",
    spouseFirstNameLabel: "Ім'я чоловіка/дружини",
    spouseFirstNameNote: "Не заповнюйте, якщо не застосовується",
    step2Pill: "Крок 2",
    step2Label: "Деталі відвідування",
    step2Subtext:
      "Реєстрація відкрита для дітей за фіксованою вартістю $35.",
    adultsFieldLabel: "Дорослі (14+)",
    childrenFieldLabel: "Кількість дітей",
    toddlersFieldLabel: "Діти (0-5)",
    priceNote: "$35 за дитину",
    primaryFirstNameRequired: "Ім'я відповідального обов'язкове.",
    lastNameRequired: "Прізвище обов'язкове.",
    phoneRequired: "Потрібен мобільний телефон.",
    step3Pill: "Крок 3",
    step3Label: "Імена",
    step3Subtext: "Будь ласка, введіть ім'я кожної дитини.",
    adultTableHeading: "Імена дорослих",
    childTableHeading: "Імена дітей (6-13)",
    toddlerTableHeading: "Імена дітей (0-5)",
    childTableNote: "Для кожної дитини готуємо щось особливе — впишіть їх тут.",
    submitButton: "Надіслати реєстрацію",
    paymentHeading: "Надіслано! Після оплати вас підтвердять.",
    paymentDescription:
      "Дякуємо за реєстрацію. Щоб зафіксувати місця, оплатіть одним із способів і додайте примітку.",
    paymentZelleLabel: "Zelle",
    paymentCashAppLabel: "Cash App",
    paymentMemoLabel: "Примітка",
    daysLabel: "днів",
    successMessage: "Форму успішно надіслано.",
    successTotalLabel: "Ваш підсумок",
    cardPaymentEyebrow: "Безпечна оплата карткою",
    cardPaymentDueLabel: "Сума до оплати",
    feeLabel: "комісія",
    payButtonLabel: "Сплатити",
    payButtonProcessing: "Обробка...",
    paymentUnavailable: "Оплата карткою зараз недоступна. Скористайтесь іншим способом.",
    paymentSuccess: "Платіж отримано! Все готово.",
    cashPaymentNote: "<strong>Готівка:</strong> Ви можете передати готівку особисто Даниїлу Трушкову.",
    adultLabel: "Дорослий",
    childLabel: "Дитина",
    toddlerLabel: "Малюк",
    submittingMessage: "Надсилання...",
    genericError: "Невідома помилка",
    tryAgainMessage: "Будь ласка, спробуйте ще раз.",
    paymentLoadError: "Не вдалося завантажити форму оплати. Оновіть сторінку й спробуйте знову.",
    paymentFailed: "Не вдалося завершити оплату.",
    serverResponseError: "Не вдалося прочитати відповідь сервера.",
    finalSuccessTitle: "Усе готово!",
    finalSuccessBody: "Вашу реєстрацію отримано.",
    kidsCampTitle: "Дитячий табір 2026",
    kidsCampSubtitle: "26-27 Червня",
    submitButtonText: "Зареєструватися",
  },
};

const getPreferredLocale = () => {
  const locale = (navigator.language || "").toLowerCase();
  if (locale.startsWith("uk") || locale.startsWith("ua")) return "uk";
  if (locale.startsWith("ru")) return "ru";
  if (locale.startsWith("es")) return "es";
  return "en";
};

let activeLocale = getPreferredLocale();
let activeStrings = TRANSLATIONS[activeLocale] || TRANSLATIONS.en;

const getString = (key) =>
  (activeStrings && activeStrings[key]) || TRANSLATIONS.en[key] || "";

const applyTranslations = () => {
  document.documentElement.lang = activeLocale;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const text = getString(key);
    if (text) {
      if (key === 'cashPaymentNote') {
        el.innerHTML = text; // User innerHTML for the bold tag
      } else {
        el.textContent = text;
      }
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    const text = getString(key);
    if (text) {
      el.setAttribute("placeholder", text);
    }
  });

};

const form = document.getElementById("registrationForm");
const kidInput = document.getElementById("kidCount");
const kidList = document.getElementById("kidList");
const kidTable = document.getElementById("kidTable");
const statusEl = document.getElementById("status");
const finalSuccess = document.getElementById("finalSuccess");
const primaryFirstNameEl = document.getElementById("primaryFirstName");
const primaryLastNameEl = document.getElementById("primaryLastName");
const phoneInput = document.getElementById("phone");

const requiredFields = [
  { input: primaryFirstNameEl, key: "primaryFirstNameRequired" },
  { input: primaryLastNameEl, key: "lastNameRequired" },
  { input: phoneInput, key: "phoneRequired" },
];

const validateRequiredFields = () => {
  let valid = true;
  requiredFields.forEach(({ input, key }) => {
    if (!input) return;
    if (!input.value.trim()) {
      input.setCustomValidity(getString(key) || "Required");
      valid = false;
    } else {
      input.setCustomValidity("");
    }
  });
  if (!form.reportValidity()) {
    valid = false;
  }
  return valid;
};

requiredFields.forEach(({ input }) => {
  if (!input) return;
  input.addEventListener("input", () => input.setCustomValidity(""));
});

const mainScriptTag = document.querySelector('script[src*="main.js"]');
const scriptURL = mainScriptTag?.getAttribute("data-script-url") ||
  "https://script.google.com/macros/s/AKfycbwLAtysOX9sqlWLeb9HAIgEnXeyHhUz8FQrfhYOYNQdPEZM3vHvicg0z4fk8n3QH-HSSg/exec";

const buildNameInputs = () => {
  const kidCount = Number(kidInput.value) || 0;

  const existingKidValues = Array.from(kidList.querySelectorAll("input")).map(
    (input) => input.value.trim()
  );

  kidList.innerHTML = "";

  kidTable.style.display = kidCount ? "block" : "none";
  for (let i = 0; i < kidCount; i += 1) {
    const wrapper = document.createElement("label");
    wrapper.textContent = `Kid ${i + 1}`;
    const input = document.createElement("input");
    input.type = "text";
    input.required = true;
    input.placeholder = getString("firstNamePlaceholder") || "First name";
    input.value = existingKidValues[i] || "";
    wrapper.appendChild(input);
    kidList.appendChild(wrapper);
  }
};


primaryFirstNameEl.addEventListener("input", buildNameInputs);
kidInput.addEventListener("input", () => {
  if (kidInput.value === "") return;
  buildNameInputs();
});
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusEl.style.display = "none";
  statusEl.textContent = "";
  statusEl.className = "status-message";

  if (!validateRequiredFields()) {
    return;
  }

  const subtotal = Number(kidInput.value || 0) * COSTS.kid;
  const kidNames = Array.from(kidList.querySelectorAll("input")).map((input) =>
    input.value.trim()
  );

  const payload = {
    primaryFirstName: primaryFirstNameEl.value.trim(),
    primaryLastName: primaryLastNameEl.value.trim(),
    phone: phoneInput.value.trim(),
    kids: Number(kidInput.value) || 0,
    kidNames,
    totalCost: String(subtotal),
    sheetCost: String(subtotal),
    timestamp: new Date().toISOString(),
  };

  // Show spinner
  const submitLoader = document.getElementById("submit-loader");
  if (submitLoader) submitLoader.style.display = "block";

  statusEl.textContent = getString("submittingMessage") || "Submitting...";
  statusEl.classList.add("helper-text");
  statusEl.style.display = "block";

  try {
    // Use no-cors to avoid preflight CORS errors when calling Apps Script web apps.
    // Apps Script will still receive the request and write to the sheet even though
    // the browser returns an opaque response.
    await fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    // Assume the write succeeded (response is opaque in no-cors)
    form.reset();
    buildNameInputs();

    statusEl.textContent = "";
    statusEl.className = "status-message";
    statusEl.style.display = "none";

    form.style.display = "none";
    if (finalSuccess) {
      finalSuccess.style.display = "block";
      finalSuccess.scrollIntoView({ behavior: "smooth" });
    }

    const successFooter = document.getElementById("successFooter");
    if (successFooter) successFooter.style.display = "block";
  } catch (err) {
    console.error(err);
    statusEl.textContent = `Error: ${err.message || getString("genericError") || "Unknown error"}. ${getString("tryAgainMessage") || "Please try again."}`;
    statusEl.className = "status-message error";
    statusEl.style.display = "block";
    if (finalSuccess) finalSuccess.style.display = "none";
  } finally {
    // Hide spinner
    if (submitLoader) submitLoader.style.display = "none";
  }
});

applyTranslations();
buildNameInputs();
