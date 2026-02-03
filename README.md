## test cases by Sandil

This repository contains an automated end-to-end (E2E) testing suite built with **Playwright**.
The goal of this project is to validate the *Singlish to Sinhala* translation accuracy and UI stability of the **[SwiftTranslator](https://www.swifttranslator.com/)** web application.

### Project Overview

 Technology 

**Framework** - Playwright 
**Language** -TypeScript 
**Browsers** - Chromium, Firefox, WebKit 
**Reporting** - Playwright HTML Reporter 


### Setup and Installation (Follow these steps to set up the project locally.)

#### 1.Ensure you have the following installed:

* **Node.js** (v16 or later)
* **npm** (comes with Node.js)
* **Git**

Verify your versions:

```bash
node -v
npm -v
git --version

```

#### 2. Clone the Repository

```bash
git clone https://github.com/sandil1116/TestCases_By_Sandil.git

```

#### 3. Install Dependencies

```bash
npm install

```

#### 4. Install Playwright Browsers - (Download the necessary browser binaries to run the tests)

```bash
npx playwright install

```


###  Running the Tests -(Once the setup is complete, you can run the automation suite using the following commands)

**Run all tests:**

```bash
npx playwright test

```

**Run tests in Headed mode (to see the browser):**

```bash
npx playwright test --headed

```

**Generate and View HTML Report:**
After the tests finish, run this to see a detailed visual breakdown of the results:

```bash
npx playwright show-report

```

* **Anuja Sandil** 

> **Note:** This project was developed for academic and demonstration purposes.
