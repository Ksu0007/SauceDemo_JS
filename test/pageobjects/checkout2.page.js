import Page from "./page.js";

class Checkout2Page extends Page {
  get productName() {
    return $(".inventory_item_name");
  }

  get productTotalPrices() {
    return $(".summary_subtotal_label");
  }

  get finishBtn() {
    return $("#finish");
  }

  async getProductName() {
    return (await this.productName).getText();
  }

  async getTotalPrices() {
    const text = await this.productTotalPrices.getText();
    const price = parseFloat(text.replace("Item total: $", ""));
    return price;
  }

  async finishCheckout() {
    (await this.finishBtn).click();
  }
}
export default new Checkout2Page();
