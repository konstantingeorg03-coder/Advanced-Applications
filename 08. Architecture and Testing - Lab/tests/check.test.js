const { test, expect } = require('@playwright/test');

test('if a user can add the task', async ({page}) => {
    await page.goto('http://localhost:8080');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    const taskText = await page.textContent('.task');
    expect(taskText).toContain('Test Task');
})

test('if a user can delete the task', async ({page}) => {
    await page.goto('http://localhost:8080');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    await page.click('.task .delete-task');
    const tasks = await page.$$eval('.task', tasks => tasks.map(task => task.textContent));
    expect(tasks).not.toContain('Test Task');
})

test('if a user can complete the task', async ({page}) => {
    await page.goto('http://localhost:8080');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    await page.click('.task-complete');
    const completeTask = await page.$('.task.completed');
    expect(completeTask).not.toBeNull();
})

test('if a filter works', async ({page}) => {
    await page.goto('http://localhost:8080');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    await page.selectOption('#filter', 'Completed');
    const filterTasks = await page.$('.task:not(.completed):visible');
    expect(filterTasks).toBeNull();
})

