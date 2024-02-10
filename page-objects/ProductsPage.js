import {expect} from "@playwright/test"
import { Navigation } from "./Navigations" 

export class ProductPage{

/**
 * Represents a constructor function for a page object.
 * @param {Object} page - The page object containing locators and methods.
 */
constructor(page) {
    // Assign the page object to the instance property.
    this.page = page;

    // Locate the add buttons element on the page.
    this.addButtons = page.locator('[data-qa="product-button"]');

    // Locate the sort dropdown element on the page.
    this.sortDropdown = page.locator('.sort-dropdown');

    // Locate the product title element on the page.
    this.productTitle = page.locator('[data-qa="product-title"]');
}

    visit = async() =>{
        await this.page.goto("/")
    }


    addProductToBasket = async (index) => {
        const specificAddButton = this.addButtons.nth(index)
        
        await specificAddButton.waitFor()
        // verify button text before click
        await expect(specificAddButton).toHaveText("Add to Basket")

        const navigation = new Navigation(this.page)
        const basketCountBeforeAdding = await navigation.getBasketCount()

        await specificAddButton.click() 

        // verify button text change after click
        await expect(specificAddButton).toHaveText("Remove from Basket")
        const basketCountAfterAdding = await navigation.getBasketCount()

        // verify counter
        expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
    }

    sortByCheapest = async () => {
        await this.sortDropdown.waitFor()
        //get ordr of the products
        await this.productTitle.first().waitFor()
        const productTitleBeforeSorting = await this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption("price-asc")
        //get ordr of the products
        const productTitleAfterSorting = await this.productTitle.allInnerTexts()
        // expect that these list are different
        expect (productTitleAfterSorting).not.toEqual(productTitleBeforeSorting)

    }

    sortByDecending = async () => {
        await this.sortDropdown.waitFor()
        //get ordr of the products
        await this.productTitle.first().waitFor()
        const productTitleBeforeSorting = await this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption("price-desc")
        //get ordr of the products
        const productTitleAfterSorting = await this.productTitle.allInnerTexts()
        // expect that these list are different
        expect (productTitleAfterSorting).not.toEqual(productTitleBeforeSorting)

        //await this.page.pause()

    }
  
}