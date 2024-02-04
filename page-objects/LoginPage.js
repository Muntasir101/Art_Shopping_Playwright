/**
 * Login class represents the login functionality in a Playwright test.
 * It provides methods to interact with the login page, specifically moving to the signup page.
 * @class
 */
export class Login {
    /**
     * Creates an instance of the Login class.
     * @constructor
     * @param {Page} page - Playwright Page object representing the current page.
     */
    constructor(page) {
        this.page = page;

        // Locator for the "Move to Signup" button on the login page.
        this.moveToSignupButton = page.locator('[data-qa="go-to-signup-button"]');
    }

    /**
     * Moves to the signup page by clicking the "Move to Signup" button.
     * @async
     * @method
     * @returns {Promise<void>} - A promise that resolves once the navigation to the signup page is complete.
     */
    moveToSignup = async () => {
        // Wait for the "Move to Signup" button to be present.
        await this.moveToSignupButton.waitFor();

        // Click the "Move to Signup" button.
        await this.moveToSignupButton.click();

        // Wait for the page navigation to the signup page.
        await this.page.waitForURL(/\/signup/);
    }
}
