import LoginPage from '../pageobjects/login.page.js';
import MainPage from '../pageobjects/main.page.js';

describe('Footer Tests', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
    });

    it('TC-0007- Verify Twitter icon opens correct URL', async () => {
        await MainPage.checkTwitterIcon();
    });

    it('TC-0007 - Verify Facebook icon opens correct URL', async () => {
        await MainPage.checkFacebookIcon();
    });

    it('TC-0007 - Verify LinkedIn icon opens correct URL', async () => {
        await MainPage.checkLinkedinIcon();
    });

} )