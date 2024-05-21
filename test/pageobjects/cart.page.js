import { $ } from '@wdio/globals'
import Page from './page.js';


class CartPage extends Page {
    get title () {
        return $('.title');
    }

    get addedProductName () {
        return $('.inventory_item_name');
    }

    get checkoutBtn () {
        return $('#checkout');
    }

    async getTitleText() {
        const titleElement = await this.title;
        if (titleElement) {
            return titleElement.getText();
        } else {
            return '';
        }
    }
    async getAddedProductName() {
        return await this.addedProductName.getText();
    }

    async openCheckoutPage() {
        const checkoutBtn = await this.checkoutBtn;
        console.log("Checkout button:", checkoutBtn);
        await checkoutBtn.click();
    }

    
    
    
    
    
}

export default new CartPage();