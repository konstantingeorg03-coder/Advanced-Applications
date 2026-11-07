let currentYear = null;

const allMonths = {
    Jan: 1, Feb: 2,
    Mar: 3, Apr: 4,
    May: 5, Jun: 6,
    Jul: 7, Aug: 8,
    Sept: 9, Oct: 10,
    Nov: 11, Dec: 12 
}

function showView(id){
    const sections = document.querySelectorAll('section');

    sections.forEach((section) => {
        section.style.display = 'none';
    });

    const neededSection = document.getElementById(id);

    neededSection.style.display = 'block';
}

showView('years');

const years = document.querySelectorAll('#years .day');

years.forEach((year) => {
    year.addEventListener('click', () => {
        currentYear = year.textContent.trim();

        showView(`year-${currentYear}`);
    });
});

const months = document.querySelectorAll('.monthCalendar .day');

months.forEach((month) => {
    month.addEventListener('click', () => {
        showView(`month-${currentYear}-${allMonths[month.textContent.trim()]}`);
    });
});

const titlesYears = document.querySelectorAll('.monthCalendar caption');

titlesYears.forEach((titleYear) => {
    titleYear.addEventListener('click', () => {
        showView('years');
    });
});

const titletMonths = document.querySelectorAll('.daysCalendar caption');

titletMonths.forEach((titleMonth) => {
    titleMonth.addEventListener('click', () => {
        showView(`year-${currentYear}`);
    })
})