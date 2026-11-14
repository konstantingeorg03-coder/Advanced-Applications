const {test, expect} = require('@playwright/test');

test('if a user clicks Refresh, there are messages in the field', async ({page}) => {
    await page.goto('http://localhost:8080/01.%20messanger2.html');
    await page.click('#refresh');
    const inputValue = await page.inputValue('#messages');
    expect(inputValue).toContain('Spami: Hello, are you there?');
})

test('if user can send a message', async ({page}) => {
    await page.goto('http://localhost:8080/01.%20messanger2.html');
    await page.fill('[name="author"]', 'KG');
    await page.fill('[name="content"]', 'Hello Mark');
    const requestPromise = page.waitForRequest('**/jsonstore/messenger');
    await page.click('#submit');
    const request = await requestPromise; 
    expect(request.method()).toBe('POST');
    const  data = JSON.parse(request.postData());
    expect(data.author).toBe('KG');
    expect(data.content).toBe('Hello Mark');
})