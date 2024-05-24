import Page from "./page.js";

class Checkout3Page extends Page {
  get successMsg() {
    return $(".complete-header");
  }

  get homeBtn() {
    return $("#back-to-products");
  }

  async isSuccessMsgDisplayed() {
    const message = await this.successMsg.getText();
    console.log(`Message: ${message}`);
    const expectedMsg = "Thank you for your order!";
    return message === expectedMsg;
  }

  async returnHome() {
    (await this.homeBtn).click();
  }
}
export default new Checkout3Page();
