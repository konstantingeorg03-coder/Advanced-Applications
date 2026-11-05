const form = document.getElementById('form');
const tbody = document.querySelector('tbody');

function loadStudents() {
    fetch('http://localhost:3030/jsonstore/collections/students')
    .then((response) => {
        if(!response.ok) throw new Error(`${response.status}`);

        return response.json();
    }).then((stData) => {
        const students = Object.values(stData).map((student) =>
            `<tr>
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
                <td>${student.facultyNumber}</td>
                <td>${student.grade}</td>
            </tr>`).join('');

        tbody.innerHTML = students;
    }).catch((error) => {
        console.log(error.message);
    });
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const facultyNumber = data.get('facultyNumber');
    const grade = data.get('grade');

    if(firstName === '' || lastName === '' || facultyNumber === '' || grade === ''){
        return;
    }

    fetch('http://localhost:3030/jsonstore/collections/students', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({firstName, lastName, facultyNumber, grade})
    })
    .then((response) => {
        if(!response.ok) throw new Error(`${response.status}`);

        return response.json();
    }).then((studentsData) => {
        form.reset();
        loadStudents();
    }).catch((error) => {
        console.log(error.message);
    });
});

loadStudents();
