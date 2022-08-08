const puppeteer = require("puppeteer");
require("dotenv/config");
const {
  Webhook,
  MessageBuilder
} = require("discord-webhook-node");;
const hook = new Webhook(
  "https://discord.com/api/webhooks/1004372604573982791/FGGKA7dHCbVZ4pknvEOjul7ShbgEmcTWdLM8oBqOryOeVlfmvA4ZG7TlOkyfNBSEX39u"
);
const IMAGE_URL =
  "https://media.discordapp.net/attachments/904239258720694272/1004828735192698940/image-removebg-preview_1.png?width=449&height=449";

const system_url_path = "https://oscercomp.ufj.edu.br/front/ticket.php";
const login_input_path = "#login_name";
const password_input_path = "div.mb-4 > input";
const span_id_path = "tbody > tr:nth-child(1) > td:nth-child(2) > span";
const submit_button_path = '[name="submit"]';
let a = "0";
let b = "1912";
let page;


const bot = async () => {
  (async () => {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    page = await browser.newPage();
    await page.goto(system_url_path, {
      waitUntil: "networkidle2",
    });
    await page.type(login_input_path, 'victor_lucca');
    await page.type(password_input_path, '@Vic081000');
    await page.click(submit_button_path);
    await page.waitForTimeout(4000);
    await page.waitForSelector("thead > tr > th:nth-child(2)");
    await page.click("thead > tr > th:nth-child(2)");
    await page.waitForTimeout(4000);
    await page.waitForSelector("thead > tr > th:nth-child(2)");
    await page.click("thead > tr > th:nth-child(2)");
    await page.waitForTimeout(4000);
    await page.waitForSelector("thead > tr > th:nth-child(2)");
    await page.click("thead > tr > th:nth-child(2)");

    setInterval(async () => {
      // console.log('ok')
      await page.reload();
      await page.waitForSelector(span_id_path);
      let element = await page.$(span_id_path);
      let c = await page.evaluate((el) => el.textContent, element);
      a = c.replace(/[^0-9]/g, '');


      if (b < a) {
        // notifier.notify("Chamado novo");
        await page.waitForSelector(`#Ticket${a}`)
        let el = await page.$(`#Ticket${a}`);
        let t = await page.evaluate((el) => el.textContent, el);

        await page.waitForSelector('tbody > tr:nth-child(1) > td:nth-child(10)')
        let categoria = await page.$('tbody > tr:nth-child(1) > td:nth-child(10)');
        let cat = await page.evaluate((el) => el.textContent, categoria);

        const embed = new MessageBuilder()
          .setTitle(`Nº ${a}`)
          .setColor("#00b0f4")
          .setThumbnail(IMAGE_URL)
          .setDescription(``)
          .addField(t, `${cat}`, true)
        hook.send(embed);
        b = a;
      }
    }, 10000);

  })();


  return "Done";
};

module.exports = bot;