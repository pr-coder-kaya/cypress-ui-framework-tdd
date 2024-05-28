# Set up a New Project

Make sure Node.js is installed on your machine

Ensure your favorite IDE installed on your machine (VS Code)

Create an empty directory for your project (cypress-automation)

## Initialize The Project

Open the directory in the IDE and initialize a Node.js project

```bash
npm init -y
```

## Install Cypress

```bash
npm install cypress
```

## Open Cypress
This will create a cypress folder with default directories and configuration files.

```bash
npx cypress open
```

# Organize Your Project Structure

## Default Project Structure

```python
cypress-automation/
├── cypress/
│   ├── e2e/
|   |   └── integration/
│   ├── fixtures/
│   └── support/
├── node_modules/
├── cypress.config.js
└── package.json
```

# Write Your First Test

## Create a Test File

```
touch cypress/e2e/integration/first-test.cy.js
```

## Write a Basic Test
``` javascript
// cypress/e2e/integration/first-test.cy.js
/// <reference types="cypress"/>

describe('TechGlobal Training Home Test', () => {
  it('Validate TechGlobal Training App Title and URL', () => {
    cy.visit('https://techglobal-training.com/')

    cy.title().should('eq', 'TechGlobal Training | Home')
    cy.url().should('contain', 'techglobal-training')
  })
})
```

# Implement Page Object Model (POM)

This is used to store page-specific locators and actions

Advantage: Reusable page objects
## Create a Page Object File

```
mkdir cypress/pages
touch cypress/pages/LoginPage.js
```

## Define The Page Object

``` javascript
// cypress/pages/LoginPage.js
class LoginPage {
    getUsernameField() {
        return cy.get('#username')
    }

    getPasswordField() {
        return cy.get('#password')
    }

    getLoginButton() {
        return cy.get('#login_btn')
    }

    getSuccessMessage() {
        return cy.get('#success_lgn')
    }

    getLogoutButton() {
        return cy.get('#logout')
    }

    clickOnLoginButton() {
        this.getLoginButton().click()
    }

    login(username, password) {
        this.getUsernameField().type(username)
        this.getPasswordField().type(password)
        this.clickOnLoginButton()
    }

    logout() {
        this.getLogoutButton().click()
    }
}

export default LoginPage;
```

## Use Page Objects in Tests

Advantage: Cleaner and more maintainable test files

``` javascript
// cypress/e2e/integration/login-test.cy.js
///<reference types="cypress"/>

import LoginPage from "../../pages/LoginPage";

describe('Login Functionality', () => {
    const loginPage = new LoginPage();

    it('Validate Successful Login', () => {
        cy.visit('https://www.techglobal-training.com/frontend/project-2')
        loginPage.login('TechGlobal', 'Test1234')
        loginPage.getSuccessMessage().should('be.visible').and('have.text', 'You are logged in')
    })
})
```

# Use Fixtures for Test Data

Fixtures are JSON files with test data

Advantage: Tests using externalized data for better maintainability

## Create a Fixture File

```
touch cypress/fixtures/user.json
```

## Add Test Data to the Fixture

``` javascript
// cypress/fixtures/user.json
{
  "username": "TechGlobal",
  "password": "Test1234"
}
```

## Use Fixture in Your Test

``` javascript
// cypress/e2e/integration/login-test.cy.js
///<reference types="cypress"/>

import LoginPage from "../pages/LoginPage";

describe('Login Functionality', () => {
    const loginPage = new LoginPage();

    beforeEach(() => {
        cy.fixture('user').then(function(user) {
            this.user = user
        })
        cy.visit('https://www.techglobal-training.com/frontend/project-2')
    })

    it('Validate Successful Login with Class-based POM', function() {
        loginPage.login(this.user.username, this.user.password)
        loginPage.getSuccessMessage().should('be.visible').and('have.text', 'You are logged in')
    })
})
```

# Configure Environment Variables

This is used to protect sensitive or environment-specific data

Advantage: Secure and flexible test configurations

## Install the dotenv dependency

```
npm install dotenv
```

## Create a .env File

```
touch .env
```

## Add Environment Variables

```
baseURL=https://www.techglobal-training.com/
```

## Modify cypress.config.js file

``` javascript
const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  env: { ...process.env },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
```

## Use Environment Variables in Tests

``` javascript
// cypress/e2e/integration/login-test.cy.js
///<reference types="cypress"/>

import LoginPage from '../../pages/LoginPage'

describe('Login Functionality', () => {
    const loginPage = new LoginPage();

    beforeEach(() => {
        cy.fixture('user').as('user')
        cy.visit(`${Cypress.env('baseURL')}frontend/project-2`)
    })

    it('Validate Successful Login with Class-based POM', function() {
        loginPage.login(this.user.username, this.user.password)
        loginPage.getSuccessMessage().should('be.visible').and('have.text', 'You are logged in')
    })
})
```

# Run Tests

```
npx cypress run
```

# Set up Git Repository

# Integrate Your Repository with Pipelines (Jenkins)