Feature: Login feature

  Scenario: User tries to login without entering username
    Given User is located on the main page of saucedemo website
    When User clicks on the "Login" button
    Then User should see "Epic sadface: Username is required" error message
