const { test, expect} = require ('@playwright/test');

test('if a user can add Tast', async ({page}) => {
    await page.goto('http://localhost:8080');
    await page.fill('#task-input', 'First Task');
    await page.click('#add-task');
    const addTask = await page.textContent('.task');
    expect(addTask).toContain('First Task');
})

test('if a user can delete Tast', async ({page}) => {
    await page.goto('http://localhost:8080');
    await page.fill('#task-input', 'First Task');
    await page.click('#add-task');
    await page.click('.delete-task');
    const deleteTask = await page.$('.task');
    expect(deleteTask).toBeNull();
})

test('if a user can complete Tast', async ({page}) => {
    await page.goto('http://localhost:8080');
    await page.fill('#task-input', 'First Task');
    await page.click('#add-task');
    await page.click('.task-complete');
    const completeTask = await page.$('.task.completed');
    expect(completeTask).not.toBeNull();
})

test('if a user can use Filter', async ({page}) => {
    await page.goto('http://localhost:8080');
    await page.fill('#task-input', 'First Task');
    await page.click('#add-task');
    await page.selectOption('#filter', 'Completed');
    const result = await page.$('.task:not(.completed):visible');
    expect(result).toBeNull();
})


