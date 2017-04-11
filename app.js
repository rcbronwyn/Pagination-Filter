const studentList = document.getElementsByClassName('student-list')[0];
const studentItems = document.getElementsByClassName('student-item');
const studentNames = document.querySelectorAll('.student-details h3');
const page = document.getElementsByClassName('page')[0];
const header = document.getElementsByClassName('page-header')[0];
const studentArray = [];


function initialStudents() {
    //Hide students 11 and up.
    for (let i = 0; i < studentNames.length; i += 1) {
        if (i > 9) {
            studentItems[i].style.display = 'none';
        } else {
            studentItems[i].style.display = 'block';
        }
    }

}

function returnQuery() {

    let noreturns = document.querySelector('.no-returns');
    if (noreturns != null) {
        noreturns.remove();
    }

}

function paginationQuery() {

    let noreturns = document.querySelector('.pagination');
    if (noreturns != null) {
        noreturns.remove();
    }

}

function paginate(students) {
 
    paginationQuery()

    //Create the pagination
    let pagination = document.createElement('div');
    pagination.className = "pagination";
    let pageList = document.createElement('ul');

    //Insert the pagination html.
    page.appendChild(pagination);
    pagination.appendChild(pageList);




    //Create the number of buttons needed to represent the amount of student records being looked for.
    for (let i = 0; i < students.length / 10; i += 1) {
        const button = document.createElement('li');
        const buttonLink = document.createElement('a');
        buttonLink.textContent = i + 1;
        buttonLink.href = "#";

        button.appendChild(buttonLink);
        pageList.appendChild(button);
    }


    //Lets add event listeners to the pagination!
    let pageLinks = document.querySelectorAll('.pagination ul li a');
    let pageCount = pageLinks.length;


    for (let i = 0; i < pageCount; i++) {
        let lowEnd = i * 10;
        let highEnd = i * 10 + 10;

        pageLinks[i].addEventListener('click', () => {
            for (let k = 0; k < students.length; k += 1) {
                if (k < highEnd && k >= lowEnd) {
                    studentItems[students[k]].style.display = 'block';
                } else {
                    studentItems[students[k]].style.display = 'none';
                }
            }
        });


    }

    for (let i = 0; i < students.length;i++) {
        if (i < 10 && i >= 0) {
            studentItems[students[i]].style.display = 'block';
        } else {
            studentItems[students[i]].style.display = 'none';
        }
    }

}

for (i = 0; i < studentItems.length; i++) {
    studentArray.push(i);
}

initialStudents();
paginate(studentArray);





//Create the search input group.
let reset = document.createElement('button');
reset.className = 'reset-button';
reset.textContent = "Reset the search parameters";

let search = document.createElement('div');
search.className = "student-search";
let searchBar = document.createElement('input');
searchBar.placeholder = "Search for student records...";
let searchBttn = document.createElement('button');
searchBttn.textContent = "Search";
header.appendChild(search);
search.appendChild(reset);
search.appendChild(searchBar);
search.appendChild(searchBttn);





reset.addEventListener('click', () => {

    initialStudents();
    paginate(studentArray);



});

//When search button is clicked, if the terms of the search return any result, display them and hide the other student records.

searchBttn.addEventListener('click', () => {
        let searchValue = searchBar.value;
        let matches = [];


        returnQuery();
 

        if (searchValue.length == 0) {
            initialStudents();
        } else {

            for (let i = 0; i < studentItems.length; i++) {
                if (studentNames[i].textContent.includes(searchValue)) {
                    matches.push(i);
                    console.log(i); 
                    if (matches < 11) {
                        studentItems[i].style.display = 'block';
                    }
                    
                } else {
                    studentItems[i].style.display = 'none';
                }
            }
            //Sending matches over to pagination.
            paginate(matches);
            
            //If no results are returned, display a message
            if (matches.length == 0) {
                const noReturn = document.createElement('div');
                noReturn.className = 'no-returns';
                const noReturnTitle = document.createElement('h1');
                noReturnTitle.textContent = ("We're sorry,");
                noReturnTitle.style.textAlign = 'center';
                const noReturnMessage = document.createElement('p');
                noReturnMessage.textContent = ("Unfortunately, your search returned no results.  Please search for another term, or reset the search using the link in the header.");
                noReturnMessage.style.textAlign = 'center';

                studentList.appendChild(noReturn);
                noReturn.appendChild(noReturnTitle);
                noReturn.appendChild(noReturnMessage);
            }
        }


});


