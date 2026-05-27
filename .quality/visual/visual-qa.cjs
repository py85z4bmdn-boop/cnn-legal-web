const assert = require("node:assert/strict");
const { chromium } = require("playwright");

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:4321";

const normalize = (value) => value.replace(/\s+/g, " ").replace(/⌄/g, "").trim();

const waitForPanel = async (page, selector) => {
  await page.waitForFunction((panelSelector) => {
    const panel = document.querySelector(panelSelector);
    return panel && getComputedStyle(panel).opacity === "1";
  }, selector);
};

const capturePage = async (page, path, artifact) => {
  await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
  await page.keyboard.press("Escape");
  await page.mouse.move(16, 900);
  await page.waitForTimeout(150);
  await page.screenshot({ path: `.quality/visual/${artifact}`, fullPage: true });
};

(async () => {
  const browser = await chromium.launch();

  try {
    const desktop = await browser.newPage({ viewport: { width: 1440, height: 950 } });
    await desktop.goto(baseUrl, { waitUntil: "networkidle" });

    const navTexts = await desktop
      .locator('header nav[aria-label="Điều hướng chính"] :is(a, button)')
      .allTextContents();
    assert.deepEqual(navTexts.map(normalize), [
      "Tổng quan",
      "Luật sư phụ trách",
      "Dịch vụ",
      "Bài viết",
      "Liên hệ",
    ]);
    assert.equal(await desktop.locator('header:has-text("Liên hệ tư vấn")').count(), 0);
    assert.equal(await desktop.locator('header:has-text("Quy trình")').count(), 0);
    assert.equal(await desktop.locator('header:has-text("Kinh nghiệm")').count(), 0);
    assert.ok(await desktop.getByRole("button", { name: "Tư vấn với Luật sư" }).isVisible());
    await desktop.screenshot({ path: ".quality/visual/home-desktop.png", fullPage: true });

    await desktop.locator('header nav[aria-label="Điều hướng chính"] button', { hasText: "Dịch vụ" }).hover();
    await waitForPanel(desktop, "#mega-dich-vu");
    await desktop.screenshot({ path: ".quality/visual/mega-dich-vu.png", fullPage: false });

    await desktop.locator('header nav[aria-label="Điều hướng chính"] button', { hasText: "Bài viết" }).hover();
    await waitForPanel(desktop, "#mega-bai-viet");
    await desktop.screenshot({ path: ".quality/visual/mega-bai-viet.png", fullPage: false });

    await capturePage(desktop, "/bai-viet/", "articles-desktop.png");
    await capturePage(desktop, "/lien-he/", "contact-desktop.png");
    await capturePage(desktop, "/luat-su-phu-trach/", "lawyer-desktop.png");
    await capturePage(desktop, "/dich-vu/", "services-desktop.png");
    await desktop.close();

    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobile.goto(baseUrl, { waitUntil: "networkidle" });
    await mobile.getByRole("button", { name: "Mở menu" }).click();
    await mobile.waitForTimeout(300);
    const drawerBox = await mobile.locator("[data-mobile-drawer]").boundingBox();
    assert.ok(drawerBox && drawerBox.x < 390);
    await mobile.locator("[data-mobile-drawer] [data-accordion-trigger]", { hasText: "Dịch vụ" }).click();
    assert.ok(await mobile.locator("[data-mobile-drawer]").getByRole("link", { name: "Luật bào chữa hình sự", exact: true }).isVisible());
    await mobile.screenshot({ path: ".quality/visual/mobile-drawer.png", fullPage: true });
    await mobile.close();
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
