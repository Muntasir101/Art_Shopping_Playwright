import { test, expect } from "@playwright/test"

test("Product page Add To Busket",async ( {page} ) =>{
    await page.goto("/")

    const addAstronautButton =page.locator("[class] [data-qa='product-card']:nth-of-type(1) [class] [class] div")
    // add assertion before click    
    await expect(addAstronautButton).toHaveText("Add to Basket")
    await addAstronautButton.waitFor()
    await addAstronautButton.click()
    // add assertion after click    
    await expect(addAstronautButton).toHaveText("Remove from Basket")
    console.log("Astronaout added successfully")

    // verify item added successfully on basket count
    const count = page.locator("[data-qa='header-basket-count']")
    await expect(count).toHaveText("1")
    console.log("Astronaout added successfully on basket count: " + (await count.innerText()))
    
    const addMountainButton =page.locator("[class] [data-qa='product-card']:nth-of-type(2) [class] [class] div")
    // add assertion before click    
    await expect(addMountainButton).toHaveText("Add to Basket")
    addMountainButton.waitFor()
    await addMountainButton.click()
    //add assertion
    await expect(addMountainButton).toHaveText("Remove from Basket")
    console.log("Mountain added successfully")
    // verify item added successfully on basket count
    await expect(count).toHaveText("2")
    console.log("Mountain added successfully on basket count: " + (await count.innerText()))

    const checkoutLink = page.getByRole('link', { name: 'Checkout' })
    await checkoutLink.waitFor()
    checkoutLink.click()
    //verify by URL
    await page.waitForURL("/basket")
    console.log("Checkout page open successfully verify by URL")
    
    //verify by Title
    const expectedTitle = 'Art Shopping Store';
    const pageTitle = await page.title();

    // Using Jest assertion
    expect(pageTitle).toBe(expectedTitle);
    console.log("Checkout page open successfully verify by Title")



    await page.pause();
}) 