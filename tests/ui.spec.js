const { test, expect } = require('@playwright/test');

test.describe('Translate Singlish to Sinhala', () => {

  const Inputs = [
  
'ada wassa nisa redi welaganna ba',
'mata badagini, dan kanna one ,monawada  uyala thiyenne kanna ?',
'wihiluwata kiyana dewal serious ganna epa',
'mn dn ekaparak kiwwane oyata ehema karala me prashneta wisadumak ganna baha',
'mama nam asai e unata oya kamathi nathi hinda man kanne na e jathi',
'ai oya mata mehema wadak baradunne ',
'oyage nama facebook eke godak mention wela thibila ',
'oya mokada me karanne englosh igenagannwada',
'aloka awida awida database padam karanwa ude pandara idan ',
'oka ithin oya yana gaman type karala ewannko apita badagini',

];
/*
tessssftdtfyjg
*/

test('Singlish to Sinhala', async ({ page }) => {

  await page.goto('https://www.swifttranslator.com/');


  const inputShow = page.locator('textarea');
  const outputShow = page.locator('div').nth(1);

  for (const input of Inputs) {
    await inputShow.fill(input);        

    const outputText = await outputShow.textContent(); 
    expect(outputText).not.toBeNull();
    expect(outputText.trim().length).toBeGreaterThan(0);
  }
});

});