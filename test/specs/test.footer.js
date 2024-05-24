import loginPage from "../pageobjects/login.page.js";
import mainPage from "../pageobjects/main.page.js";

describe("Footer Tests", () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
  });

  it("TC-0007- Verify Twitter icon opens correct URL", async () => {
    await mainPage.checkTwitterIcon();
  });

  it("TC-0007 - Verify Facebook icon opens correct URL", async () => {
    await mainPage.checkFacebookIcon();
  });

  it("TC-0007 - Verify LinkedIn icon opens correct URL", async () => {
    await mainPage.checkLinkedinIcon();
  });
});
