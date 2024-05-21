import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('#user-name');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        return $('#login-button');
    }

    get loginMessage () {
        return $('h3[data-test="error"]');
    }

    get xIsconUsername () {
        return $('//*[@id="login_button_container"]/div/form/div[1]/svg');
    }
    get xIconPass () {
        return $('//*[@id="login_button_container"]/div/form/div[2]/svg');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    async invalidLogin (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
        await this.loginMessage.getText();
}

    async checkErrorMessage (msg) {
        await expect(this.loginMessage).toHaveTextContaining(msg);
    }

    async checkXiconUsrnameIsDisplayed () {
        await expect(this.xIsconUsername).toBeDisplayed();
    }

    async checkUsernameFieldHighlighting () {
        await expect((await this.inputUsername).getCSSProperty('border-bottom-color')).toHaveProperty('value', 'rgba(226, 35, 26, 1)');

    }

    async checkUsernameInoutIsEmpty () {
        await expect(this.inputUsername).toHaveValue('');
    }

    async checkXiconPassIsDisplayed () {
        await expect(this.xIsconPass).toBeDisplayed();
    }

    async checkPasswordFieldHighlighting () {
        await expect((await this.inputPassword).getCSSProperty('border-bottom-color')).toHaveProperty('value', 'rgba(226, 35, 26, 1)');
        
    }

    async checkPasswordInputIsEmpty () {
        await expect(this.inputPassword).toHaveValue('');
    }

    async loginPageIsDisplayed () {
    
        const currentURL = browser.getUrl();
        expect(currentURL).toEqual('https://www.saucedemo.com');
        
    }
    

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('');
    }
}

export default new LoginPage();
