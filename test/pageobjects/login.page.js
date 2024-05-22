import { $ } from '@wdio/globals'
import Page from './page.js';


class LoginPage extends Page {
    
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

    get xIconUsername () {
        return $('//*[@id="login_button_container"]/div/form/div[1]/svg');
    }
    get xIconPassword () {
        return $('//*[@id="login_button_container"]/div/form/div[2]/svg');
    }

   
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
        await expect(this.xIconUsername).toBeDisplayed();
    }

    async checkUsernameFieldHighlighting () {
        await expect((await this.inputUsername).getCSSProperty('border-bottom-color')).toHaveProperty('value', 'rgba(226, 35, 26, 1)');

    }

    async checkUsernameInoutIsEmpty () {
        await expect(this.inputUsername).toHaveValue('');
    }

    async checkXiconPassIsDisplayed () {
        await expect(this.xIconPassword).toBeDisplayed();
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

    open () {
        return super.open('');
    }
}

export default new LoginPage();
