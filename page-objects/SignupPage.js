import { expect } from "@playwright/test"

export class Signup {
constructor(page) {
    this.page = page

    this.emailField = page.locator('.m-auto.rounded.w-full > input:nth-of-type(1)')
    this.passwordField = page.locator('.m-auto.rounded.w-full > input:nth-of-type(2)')
    this.registerButton = page.locator('[type] div')
    }

    createAccount = async () => {
        await this.emailField.waitFor()
        await this.emailField.clear()
        await this.emailField.type("Admin")

        await this.passwordField.waitFor()
        await this.passwordField.clear()
        await this.passwordField.type("123456")

        await this.registerButton.waitFor()
        await this.registerButton.click()

        await this.page.pause()


    }



}