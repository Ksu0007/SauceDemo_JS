import LoginPage from '../pageobjects/login.page.js';
import MainPage from '../pageobjects/main.page.js';

describe ('Login Tests', () => {
    it('TC 0001 - login of the valid user with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await MainPage.checkMainPageTitle('Products');
    });

    it('TC 0002 - Login with invalid password', async ()=> {
        await LoginPage.open();
        await LoginPage.login('standard_user', '12345');
       
        await LoginPage.checkXiconUsrnameIsDisplayed;
        await LoginPage.checkUsernameFieldHighlighting;

        await LoginPage.checkXiconPassIsDisplayed;
        await LoginPage.checkPasswordFieldHighlighting;

        await LoginPage.checkErrorMessage('Epic sadface: Username and password do not match any user in this service');
    });

    it('TC-0003 - Login with invalid login', async () => {
        await LoginPage.open();
        await LoginPage.login('suser', 'secret_sauce');

        await LoginPage.checkXiconUsrnameIsDisplayed;
        await LoginPage.checkUsernameFieldHighlighting;

        await LoginPage.checkXiconPassIsDisplayed;
        await LoginPage.checkPasswordFieldHighlighting;

        await LoginPage.checkErrorMessage('Epic sadface: Username and password do not match any user in this service');
    });

    it('TC-0004 - Logout', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        await MainPage.checkNumberofBurgerMenuLinks(4);

        await MainPage.logout();

        await LoginPage.checkUsernameInoutIsEmpty();
        await LoginPage.checkPasswordInputIsEmpty();

    });
})