import { $ } from '@wdio/globals'
import Page from './page.js';
import LoginPage from '../pageobjects/login.page.js';

class MainPage extends Page {
   
    get mainPageTitle () {
        return $('.title');
    }

    get burgerMenuBtn () {
        return $('.bm-burger-button');
    }

    get burgerMenuLinks () {
        return $$ ('//a[@class="bm-item menu-item"]');
    }

    get logoutBtn () {
        return $('//a[@id="logout_sidebar_link"]');
    }

    get backpackAddToCartBtn () {
        return $('#add-to-cart-sauce-labs-backpack');
    }

    get backPackName () {
        return $('//*[@id="item_4_title_link"]/div');
    }

    get backpackPrice () {
        return $('//*[@id="inventory_container"]/div/div[1]/div[2]/div[2]/div');
    }

    get sortingDropdown () {
        return $('.product_sort_container');
    }

    get itemInCart () {
        return $('//span[@class="shopping_cart_badge"]');
    }

    get cartBtn () {
        return $('.shopping_cart_link');
    }

    get prices() {
        return $$ ('//div[@class="inventory_item_price"]')
    }

    get productNames () {
        return $$ ('.inventory_item_name')
    }

    get twitter () {
        return $('//a[@href="https://twitter.com/saucelabs"]');
    }

    get facebook () {
        return $('//a[@href="https://www.facebook.com/saucelabs"]');
    }

    get linkedin () {
        return $('//a[@href="https://www.linkedin.com/company/sauce-labs/"]');
    }


    async checkMainPageTitle (title) {
        await expect(this.mainPageTitle).toHaveTextContaining(title);
    }

    async checkNumberofBurgerMenuLinks (number) {
        await this.burgerMenuBtn.click();
        const numberOfLinks = await this.burgerMenuLinks.length;
        await expect(numberOfLinks).toEqual(number);
    }

    async logout () {
        await this.logoutBtn.click();
    }

    async addBackpackToCart () {
        await this.backpackAddToCartBtn.click();
    }

    async checkItemcInCart () {
        (await this.itemInCart).getValue;
    }

    async getItemsInCart () {
        const cartBadgeElement = await this.itemInCart;
        if(await cartBadgeElement.isDisplayed()) {
            const itemsCount = await cartBadgeElement.getText();
            return parseInt(itemsCount, 10);
        }
        return 0;
    }

    async getBackpackName () {
        return (await this.backPackName).getText();
    }

    async getBackpackPrice () {
        const text = await this.backpackPrice.getText();
            return parseFloat(text.replace('$', ''));
    }

    async openCart () {
        (await this.cartBtn).click();
    }

    async selectSortingOption (option) {
        await this.sortingDropdown.waitForDisplayed();
        await this.sortingDropdown.selectByVisibleText(option);
    }

    async getPrices() {
        const pricesText = await this.prices.map(async priceElement => {
            const text = await priceElement.getText();
            return parseFloat(text.replace('$', ''));
        });
        return Promise.all(pricesText);
    }

    async checkPricesSortedLowToHigh() {
        const prices = await this.getPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    }

    async checkPricesSortedHighToLow() {
        const prices = await this.getPrices();
        const sortedPrices = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sortedPrices);
    }

    async checkNamesSortedAlphabetically() {
        const productNames = await this.productNames.map(async (nameElem) => {
            return await nameElem.getText();
        });
    
        const sortedNames = [...productNames].sort();
        expect(productNames).toEqual(sortedNames);
    }

    async checkNamesSortedReverseAlphabetically() {
        const productNames = await this.productNames.map(async (nameElem) => {
            return await nameElem.getText();
        });
    
        const sortedNames = [...productNames].sort().reverse();
        expect(productNames).toEqual(sortedNames);
    }
    
    async clickAndVerifyIcon(iconElement, expectedUrl) {
        const originalWindow = await browser.getWindowHandle();
    
        await iconElement.waitForDisplayed();
        await iconElement.click();
    
        await browser.waitUntil(
            async () => (await browser.getWindowHandles()).length === 2,
            {
                timeout: 5000,
                timeoutMsg: 'expected 2 windows to be opened'
            }
        );
    
        const windows = await browser.getWindowHandles();
        const newWindow = windows.find(handle => handle !== originalWindow);
    
        await browser.switchToWindow(newWindow);
    
        const currentURL = await browser.getUrl();
        await expect(currentURL).toContain(expectedUrl);
    
        await browser.closeWindow();
        await browser.switchToWindow(originalWindow);
    }

    async checkTwitterIcon() {
        await this.clickAndVerifyIcon(this.twitter, 'https://x.com/saucelabs?mx=2');
    }
    
    async checkFacebookIcon() {
        await this.clickAndVerifyIcon(this.facebook, 'https://www.facebook.com/saucelabs');
    }
    
    async checkLinkedinIcon() {
        await this.clickAndVerifyIcon(this.linkedin, 'https://www.linkedin.com/company/sauce-labs/');
    }
    
    
}

export default new MainPage();
