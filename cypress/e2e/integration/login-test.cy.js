///<reference types="cypress"/>

import LoginPage from '../../pages/LoginPage'

describe('Login Functionality', () => {
    const loginPage = new LoginPage();

    beforeEach(() => {
        cy.fixture('user').as('user')
        cy.visit(`${Cypress.env('baseURL')}frontend/project-2`)
    })

    it('Validate Successful Login with Class-based POM', function () {
        loginPage.login(this.user.username, this.user.password)
        loginPage.getSuccessMessage().should('be.visible').and('have.text', 'You are logged in')
    })
})