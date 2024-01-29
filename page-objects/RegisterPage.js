import { expect } from "@playwright/test"
import { commonFunctions } from "../utils/common"

export class Signup {
constructor(page) {
    this.page = page

    this.emailField = page.locator('.m-auto.rounded.w-full > input:nth-of-type(1)')
    this.passwordField = page.locator('.m-auto.rounded.w-full > input:nth-of-type(2)')
    this.registerButton = page.locator('[type] div')
    }


    signUpAsNewUser = async () => {
        const commonUtils = new commonFunctions();

        await this.emailField.waitFor()
        await this.emailField.clear()
        const generatedNewEmail = commonUtils.randomEmail(); // Call the randomEmail function
        await this.emailField.fill(generatedNewEmail)

        await this.passwordField.waitFor()
        await this.passwordField.clear()
        const generatedNewPassword = commonUtils.randomPassword(); // Call the randomEmail function
        await this.passwordField.fill(generatedNewPassword)

        await this.registerButton.waitFor()
        await this.registerButton.click()

        await this.page.pause()

    }


}