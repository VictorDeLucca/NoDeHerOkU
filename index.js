require("dotenv/config");

const notifier = require('node-notifier');



const puppeteer = require("puppeteer");
const system_url_path = "https://oscercomp.ufj.edu.br/front/ticket.php";
const login_input_path = "#login_name";
const submit_button_path = '[name="submit"]';
const password_input_path = "div.mb-4 > input";
const span_id_path = "tbody > tr:nth-child(1) > td:nth-child(2) > span";
let a = '0';
let b = '1,912';
let page;




(async () => {
  const browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto(system_url_path);
  await page.type(login_input_path, process.env.LOGIN_NAME);
  await page.type(password_input_path, process.env.PASSWORD);
  await page.click(submit_button_path);

  await page.waitForSelector('thead > tr > th:nth-child(2)')
  await page.click('thead > tr > th:nth-child(2)')
  // console.log('esperando')
  await page.waitForTimeout(4000);
  // console.log('foi')
  await page.waitForSelector('thead > tr > th:nth-child(2)')
  await page.click('thead > tr > th:nth-child(2)')

  // await page.waitForSelector(span_id_path);
  // let element = await page.$(span_id_path);
  // a = await page.evaluate((el) => el.textContent, element);

})()

setInterval(async () => {
  await page.reload();
  await page.waitForSelector(span_id_path);
  let element = await page.$(span_id_path);
  a = await page.evaluate((el) => el.textContent, element);
  if (b < a) {
    notifier.notify('Chamado novo');
    b = a
  }
}, 10000)