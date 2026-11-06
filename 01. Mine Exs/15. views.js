export function showView(id){
    const sections = document.querySelectorAll('section');

    sections.forEach((section) => section.style.display = 'none');

    const needSection = document.getElementById(id);

    needSection.style.display = 'block';
}