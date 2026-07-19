const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const languageSwitcher = document.querySelector("[data-language-switcher]");
const languageRecommendation = document.querySelector("[data-language-recommendation]");
const languageRecommendationMessage = document.querySelector("[data-language-recommendation-message]");
const languageRecommendationLink = document.querySelector("[data-language-recommendation-link]");
const languageStay = document.querySelector("[data-language-stay]");
const languageClose = document.querySelector("[data-language-close]");

const languagePreferenceKey = "sitereportkit-language-choice";
const localeOptions = {
  "ar": { path: "/ar-SA/", label: "العربية" },
  "ca": { path: "/ca/", label: "Català" },
  "cs": { path: "/cs/", label: "Čeština" },
  "da": { path: "/da/", label: "Dansk" },
  "de": { path: "/de-DE/", label: "Deutsch" },
  "el": { path: "/el/", label: "Ελληνικά" },
  "es": { path: "/es-MX/", label: "Español" },
  "fi": { path: "/fi/", label: "Suomi" },
  "fr": { path: "/fr-FR/", label: "Français" },
  "he": { path: "/he/", label: "עברית" },
  "iw": { path: "/he/", label: "עברית" },
  "hi": { path: "/hi/", label: "हिन्दी" },
  "hr": { path: "/hr/", label: "Hrvatski" },
  "hu": { path: "/hu/", label: "Magyar" },
  "id": { path: "/id/", label: "Bahasa Indonesia" },
  "in": { path: "/id/", label: "Bahasa Indonesia" },
  "it": { path: "/it/", label: "Italiano" },
  "ja": { path: "/ja/", label: "日本語" },
  "ko": { path: "/ko/", label: "한국어" },
  "ms": { path: "/ms/", label: "Bahasa Melayu" },
  "nl": { path: "/nl-NL/", label: "Nederlands" },
  "nb": { path: "/no/", label: "Norsk" },
  "nn": { path: "/no/", label: "Norsk" },
  "no": { path: "/no/", label: "Norsk" },
  "pl": { path: "/pl/", label: "Polski" },
  "pt": { path: "/pt-BR/", label: "Português" },
  "ro": { path: "/ro/", label: "Română" },
  "ru": { path: "/ru/", label: "Русский" },
  "sk": { path: "/sk/", label: "Slovenčina" },
  "sv": { path: "/sv/", label: "Svenska" },
  "th": { path: "/th/", label: "ไทย" },
  "tr": { path: "/tr/", label: "Türkçe" },
  "uk": { path: "/uk/", label: "Українська" },
  "vi": { path: "/vi/", label: "Tiếng Việt" },
};

function storeLanguagePreference(value) {
  try {
    window.localStorage.setItem(languagePreferenceKey, value);
  } catch (_) {
    // Language selection still works when storage is unavailable.
  }
}

function storedLanguagePreference() {
  try {
    return window.localStorage.getItem(languagePreferenceKey);
  } catch (_) {
    return null;
  }
}

function localeSuggestion(locale) {
  if (!locale) return null;
  const normalized = locale.toLowerCase();
  const language = normalized.split("-")[0];
  if (language === "en") return null;
  if (language === "zh") {
    const usesTraditional = /(?:hant|tw|hk|mo)/.test(normalized);
    return usesTraditional
      ? { path: "/zh-Hant/", label: "繁體中文" }
      : { path: "/zh-Hans/", label: "简体中文" };
  }
  return localeOptions[language] ?? null;
}

function dismissLanguageRecommendation(preference = "en") {
  storeLanguagePreference(preference);
  if (languageRecommendation) languageRecommendation.hidden = true;
  document.body.classList.remove("language-recommendation-visible");
}

languageSwitcher?.addEventListener("change", (event) => {
  const path = event.target.value;
  if (!path) return;
  storeLanguagePreference(path === "/" ? "en" : path);
  window.location.assign(path);
});

if (languageRecommendation && !storedLanguagePreference()) {
  const browserLanguages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  const suggestion = browserLanguages.map(localeSuggestion).find(Boolean);
  if (suggestion && languageRecommendationMessage && languageRecommendationLink) {
    languageRecommendationMessage.textContent = `SiteReportKit is available in ${suggestion.label}.`;
    languageRecommendationLink.textContent = `View ${suggestion.label}`;
    languageRecommendationLink.href = suggestion.path;
    languageRecommendationLink.addEventListener("click", () => {
      storeLanguagePreference(suggestion.path);
    });
    languageRecommendation.hidden = false;
    document.body.classList.add("language-recommendation-visible");
  }
}

languageStay?.addEventListener("click", () => dismissLanguageRecommendation());
languageClose?.addEventListener("click", () => dismissLanguageRecommendation());

function syncHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function setNavOpen(isOpen) {
  if (!header || !nav || !navToggle) return;
  document.body.classList.toggle("nav-open", isOpen);
  header.classList.toggle("is-open", isOpen);
  nav.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
}

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

navToggle?.addEventListener("click", () => {
  setNavOpen(!nav?.classList.contains("is-open"));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    setNavOpen(false);
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setNavOpen(false);
  }
});
