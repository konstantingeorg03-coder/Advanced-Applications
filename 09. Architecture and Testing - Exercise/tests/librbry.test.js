const {expect, test} = require('@playwright/test');

test('check if the all books load', async ({page}) => {
    await page.goto('http://localhost:8080/02.%20bookLibrary2.html');
    await page.click('#loadBooks');
    await expect(page.locator('tbody')).toContainText('C# Fundamentals');
})

test('if a user can add Book', async ({page}) => {
    await page.goto('http://localhost:8080/02.%20bookLibrary2.html');
    await page.fill('[name="title"]', 'Message');
    await page.fill('[name="author"]', 'KG');
    const waitRequest = page.waitForRequest('**/jsonstore/collections/books');
    await page.click('form button');
    const request = await waitRequest;
    const data = JSON.parse(request.postData());
    expect(request.method()).toBe('POST');
    expect(data.author).toBe('KG');
    expect(data.title).toBe('Message');
})

test('if user can not submit empty inputs', async ({page}) => {
    await page.goto('http://localhost:8080/02.%20bookLibrary2.html');

    let sent = false;
    page.on('request', (req) => {
        if(req.method() === 'POST'){
            sent = true;
        }
    });
    await page.click('form button');
    await page.waitForTimeout(500);
    expect(sent).toBe(false);
})

test('if user can edit Book', async ({page}) => {
    await page.goto('http://localhost:8080/02.%20bookLibrary2.html');
    await page.click('#loadBooks');
    await page.click('[class="editBtn"]');
    const titleValue = await page.inputValue('[name="title"]');
    const authorValue = await page.inputValue('[name="author"]');
    expect(titleValue).toBe("Harry Potter and the Philosopher's Stone");
    expect(authorValue).toBe('J.K.Rowling');
})

test('if a user can save books', async ({page}) => {
    await page.goto('http://localhost:8080/02.%20bookLibrary2.html');
    await page.click('#loadBooks');
    await page.click('[class="editBtn"]');
    await page.fill('[name="title"]', "Harry Potter and the Philosopher's Stone");
    await page.fill('[name="author"]', 'J.K.Rowling');
    const waitReq = page.waitForRequest('**/jsonstore/collections/books/*');
    await page.click('form button');
    const request = await waitReq;
    const data = JSON.parse(request.postData());
    expect(request.method()).toBe('PUT');
    expect(data.title).toBe("Harry Potter and the Philosopher's Stone");
    expect(data.author).toBe('J.K.Rowling');
})

test('if user can delete books', async ({page}) => {
    await page.goto('http://localhost:8080/02.%20bookLibrary2.html');
    await page.fill('[name="title"]', 'Strategy');
    await page.fill('[name="author"]', 'KG');
    await page.click('form button');
    await expect(page.locator('tbody')).toContainText('Strategy');
    page.once('dialog', (dialog) => dialog.accept());
    const waitReq = page.waitForRequest('**/jsonstore/collections/books/*');
    await page.click('tbody tr:last-child .deleteBtn');
    const req = await waitReq;
    expect(req.method()).toBe('DELETE');
    
})