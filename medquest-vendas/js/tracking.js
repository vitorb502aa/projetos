/* MedQuest — rastreamento: Meta Pixel, UTMify e preservação de UTMs.
   Nada é carregado se os IDs estiverem vazios em js/config.js. */
(function () {
  "use strict";
  const C = window.MQ_CONFIG || {};
  const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id", "fbclid", "gclid", "src", "sck", "xcod"];
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sem armazenamento */ } }
  };

  // UTMs: o último clique com parâmetros substitui o anterior; o primeiro também fica guardado.
  const q = new URLSearchParams(location.search), now = {};
  KEYS.forEach((k) => { const v = q.get(k); if (v) now[k] = v.slice(0, 200); });
  if (Object.keys(now).length) { store.set("mq_utm_last", now); if (!store.get("mq_utm_first")) store.set("mq_utm_first", now); }
  const utm = () => store.get("mq_utm_last") || {};
  function withUtm(url, extra) {
    if (!url || url.charAt(0) === "#") return url;
    try {
      const u = new URL(url, location.href);
      Object.entries(Object.assign({}, utm(), extra || {})).forEach(([k, v]) => { if (v && !u.searchParams.has(k)) u.searchParams.set(k, v); });
      return u.href;
    } catch (e) { return url; }
  }
  function keepUtmLinks(root) { (root || document).querySelectorAll("a.keep-utm").forEach((a) => { a.href = withUtm(a.getAttribute("href")); }); }

  // Meta Pixel
  if (C.metaPixelId) {
    /* eslint-disable */
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
    window.fbq("init", C.metaPixelId);
    window.fbq("track", "PageView");
  }
  // UTMify (captura e repasse de UTMs para o checkout)
  if (C.utmify && C.utmify.enabled && C.utmify.script) {
    const s = document.createElement("script");
    s.src = C.utmify.script; s.async = true; s.defer = true;
    s.setAttribute("data-utmify-prevent-subids", "");
    document.head.appendChild(s);
  }

  const eid = (name) => name + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  // Dispara um evento uma única vez por chave (evita duplicidades em recarregamentos).
  function track(name, params, opts) {
    opts = opts || {};
    if (opts.onceKey) {
      const k = "mq_ev_" + opts.onceKey;
      try { if ((opts.session ? sessionStorage : localStorage).getItem(k)) return null; (opts.session ? sessionStorage : localStorage).setItem(k, "1"); } catch (e) { /* segue */ }
    }
    const id = opts.eventID || eid(name);
    if (window.fbq) window.fbq("track", name, params || {}, { eventID: id });
    (window.dataLayer = window.dataLayer || []).push({ event: name, eventID: id, ...(params || {}) });
    (window.MQ_EVENTS = window.MQ_EVENTS || []).push({ name, id, params });
    return id;
  }
  window.MQT = { utm, withUtm, keepUtmLinks, track, store };
  document.addEventListener("DOMContentLoaded", () => keepUtmLinks());
})();
