/**
 * `Navigation` class handles the navigation-related actions in the application.
 */
export class Navigation {
    /**
     * Constructs a new instance of the `Navigation` class.
     * @param {Object} page - The page object from Playwright.
     */
    constructor(page) {
        this.page = page

        // Locator for the basket counter element.
        this.basketCounter = page.locator("[data-qa='header-basket-count']")
        // Locator for the checkout link.
        this.checkoutLink = page.getByRole('link', { name: 'Checkout' })
    }

    /**
     * Gets the count of items in the basket.
     * @returns {Promise<number>} The count of items in the basket.
     */
    getBasketCount = async () => {
        // Wait for the basket counter element to be visible.
        await this.basketCounter.waitFor()
        // Get the inner text of the basket counter element.
        const text = await this.basketCounter.innerText()
        // Parse the text to an integer and return it.
        return parseInt(text, 10)
    }

    /**
     * Navigates to the checkout page.
     * @returns {Promise<void>}
     */
    goToCheckout = async () => {
        // Wait for the checkout link to be visible.
        await this.checkoutLink.waitFor()
        // Click on the checkout link.
        await this.checkoutLink.click()
        // Wait for the URL to change to "/basket".
        await this.page.waitForURL("/basket")
    }
}
