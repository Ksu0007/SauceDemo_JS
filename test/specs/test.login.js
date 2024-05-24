import loginPage from "../pageobjects/login.page.js";
import mainPage from "../pageobjects/main.page.js";

describe("Login Tests", () => {
  it("TC 0001 - login of the valid user with valid credentials", async () => {
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
    await mainPage.checkMainPageTitle("Products");
  });

  it("TC 0002 - Login with invalid password", async () => {
    await loginPage.open();
    await loginPage.login("standard_user", "12345");

    await loginPage.checkXiconUsrnameIsDisplayed;
    await loginPage.checkUsernameFieldHighlighting;

    await loginPage.checkXiconPassIsDisplayed;
    await loginPage.checkPasswordFieldHighlighting;

    await loginPage.checkErrorMessage(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("TC-0003 - Login with invalid login", async () => {
    await loginPage.open();
    await loginPage.login("suser", "secret_sauce");

    await loginPage.checkXiconUsrnameIsDisplayed;
    await loginPage.checkUsernameFieldHighlighting;

    await loginPage.checkXiconPassIsDisplayed;
    await loginPage.checkPasswordFieldHighlighting;

    await loginPage.checkErrorMessage(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("TC-0004 - Logout", async () => {
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");

    await mainPage.checkNumberofBurgerMenuLinks(4);

    await mainPage.logout();

    await loginPage.checkUsernameInoutIsEmpty();
    await loginPage.checkPasswordInputIsEmpty();
  });
});
