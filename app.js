const studentList = document.getElementsByClassName('student-item');
const page = document.getElementsByClassName('page')[0];
const header = document.getElementsByClassName('page-header')[0];

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

for (let i = 0; i < studentList.length / 10; i += 1) {
    const button = document.createElement('li');
    const buttonLink = document.createElement('a');
    buttonLink.textContent = i + 1;
    buttonLink.href = "#";

    button.appendChild(buttonLink);
    pageList.appendChild(button);
}


//Create the search input group.
let search = document.createElement('div');
search.className = "student-search";
let searchBar = document.createElement('input');
searchBar.placeholder = "Search for student records...";
let searchBttn = document.createElement('button');
searchBttn.textContent = "Search";
header.appendChild(search);
search.appendChild(searchBar);
search.appendChild(searchBttn);



//Lets add event listeners to the pagination!
let pageLinks = document.querySelectorAll('.pagination ul li a');
let pageCount = pageLinks.length;

    
for (let i = 0; i < pageCount; i++) {
    let lowEnd = i * 10;
    let highEnd = i * 10 + 10;



    pageLinks[i].addEventListener('click', () => {
        for (let k = 0; k < studentList.length; k += 1) {
            if (k < highEnd && k >= lowEnd) {
                studentList[k].style.display = 'block';
            } else {
                studentList[k].style.display = 'none';
            }
        }
    });
}