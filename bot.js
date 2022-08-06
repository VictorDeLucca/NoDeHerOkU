const puppeteer = require("puppeteer");

const { Webhook } = require('discord-webhook-node');
const hook = new Webhook('https://discord.com/api/webhooks/1004372604573982791/FGGKA7dHCbVZ4pknvEOjul7ShbgEmcTWdLM8oBqOryOeVlfmvA4ZG7TlOkyfNBSEX39u');
 


const bot = async () => {
  // const browser = await puppeteer.launch({
  //   headless: true,
  //   args: ["--no-sandbox"],
  // });
  // const page = await browser.newPage();
  // await page.goto("https://google.com", {
  //   waitUntil: "networkidle2",
  // });
  // await browser.close();
  hook.send("Hello there!");
  return "Done";
};

module.exports = bot;
