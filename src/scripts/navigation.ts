const menuButton = document.querySelector<HTMLButtonElement>("[data-menu-button]");
const closeButton = document.querySelector<HTMLButtonElement>("[data-menu-close]");
const drawer = document.querySelector<HTMLElement>("[data-mobile-drawer]");
const overlay = document.querySelector<HTMLElement>("[data-nav-overlay]");
const drawerLinks = document.querySelectorAll<HTMLAnchorElement>("[data-mobile-drawer] a");
const header = document.querySelector<HTMLElement>("[data-enterprise-header]");
const megaTriggers = document.querySelectorAll<HTMLButtonElement>("[data-mega-trigger]");
const megaPanels = document.querySelectorAll<HTMLElement>("[data-mega-panel]");
const accordionTriggers = document.querySelectorAll<HTMLButtonElement>("[data-accordion-trigger]");

const setMenuState = (isOpen: boolean) => {
  if (!menuButton || !drawer || !overlay) return;
  menuButton.setAttribute("aria-expanded", String(isOpen));
  drawer.classList.toggle("translate-x-full", !isOpen);
  drawer.classList.toggle("translate-x-0", isOpen);
  overlay.classList.toggle("hidden", !isOpen);
  document.body.classList.toggle("nav-open", isOpen);
};

const closeMegaMenus = () => {
  megaTriggers.forEach((trigger) => {
    trigger.setAttribute("aria-expanded", "false");
  });
  megaPanels.forEach((panel) => {
    panel.classList.add("pointer-events-none", "opacity-0");
    panel.classList.remove("pointer-events-auto", "opacity-100");
  });
};

const openMegaMenu = (trigger: HTMLButtonElement) => {
  const panelId = trigger.getAttribute("aria-controls");
  if (!panelId) return;
  closeMegaMenus();
  trigger.setAttribute("aria-expanded", "true");
  document.getElementById(panelId)?.classList.remove("pointer-events-none", "opacity-0");
  document.getElementById(panelId)?.classList.add("pointer-events-auto", "opacity-100");
};

const closeAccordions = (except?: HTMLButtonElement) => {
  accordionTriggers.forEach((trigger) => {
    if (trigger === except) return;
    trigger.setAttribute("aria-expanded", "false");
    const panelId = trigger.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;
    if (panel) panel.classList.remove("is-open");
  });
};

menuButton?.addEventListener("click", () => setMenuState(true));
closeButton?.addEventListener("click", () => setMenuState(false));
overlay?.addEventListener("click", () => setMenuState(false));

drawerLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

megaTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const isOpen = trigger.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMegaMenus();
    } else {
      openMegaMenu(trigger);
    }
  });
});

document.addEventListener("click", (event) => {
  if (!header?.contains(event.target as Node)) {
    closeMegaMenus();
  }
});

accordionTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const panelId = trigger.getAttribute("aria-controls");
    if (!panelId) return;
    const isOpen = trigger.getAttribute("aria-expanded") === "true";
    closeAccordions(trigger);
    trigger.setAttribute("aria-expanded", String(!isOpen));
    const panel = document.getElementById(panelId);
    if (panel) panel.classList.toggle("is-open", !isOpen);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
    closeMegaMenus();
    closeAccordions();
  }
});
