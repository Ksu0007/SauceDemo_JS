import LoginPage from '../pageobjects/login.page.js';
import MainPage from '../pageobjects/main.page.js';
import CartPage from '../pageobjects/cart.page.js';
import CheckoutPage from '../pageobjects/checkout.page.js';
import Checkout2Page from '../pageobjects/checkout2.page.js';
import Checkout3Page from '../pageobjects/checkout3.page.js';

describe('Shopping flow Tests', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
    });

    it('TC-0005-Saving the card after logout', async () => {
        await MainPage.addBackpackToCard();
        const itemsInCard = MainPage.checkItemcInCard();

        await MainPage.checkNumberofBurgerMenuLinks(4);
        
        MainPage.logout();
        await LoginPage.login('standard_user', 'secret_sauce');

        await MainPage.checkMainPageTitle('Products');
        await expect(MainPage.checkItemcInCard()).toEqual(itemsInCard);
    });

    it('TC-0006-Sorting - Price (low to high)', async () => {
        await MainPage.selectSortingOption('Price (low to high)');
        await MainPage.checkPricesSortedLowToHigh();

    });

    it('TC-0006-Sorting - Price (high to low)', async () => {
        await MainPage.selectSortingOption('Price (high to low)');
        await MainPage.checkPricesSortedHighToLow();

    });

    it('TC-0006-Sorting - Name (A to Z)', async () => {
        await MainPage.selectSortingOption('Name (A to Z)');
        await MainPage.checkNamesSortedAlphabetically();
    });

    it('TC-0006-Sorting - Name (Z to A)', async () => {
        await MainPage.selectSortingOption('Name (Z to A)');
        await MainPage.checkNamesSortedReverseAlphabetically();
    });

    it('TC-0008- Valid Checkout', async () => {
        const initialItemsInCard = await MainPage.getItemsInCard();
        const productName = await MainPage.getBackpackName();
        const produtPrice = await MainPage.getBackpackPrice();
        await MainPage.addBackpackToCard();

        const newItemsInCart = await MainPage.getItemsInCard();

        expect(newItemsInCart).toBe(initialItemsInCard + 1);

        await MainPage.openCart();

        expect(await CartPage.getTitleText()).toEqual('Your Cart');
        expect(await CartPage.getAddedProductName()).toEqual(productName);

        await CartPage.openCheckoutPage(); 
        expect(await CheckoutPage.isCheckoutPageDisplayed()).toBe(true);
        

        await CheckoutPage.fillInCheckoutForm("John", "Doe", "EU2034");

        expect(await Checkout2Page.getProductName()).toEqual(productName);
        expect(await Checkout2Page.getTotalPrices()).toEqual(produtPrice);

        await Checkout2Page.finishCheckout();

        expect(await Checkout3Page.isSuccessMsgDisplayed()).toBe(true);

        await Checkout3Page.returnHome();

        expect(await MainPage.checkMainPageTitle('Products'));

    });

    it('TC-0009- Checkout without products', async () => {
        await MainPage.openCart();
        await CartPage.openCheckoutPage(); 
        expect(await CheckoutPage.isCheckoutPageDisplayed()).toBe(false);
    });
})