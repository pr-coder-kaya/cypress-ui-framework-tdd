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