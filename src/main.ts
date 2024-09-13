import { chromium } from "playwright-extra";
import stealthPlugin from "puppeteer-extra-plugin-stealth";
import { config } from "dotenv";
// import { getMfaCode } from "./get-mfa-code.js";

config();

// Apply stealth plugin to Playwright
chromium.use(stealthPlugin());

async function submitForm() {
  try {
    const browser = await chromium.launch({
      headless: false, // Set to true to run headless
      slowMo: 3000, // Add a delay in milliseconds between actions
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    // pause and launch playwright codegen
    await page.pause();

    // get mfa code
    // const mfaCode = await getMfaCode({
    //   senderEmail: "no-reply@example.com",
    //   subject: "Your MFA code",
    // });
  } catch (error) {
    console.error(error);
  }
}

submitForm();
