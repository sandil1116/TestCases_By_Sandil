const { test, expect } = require("@playwright/test");

const SITE = "https://www.swifttranslator.com/";


async function openSite(page) {
  await page.goto(SITE, { waitUntil: "domcontentloaded" });}

function getInputLocator(page) {
  return page.getByPlaceholder("Input Your Singlish Text Here.");
}

function getOutputLocator(page) {
  return page.locator('.card:has-text("Sinhala") .bg-slate-50').first();
}

async function readOutput(locator) {
  const t = await locator.textContent();
  return (t || "").replace(/\r\n/g, "\n");
}

function normalize(s) {
  return (s || "").replace(/\r\n/g, "\n").trim();
}

async function runTranslationTest(tc, page, timeout = 20000) {
  await openSite(page);

  const inputArea = getInputLocator(page);
  const outputBox = getOutputLocator(page);

  await inputArea.waitFor({ state: "visible", timeout: 10000 });
  await inputArea.fill(tc.input);

  await expect
    .poll(async () => normalize(await readOutput(outputBox)), {
      timeout,
      message: `Output did not match for ${tc.id}`,
    })
    .toBe(normalize(tc.expected));
}

// positive test cases
const positiveThings = [
  {
    id: "Pos_Fun_0001",
    input: "thawa tiken nescafe eka halenawane mage angata monawa karanwada manda oyath",
    expected: "තව ටිකෙන් nescafe එක හැලෙනවා මගේ ඇගට මොනවා කරනවද මන්දා ඔයත්"
  },
  {
    id: "Pos_Fun_0002",
    input: "optimize vennaee meeka ,oyaata puluvandha free velaavaka karalaa dhenna ?",
    expected: "optimize වෙන්නෑ මේක ,ඔයාට පුලුවන්ද free වෙලාවක කරලා දෙන්න ?"
  }
  ,
  {
    id: "Pos_Fun_0003",
    input: "ara balanna maru kellek yanavaa,mata set karaganna thibbanam maaru needha ? magee kalin kellath ee vageemayi ",
    expected: "අර බලන්න මරු කෙල්ලෙක් යනවා,මට සෙට් කරගන්න තිබ්බනම් මාරු නේද ? මගේ කලින් කෙල්ලත් ඒ වගේමයි ."
  }
  ,
  {
    id: "Pos_Fun_0004",
    input: "uba mata adha kathaa karanna epaa kivvaa eeka hindha man adha kathaa karanneema naee , puLuvan dheyak karalaa pennapan ..",
    expected: "උබ මට අද කතා කරන්න එපා කිව්වා ඒක හින්ද මන් අද කතා කරන්නේම නෑ , පුළුවන් දෙයක් කරලා පෙන්නපන් ."
  }
  ,
  {
    id: "Pos_Fun_0005",
    input:"ehema mokak hari namak thama mata mathaka naee hariyata, mokadhdha eyaa karana viShaya ?",
    expected: "එහෙම මොකක් හරි නමක් තම මට මතක නෑ හරියට, මොකද්ද එයා කරන විෂය ?"
  }
  ,
  {
    id: "Pos_Fun_0006",
    input: "naee naee oya kiyapu vikaaree theerum ganna gaman innee , poddak kathaa karannee naethuva innakoo ",
    expected: "නෑ නෑ ඔය කියපු විකාරේ තේරුම් ගන්න ගමන් ඉන්නේ , පොඩ්ඩක් කතා කරන්නේ නැතුව ඉන්නකෝ "
  }
  ,
  {
    id: "Pos_Fun_0007",
    input: "ooka ithin oya yanagaman type karalaa evannako,apita badagini ",
    expected: "ඕක ඉතින් ඔය යනගමන් type කරලා එවන්නකො,අපිට බඩගිනි "
  }
  ,
  {
    id: "Pos_Fun_0008",
    input: "maedamva tharaha karagena kohomadha api mee degree eka karannee , degree ekee vaeda katayuthu karagena yannee ,mehema karanna baee ,oyaata vitharak nemei haemootamayi man mee kiyannee ,puLuvan tharam maedamva shape ekee thiyaaganna eka thama api koyikaatath hodha ehema naethi unoth pahala batch ekee Lamayi ekka apita ayemath exam liyanna veyi , poddak vagakiimak aethuva vaeda karanna",
    expected: "මැඩම්ව තරහ කරගෙන කොහොමද අපි මේ degree එක කරන්නේ , degree එකේ වැඩ කටයුතු කරගෙන යන්නේ ,මෙහෙම කරන්න බෑ ,ඔයාට විතරක් නෙමෙඉ හැමෝටමයි මන් මේ කියන්නේ ,පුළුවන් තරම් මැඩම්ව shape එකේ තියාගන්න එක තම අපි කොයිකාටත් හොද එහෙම නැති උනොත් පහල batch එකේ ළමයි එක්ක අපිට අයෙමත් exam ලියන්න වෙයි , පොඩ්ඩක් වගකීමක් ඇතුව වැඩ කරන්න"
  }
  ,
  {
    id: "Pos_Fun_0009",
    input: "oyaata mama kivvanee api dhennagee aadhara sambandhayata oyaalagee gedharin akamaethi veyi ,apee paval dheka gaelapennee naehae ee unaata mata ba oyaava athaeralaa dhannaa,kohomadha mama jiivath vennee ?",
    expected: "ඔයාට මම කිව්වනේ අපි දෙන්නගේ ආදර සම්බන්දයට ඔයාලගේ ගෙදරින් අකමැති වෙයි ,අපේ පවල් දෙක ගැලපෙන්නේ නැහැ ඒ උනාට මට බ ඔයාව අතැරලා දන්නා,කොහොමද මම ජීවත් වෙන්නේ ?"
  }
  ,
  {
    id: "Pos_Fun_00010",
    input: "oyaa boodima maaru karannee kavadhdha ? mata puLuvan velaavaka man aevilla oyaata udhavvak dhenna, iika gaena bayak saekaka thiyaaganna epaa .",
    expected: "ඔයා බෝඩිම මාරු කරන්නේ කවද්ද ? මට පුළුවන් වෙලාවක මන් ඇවිල්ල ඔයාට උදව්වක් දෙන්න, ඊක ගැන බයක් සැකක තියාගන්න එපා ."
  }
  ,
  {
    id: "Pos_Fun_0011",
    input: "dhaen adha ugannapu paadam oyaalata theerunaadha hodhata , man kalin ugannala na mehema kaatavath eeka hindhaa mata poddak kiyanna ,magee vaeradhi issarahata ",
    expected: "දැන් අද උගන්නපු පාඩම් ඔයාලට තේරුනාද හොදට , මන් කලින් උගන්නල න මෙහෙම කාටවත් ඒක හින්දා මට පොඩ්ඩක් කියන්න ,මගේ වැරදි ඉස්සරහට "
  }
  ,
  {
    id: "Pos_Fun_0012",
    input: "oyaata kohomadha?adhavath mata karadharayak vennee naethuva nidhaaganna dhenna puluvandha ? hari amaaruyi mehema jiivath venna mata oyaala ekka ",
    expected: "අදවත් මට කරදරයක් වෙන්නේ නැතුව නිදාගන්න දෙන්න පුලුවන්ද ? හරි අමාරුයි මෙහෙම ජීවත් වෙන්න මට ඔයාල එක්ක "
  }
  ,
  {
    id: "Pos_Fun_0013",
    input: "Anee apea ammaa gaavath thibbaa mee vageema ekak eyaagee eka naethi vela oyaa nemee nedha eeka horakam karee mata aeththa kiyanna mama uba ekka tharaha vennee naee ban uba dhanne nae amma oya sereppu dheka hevvaa ban maasayak vithara eyaa godak dhuken hitiyee ee sereppu dheka naethi una hindhaa horakam karanna epaa ban eeka hodha naethi purudhdhak",
    expected: "අනේ අපේ අම්මා ගාවත් තිබ්බා මේ වගේම එකක් එයාගේ එක නැති වෙල ඔයා නෙමේ නේද ඒක හොරකම් කරේ මට ඇත්ත කියන්න මම උබ එක්ක තරහ වෙන්නේ නෑ බන් උබ දන්නෙ නැ අම්ම ඔය සෙරෙප්පු දෙක හෙව්වා බන් මාසයක් විතර එයා ගොඩක් දුකෙන් හිටියේ ඒ සෙරෙප්පු දෙක නැති උන හින්දා හොරකම් කරන්න එපා බන් ඒක හොද නැති පුරුද්දක්"
  }
  ,
  {
    id: "Pos_Fun_0014",
    input: "mama aasayi oyaata",
    expected: "මම ආසයි ඔයාට"
  }
  ,
  {
    id: "Pos_Fun_0015",
    input: " mama kalin kivva nedha",
    expected: "මම කලින් කිව්ව නේද?"
  }
  ,
  {
    id: "Pos_Fun_0016",
    input: "mama karadharayakdha?",
    expected: "මම කරදරයක්ද?"
  }
  ,
  {
    id: "Pos_Fun_0017",
    input: "api palli yamu.",
    expected: "අපි පල්ලි යමු"
  }
  ,
  {
    id: "Pos_Fun_0018",
    input: "udheeta kaalaadha aavee",
    expected: "උදේට කාලාද ආවේ?"
  }
  ,
  {
    id: "Pos_Fun_0019",
    input: "amma vaththa sudhdha karanavaa",
    expected: "අම්ම වත්ත සුද්ද කරනවා"
  }
  ,
  {
    id: "Pos_Fun_0020",
    input: "kohomahari general karanava nam kisi prashnayak naehae ee unaata mata anivaaren avurudhu hatharaka upadiya ekak one bn campus eken naththan therumak nane bang rata yannawath bane general degree eken ekai man kiyanne ubata kohomahari me para vibhagen hodata lakunu ganna wenawa kalin awurddata wada padam wada karanna one bang naththan meka karanna baha.",
    expected: "කොහොමහරි general කරනව නම් කිසි ප්‍රශ්නයක් නැහැ ඒ උනාට මට අනිවාරෙන් අවුරුදු හතරක උපඩිය එකක් one බ්න් campus එකෙන් නත්තන් තෙරුමක් නනෙ bang රට යන්නwඅත් bane general degree එකෙන් එකෛ man කියන්නෙ උබට කොහොමහරි මෙ පර විබ්හගෙන් හොඩට ලකුනු ගන්න wඑනwඅ කලින් අwඋර්ඩ්ඩට wඅඩ පඩම් wඅඩ කරන්න one bang නත්තන් මෙක කරන්න බහ"
  }
  ,
  {
    id: "Pos_Fun_0021",
    input: "aalooka aevidha aevidha database paadam karanavaa udhee paandhara idhan ",
    expected: "ආලෝක ඇවිද ඇවිද database පාඩම් කරනවා උදේ පාන්දර ඉදන්"
  }
  ,
  {
    id: "Pos_Fun_0022",
    input: "kohomahari general karanava nam kisi prashnayak naehae ee unaata mata anivaaren avurudhu hatharaka upadiya ekak oonee ban campus eken naeththan theerumak naenee ban rata yannavath baenee saamaanYA upaaDhiyak aran eekayi mn kiyanne ubata kohomahari mee paara viBhaagen hoDHata lakunu ganna venava kalin avurudhdhata vadaa paadam vaeda karanna oonee ban naeththan meeka karanna baehae",
    expected: "ොහොමහරි general කරනව නම් කිසි ප්‍රශ්නයක් නැහැ ඒ උනාට මට අනිවාරෙන් අවුරුදු හතරක උපඩිය එකක් ඕනේ බන් campus එකෙන් නැත්තන් තේරුමක් නැනේ බන් රට යන්නවත් බැනේ සාමාන්‍ය උපාධියක් අරන් ඒකයි ම්න් කියන්නෙ උබට කොහොමහරි මේ පාර විභාගෙන් හොඳට ලකුනු ගන්න වෙනව කලින් අවුරුද්දට වඩා පාඩම් වැඩ කරන්න ඕනේ බන් නැත්තන් මේක කරන්න බැහැ"
  }
  ,
  {
    id: "Pos_Fun_0023",
    input: "Sorry machan man hithuve naehae ehema vaedak veyi kiyalaa man phone ekea display prashnayak aevillaa phone kadeekata dhunnaa pereedhaa eyagee athin venna aethi photos videos tika liik venna aeththe , mata hithaaganna baehae mokakdha karanna oonee kiyala mata hithennama suicide karaganna mn polisiyata gihin meeka gaena kivvaa eeth vadak vena ekak naehae haemootama share velaa aethi ooka dhaen .",
    expected: "Sorry මචන් man හිතුවෙ නැහැ එහෙම වැඩක් වෙයි කියලා man phone එකේ display ප්‍රශ්නයක් ඇවිල්ලා phone කඩේකට දුන්නා පෙරේදා එයගේ අතින් වෙන්න ඇති photos videos ටික ලීක් වෙන්න ඇත්තෙ , මට හිතාගන්න බැහැ මොකක්ද කරන්න ඕනේ කියල මට හිතෙන්නම suicide කරගන්න ම්න් පොලිසියට ගිහින් මේක ගැන කිව්වා ඒත් වඩක් වෙන එකක් නැහැ හැමෝටම share වෙලා ඇති ඕක දැන්."
  }
  ,
  {
    id: "Pos_Fun_0024",
    input: "navalooka ispirithalee issarahaa iDHagena mokadha karanne oyaa mee velave , enna gedhara yanna dhaena doctor ena velava pahu velaane eyaa ena ekak naehae api vena dhavasaka appointment ekak dhaalaa balamu adhata kalin doctor dhunna beeth tika biilaa inna , balamukoo api amaaru unoth raeeta hospital yamu mama hithanne naee adha oyaata amaaru veyi kiyalaa",
    expected: "නවලෝක ඉස්පිරිතලේ ඉස්සරහා ඉඳගෙන මොකද කරන්නේ ඔයා මේ වෙලවෙ , එන්න ගෙදර යන්න දැන doctor එන වෙලව පහු වෙලානෙ එයා එන එකක් නැහැ අපි වෙන දවසක appointment එකක් දාලා බලමු අදට කලින් doctor දුන්න බේත් ටික බීලා ඉන්න , බලමුකෝ අපි අමාරු උනොත් රෑට hospital යමු මම හිතන්නෙ නෑ අද ඔයාට අමාරු වෙයි කියලා"
  }
  
];
   

