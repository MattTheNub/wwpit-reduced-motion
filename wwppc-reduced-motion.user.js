// ==UserScript==
// @name         WWPPC Reduced Motion
// @namespace    https://wwppc.org/
// @version      1.0.2
// @description  Reduces motion on wwppc.org by disabling glitch text and first-load slide animations.
// @author       user
// @match        https://wwppc.org/*
// @match        https://www.wwppc.org/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const LOCAL_SETTINGS_KEY = "wwppc_localSettings_1667c425-1308-4b51-ae47-c913ab4215f9";

  const CSS = `
    html {
      scroll-behavior: auto !important;
    }

    #loadingCover,
    #loadingCoverBar {
      animation: none !important;
      transition: none !important;
    }

    #loadingCoverBar {
      background-position: 50% 50% !important;
      background-size: 100% 100% !important;
    }

    .animHidden.anim-slideUp,
    .animShow.anim-slideUp,
    .animHidden.anim-fade,
    .animShow.anim-fade {
      opacity: 1 !important;
      transform: none !important;
      animation: none !important;
      transition: none !important;
    }

    .panelBodyTransitionWipeContainer,
    .panelHeaderTransitionWipeContainer {
      display: none !important;
    }

    .panelBodySlotContainer,
    .panelHeader,
    .panelView,
    .loadingCoverContainer,
    .main-enter-active,
    .main-leave-active,
    .second-enter-active,
    .second-leave-active {
      animation-duration: 1ms !important;
      transition-duration: 1ms !important;
    }

    .main-enter-from,
    .main-leave-to,
    .second-enter-from,
    .second-leave-to {
      transform: none !important;
    }

    .glowTextFlashing,
    .glowTextFlashingColor,
    .loginLogoFloater,
    .scrollIndicator {
      animation: none !important;
    }
  `;

  function setGlitchTextOff() {
    try {
      const current = localStorage.getItem(LOCAL_SETTINGS_KEY);
      const parsed = current ? JSON.parse(current) : {};

      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify({ enableGlitchText: false }));
        return;
      }

      localStorage.setItem(
        LOCAL_SETTINGS_KEY,
        JSON.stringify({ ...parsed, enableGlitchText: false })
      );
    } catch (_error) {
      try {
        localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify({ enableGlitchText: false }));
      } catch (_innerError) {
        // Ignore: CSS still handles the load and slide animations.
      }
    }
  }

  function addStyle() {
    if (document.getElementById("wwppc-reduced-motion-style")) {
      return;
    }

    const target = document.head || document.documentElement;
    if (!target) {
      return;
    }

    const style = document.createElement("style");
    style.id = "wwppc-reduced-motion-style";
    style.textContent = CSS;
    target.appendChild(style);
  }

  setGlitchTextOff();
  addStyle();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addStyle, { once: true });
  }
})();
