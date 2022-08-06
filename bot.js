const puppeteer = require("puppeteer");
require("dotenv/config");
const { Webhook } = require("discord-webhook-node");
const hook = new Webhook(
  "https://discord.com/api/webhooks/1004372604573982791/FGGKA7dHCbVZ4pknvEOjul7ShbgEmcTWdLM8oBqOryOeVlfmvA4ZG7TlOkyfNBSEX39u"
);
const login_input_path = "#login_name";
const submit_button_path = '[name="submit"]';
const password_input_path = "div.mb-4 > input";
const span_id_path = "tbody > tr:nth-child(1) > td:nth-child(2) > span";
let a = '0';

const bot = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto("https://oscercomp.ufj.edu.br/front/ticket.php", {
    waitUntil: "networkidle2",
  });
  await page.type(login_input_path, process.env.LOGIN_NAME);
  await page.type(password_input_path, process.env.PASSWORD);
  await page.click(submit_button_path);
  await page.waitForSelector(span_id_path);
  let element = await page.$(span_id_path);
  a = await page.evaluate((el) => el.textContent, element);
  // await browser.close();
  hook.send(a);
  return "Done";
};

module.exports = bot;