//negative
const negativeInputs= [
  {
    id: "Neg_Fun_0001",
    input: "ad@ w@ssa nisa redl welaganna b@",
    expected: "අද වැස්ස නිසා වේලා ගන්න බෑ "
  },
  {
    id: "Neg_Fun_0002",
    input: "m ta bad agini, dan k anna o3",
    expected: "මට බඩගිනි , දැන් කන්න ඕනේ"
  },
  {
    id: "Neg_Fun_0003",
    input: "eke dewal dewal ganna epaapa",
    expected: "ඔයා මං ගැන හිතන්න ඕනේ නැ මට මං ඉන්නවා "
  },
  {
    id: "Neg_Fun_0004",
    input: "ma ma dh ae ne ka pa ar ak Ki vv ane",
    expected: "මම දැන් එකපාරක් කිව්වනෙ"
  },
  {
    id: "Neg_Fun_0005",
    input: "mama kann33 nae 33 jaath1",
    expected: "මම කන්නේ නැ ඒ ජාති"
  },
  {
    id: "Neg_Fun_0006",
    input: "a3y1 oyaamata meh emavae dak baarad hunnea ",
    expected: "ඇයි ඔයා මට මෙහෙම වැඩක් බාරදුන්නේ"
  },
  {
    id: "Neg_Fun_0007",
    input: "yagee Na,e Fac3b00k eke geoduck mention vela thibuna",
    expected: "ඔයගේ නම facebook එකේ ගොඩක් mention වෙලා තිබිලා"
  },
  {
    id: "Neg_Fun_0008",
    input: "I know why the caged bird sings.",
    expected: ""
  },
  {
    id: "Neg_Fun_0009",
    input: "english ig en gagannawada",
    expected: "english ඉගෙන ගන්නවද?"
  },

  {
    id: "Neg_Fun_0010",
    input: "aalooka awida awida database karanawaaa",
    expected: "ආලෝක ඇවිද ඇවිද database  කරනවා"
  }
];

