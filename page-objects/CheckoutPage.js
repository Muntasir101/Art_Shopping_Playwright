export class Checkout {
    constructor(page) {
        this.page = page

        this.basketCard = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')
    }


    removeCheapestProduct = async () => {
        await this.basketCard.first().waitFor()
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

        await this.basketItemRemoveButton.nth(smallestPriceIndex).waitFor()
        await this.basketItemRemoveButton.nth(smallestPriceIndex).click()
        
        //await this.page.pause()
    }

    removeExpensiveProduct = async () => {
        await this.basketCard.first().waitFor()
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

        await this.basketItemRemoveButton.nth(highestPriceIndex).waitFor()
        await this.basketItemRemoveButton.nth(highestPriceIndex).click()
        
        await this.page.pause()
    }
}
