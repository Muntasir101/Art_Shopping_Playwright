import { expect } from "@playwright/test"

export class Checkout {
    constructor(page) {
        this.page = page

        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')
        this.checkoutButton = page.locator('[data-qa="continue-to-checkout"]')

    }


    removeCheapestProduct = async () => {
        const itemsBeforeRemove = await this.basketCards.count()
        await this.basketCards.first().waitFor()
        await this.basketItemPrice.first().waitFor()
        const allPriceTexts = await this.basketItemPrice.allInnerTexts()
        //console.log(allPriceTexts) // [ '499$', '599$', '320$' ]
        const justNumbers = allPriceTexts.map((element) => {
            //const withoutDollarSign = element.replace("$","")
            return parseInt(element.replace("$",""), 10)

        })

        const smallestPrice = Math.min(...justNumbers)
        //console.log(smallestPrice) // 320

        const smallestPriceIndex = justNumbers.indexOf(smallestPrice)
        //console.log(smallestPriceIndex)
        
        const specificRemoveButton = this.basketItemRemoveButton.nth(smallestPriceIndex)
        await specificRemoveButton.waitFor()
        await specificRemoveButton.click()

        // verify item remove
        await expect(this.basketCards).toHaveCount(itemsBeforeRemove - 1)
        
        //await this.page.pause()
    }

    removeExpensiveProduct = async () => {
        const itemsBeforeRemove = await this.basketCards.count()
        await this.basketCards.first().waitFor()
        await this.basketItemPrice.first().waitFor()
        const allPriceTexts = await this.basketItemPrice.allInnerTexts()
        //console.log(allPriceTexts) // [ '499$', '599$', '320$' ]
        const justNumbers = allPriceTexts.map((element) => {
            //const withoutDollarSign = element.replace("$","")
            return parseInt(element.replace("$",""), 10)

        })

        const highestPrice = Math.max(...justNumbers)
        //console.log(highestPrice) 

        const highestPriceIndex = justNumbers.indexOf(highestPrice)
        //console.log(highestPriceIndex)

        const specificRemoveButton = this.basketItemRemoveButton.nth(highestPriceIndex)
        await specificRemoveButton.waitFor()
        await specificRemoveButton.click()

         // verify item remove
        await expect(this.basketCards).toHaveCount(itemsBeforeRemove - 1)
        
        //await this.page.close()
    }

    continueToCheckout = async () => {
        await this.checkoutButton.waitFor()
        await this.checkoutButton.click()
        await this.page.waitForURL(/\/login/)
    }

    
}