// -- Tests --
test("open swifttranslator", async ({ page }) => {
  await openSite(page);

  const pageTitle = await page.title();
  console.log("Page title is:", pageTitle);

  await expect(page).toHaveURL(SITE);
  await expect(page).toHaveTitle(/Translator/i);
});

test.describe("SwiftTranslator – Positive Functional", () => {
  for (const tc of positiveThings) {
    test(tc.id + " – should match expected Sinhala output", async ({ page }) => {
      await runTranslationTest(tc, page);
    });
  }
});

test.describe("SwiftTranslator – Negative Functional", () => {
  for (const tc of negativeInputs) {
    test(tc.id + " – should match expected Sinhala output", async ({ page }) => {
      await runTranslationTest(tc, page);
    });
  }
});

test("Pos_UI_0001 – Clearing input clears Sinhala output immediately", async ({ page }) => {
  await openSite(page);

  const inputArea = getInputLocator(page);
  const outputBox = getOutputLocator(page);

  await inputArea.waitFor({ state: "visible", timeout: 10000 });

  await inputArea.fill("api heta hambemu.");
  await expect
    .poll(async () => normalize(await readOutput(outputBox)), {
      timeout: 20000,
      message: "No output produced",
    })
    .not.toBe("");

  await inputArea.fill("");
  await expect
    .poll(async () => normalize(await readOutput(outputBox)), {
      timeout: 15000,
      message: "Output did not clear after clearing the input",
    })
    .toBe("");
});

test("Neg_UI_0001 – should respond within time for long gibberish input", async ({ page }) => {
  await openSite(page);

  const inputArea = getInputLocator(page);
  const outputBox = getOutputLocator(page);

  await inputArea.waitFor({ state: "visible", timeout: 10000 });

  const before = normalize(await readOutput(outputBox));
  const start = Date.now();

  await inputArea.fill(
    "ffnfnmlfnmltn fjnbfkrrh rkhmmlm tmhl5my5lye5lymolkjuyml hmyljmlt jtnhrenno nhkrehohnmkhmtm h5khm5olho 5o"
  );

  await expect
    .poll(async () => normalize(await readOutput(outputBox)) !== before, {
      timeout: 1000,
      message: "UI did not respond within 1000ms",
    })
    .toBe(true);

  const elapsed = Date.now() - start;
  expect(elapsed).toBeLessThanOrEqual(2200); 
});


test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({ path: `screenshots/${testInfo.title.replace(/\s+/g, "_")}.png` });
  }
});