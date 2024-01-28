import { test} from "@playwright/test"
import { ProductPage } from "../page-objects/ProductsPage.js"
import { Navigation } from "../page-objects/Navigations.js" 
import { Checkout } from "../page-objects/CheckoutPage.js"
import { Login } from "../page-objects/LoginPage.js"
import { Signup } from "../page-objects/SignupPage.js"

test.only("New User Full End-to-End Test", async ({page}) =>{
    const productPage = new ProductPage(page)
    await productPage.visit()

    await productPage.sortByCheapest()
    await productPage.sortByDecending()

    await productPage.addProductToBasket(0)
    await productPage.addProductToBasket(1)
    await productPage.addProductToBasket(2)

    const navigation = new Navigation(page)
    await navigation.goToCheckout()

    const checkout = new Checkout(page)
    await checkout.removeCheapestProduct()
    await checkout.removeExpensiveProduct()
    await checkout.continueToCheckout()

    const login = new Login(page)
    await login.moveToSignup()

    const signup = new Signup(page)
    await signup.createAccount()


    //await page.pause()
 
})