# Web Automation Starter

My starter project for automatically interacting with web apps that require user login.

Uses a stealth plugin to bypass bot detection and the Google Cloud Gmail API to get MFA codes from your email.

## Built with:

- TypeScript, Node, TSX: run `.ts` files on server
- **Playwright**: interact with the web via chromium (Chrome, Edge, Brave), firefox, or webkit (Safari)
- **Crawlee**: Playwright is built for testing your own web apps. Crawlee adds a layer on top allowing you to turn it into a web scraping/automation tool.
- `playwright-extra` and `puppeteer-extra-plugin-stealth`
- Google Cloud Gmail API to retrieve MFA codes

## Getting started:

1. Run `npm i` to install dependencies
1. Open up `src/main.ts` and look at what you're working with
1. Run `npm run start` which will launch chromium and playwright codegen
1. Hit the record button and start doing whatever you'd like to automate
1. Copy the code from the codegen window into `main.ts` and modify as needed

---

### Grab MFA codes from Gmail:

See [Setting up Google Cloud Gmail API](./gmail-api.md).

---

### TODO:

- save data between sessions (cookies, etc)
- simulate mouse movements
- experiment with using stock browsers
