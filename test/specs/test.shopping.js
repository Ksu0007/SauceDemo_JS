import loginPage from "../pageobjects/login.page.js";
import mainPage from "../pageobjects/main.page.js";
import cartPage from "../pageobjects/cart.page.js";
import checkoutPage from "../pageobjects/checkout.page.js";
import checkout2Page from "../pageobjects/checkout2.page.js";
import checkout3Page from "../pageobjects/checkout3.page.js";

describe("Shopping flow Tests", () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
  });

  it("TC-0005-Saving the card after logout", async () => {
    await mainPage.addBackpackToCard();
    const itemsInCard = mainPage.checkItemcInCart();

    await mainPage.checkNumberofBurgerMenuLinks(4);

    await mainPage.logout();
    await loginPage.login("standard_user", "secret_sauce");

    await mainPage.checkMainPageTitle("Products");
    expect(await mainPage.checkItemcInCart()).toEqual(itemsInCard);
  });

  it("TC-0006-Sorting - Price (low to high)", async () => {
    await mainPage.selectSortingOption("Price (low to high)");
    await mainPage.checkPricesSortedLowToHigh();
  });

  it("TC-0006-Sorting - Price (high to low)", async () => {
    await mainPage.selectSortingOption("Price (high to low)");
    await mainPage.checkPricesSortedHighToLow();
  });

  it("TC-0006-Sorting - Name (A to Z)", async () => {
    await mainPage.selectSortingOption("Name (A to Z)");
    await mainPage.checkNamesSortedAlphabetically();
  });

  it("TC-0006-Sorting - Name (Z to A)", async () => {
    await mainPage.selectSortingOption("Name (Z to A)");
    await mainPage.checkNamesSortedReverseAlphabetically();
  });

  it("TC-0008- Valid Checkout", async () => {
    const initialItemsInCart = await mainPage.getItemsInCart();
    const productName = await mainPage.getBackpackName();
    const produtPrice = await mainPage.getBackpackPrice();
    await mainPage.addBackpackToCard();

    const newItemsInCart = await mainPage.getItemsInCart();

    expect(newItemsInCart).toBe(initialItemsInCart + 1);

    await mainPage.openCart();
    expect(await cartPage.getTitleText()).toEqual("Your Cart");
    expect(await cartPage.getAddedProductName()).toEqual(productName);

    await cartPage.openCheckoutPage();
    expect(await checkoutPage.isCheckoutPageDisplayed()).toBe(true);

    await checkoutPage.fillInCheckoutForm("John", "Doe", "EU2034");

    expect(await checkout2Page.getProductName()).toEqual(productName);
    expect(await checkout2Page.getTotalPrices()).toEqual(produtPrice);

    await checkout2Page.finishCheckout();

    expect(await checkout3Page.isSuccessMsgDisplayed()).toBe(true);

    await checkout3Page.returnHome();

    expect(await mainPage.checkMainPageTitle("Products"));
  });

  it("TC-0009- Checkout without products", async () => {
    await mainPage.openCart();
    await cartPage.openCheckoutPage();
    expect(await checkoutPage.isCheckoutPageDisplayed()).toBe(false);
  });
});
