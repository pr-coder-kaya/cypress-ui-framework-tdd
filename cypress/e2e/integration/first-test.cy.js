/// <reference types="cypress"/>

describe('TechGlobal Training Home Test', () => {
    it('Validate TechGlobal Training App Title and URL', { tags: ['@regression'] }, () => {
        cy.visit(Cypress.env('baseURL'))

        cy.title().should('eq', 'TechGlobal Training | Home')
        cy.url().should('contain', 'techglobal-training')
    })
})