import {expect} from "@playwright/test"
import { commonFunctions } from "../utils/common"
import { deliveryDetails } from "../data/dataDeliveryDetails"

export class DeliveryDetails{
    constructor(page) {
        this.page = page

        this.firstName = page.getByPlaceholder('First name')
        this.lastName = page.getByPlaceholder('Last name')
        this.street = page.getByPlaceholder('Street')
        this.postCode = page.getByPlaceholder('Post code')
        this.city = page.getByPlaceholder('City')
        this.country = page.locator('[data-qa="country-dropdown"]')
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.continuePaymentButton = page.getByRole('button', { name: 'Continue to payment' })
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]')
        this.savedAddressFirstname = page.locator('[data-qa="saved-address-firstName"]')
        this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedAddressPostCode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedAddressCity = page.locator('[data-qa="saved-address-city"]')
        this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]')

    }

    fillDetails = async (deliveryDetails) => {
        
        await this.firstName.waitFor()
        await this.firstName.fill(deliveryDetails.firstName)

        await this.lastName.waitFor()
        await this.lastName.fill(deliveryDetails.lastName)

        await this.street.waitFor()
        await this.street.fill(deliveryDetails.street)

        await this.postCode.waitFor()
        await this.postCode.fill(deliveryDetails.postCode)

        await this.city.waitFor()
        await this.city.fill(deliveryDetails.city)

        await this.country.waitFor()
        await this.country.selectOption(deliveryDetails.country)

        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()

        //await this.continuePatmentButton.waitFor()
        //await this.continuePatmentButton.click()

        //await this.page.pause()

    }

    saveDetails = async() => {
        const addressCountBeforeSaving = await this.savedAddressContainer.count()
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        await expect(this.savedAddressContainer).toHaveCount(addressCountBeforeSaving + 1)

        expect (await this.savedAddressFirstname.first().innerText()).toBe(deliveryDetails.firstName)
        expect (await this.savedAddressLastName.first().innerText()).toBe(deliveryDetails.lastName)
        expect (await this.savedAddressStreet.first().innerText()).toBe(deliveryDetails.street)
        expect (await this.savedAddressCity.first().innerText()).toBe(deliveryDetails.city)
        expect (await this.savedAddressCountry.first().innerText()).toBe(deliveryDetails.country)

    }
}