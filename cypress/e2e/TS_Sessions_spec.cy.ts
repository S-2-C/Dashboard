describe("TS_Sessions", function () {
  // Step 1: setup the application state
  beforeEach(function () {
    cy.visit("/");
  });

  describe("Sign In:", () => {
    it("allows a user to signin", () => {
      // Step 2: Take an action (Sign in)

      cy.get(selectors.emailInput).type("pridapablo@gmail.com");
      cy.get(selectors.signInPasswordInput).type("TestUser123");
      cy.get(selectors.signInButton).contains("Sign in").click();

      cy.wait(3000);

      // Step 3: Make an assertion (Check for sign-out text)
      // cy.get(selectors.signOutButton).contains("Sign out");
    });
  });
});
export const selectors = {
  emailInput: 'input[type="email"]',
  signInPasswordInput: 'input[type="password"]',
  signInButton: 'button[type="submit"]', // or use '.amplify-button--primary.amplify-button--fullwidth' or 'cy.contains('button', 'Sign in')'
  // signOutButton: 'your-sign-out-button-selector', // Update this according to your actual sign-out button
};
