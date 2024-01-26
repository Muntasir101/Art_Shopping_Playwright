import {expect} from "@playwright/test"
import { Navigation } from "./Navigations" 

export class ProductPage{

    constructor(page){
        this.page = page

        this.addButtons = page.locator('[data-qa="product-button"]')

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

    
}