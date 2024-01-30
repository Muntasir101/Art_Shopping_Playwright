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
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.continuePatmentButton = page.getByRole('button', { name: 'Continue to payment' })
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

        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()

        await this.continuePatmentButton.waitFor()
        await this.continuePatmentButton.click()

    }
}