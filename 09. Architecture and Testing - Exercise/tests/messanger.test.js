const {test, expect} = require('@playwright/test');

test('if user can resfresh messages', async ({page}) => {
    await page.goto('http://localhost:8080/01.%20messanger2.html');
    await page.click('#refresh');
    const textArea = await page.inputValue('#messages');
    expect(textArea).toContain('Spami: Hello, are you there?');
})

test('if a user can send messages', async ({page}) => {
    await page.goto('http://localhost:8080/01.%20messanger2.html');
    await page.fill('[name="author"]', 'KG');
    await page.fill('[name="content"]', 'Hello Mark');
    const promiseReqire = page.waitForRequest('**/jsonstore/messenger');
    await page.click('#submit');
    const request = await promiseReqire;
    const data = JSON.parse(request.postData());
    expect(request.method()).toBe('POST');
    expect(data.author).toBe('KG');
    expect(data.content).toBe('Hello Mark');
})