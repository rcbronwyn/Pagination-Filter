const studentList = document.getElementsByClassName('student-item');
const page = document.getElementsByClassName('page')[0];

//Hide students 11 and up.
for (let i = 0; i < studentList.length; i += 1) {
    if (i > 9) {
        studentList[i].style.display = 'none';
    }
}


//Create the pagination
let pagination = document.createElement('div');
pagination.className = "pagination";
let pageList = document.createElement('ul');


//Insert the pagination html.
page.appendChild(pagination);
pagination.appendChild(pageList);

for (let i = 1; i < studentList.length / 10; i += 1) {
    const button = document.createElement('li');
    const buttonLink = document.createElement('a');
    buttonLink.textContent = i;
    buttonLink.href = "#";

    button.appendChild(buttonLink);
    pageList.appendChild(button);
}



//Lets add event listeners to the pagination!
let pageLinks = document.querySelectorAll('.pagination ul li a');
let pageCount = pageLinks.length;
console.log(pageCount);


for (let i = 0; i < pageCount; i++) {
    pageLinks[i].addEventListener('click', () => {
        for (let k = 0; k < i * 10; k++) {
            studentList[k].style.display = "block";
        };
    });
}