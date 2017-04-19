// Thse are all the constants that get used throughout the script.  
// studentItems is an array of all the list items containing the individual student entries provided by the site.
// defaultStudents starts as an empty array, but will be used later to record the position in the array of each of li entries from studentItems.
// studentList selects the ul the list of students is displayed in.
// studentNames selects the names of the students in the student items.
// page selects the container for the items in the body.
// header selects the header at the top of the page where we'll add the search box and the reset button.
const studentItems = document.getElementsByClassName('student-item');
const defaultStudents = [];
const studentList = document.getElementsByClassName('student-list')[0];
const studentNames = document.querySelectorAll('.student-details h3');
const page = document.getElementsByClassName('page')[0];
const header = document.getElementsByClassName('page-header')[0];




//When the program first runs, add the index of the studentItems to the defaultStudents array.
for (i = 0; i < studentItems.length; i++) {
    defaultStudents.push(i);
}
//Call the initialStudents()
initialStudents();


//Create the reset button and the search input group html, and puts the in the dom.  
const reset = document.createElement('button');
reset.className = 'reset-button';
reset.textContent = "Reset the search parameters";

const search = document.createElement('div');
search.className = "student-search";
const searchBar = document.createElement('input');
searchBar.placeholder = "Search for student records...";
const searchBttn = document.createElement('button');
searchBttn.textContent = "Search";
header.appendChild(search);
search.appendChild(reset);
search.appendChild(searchBar);
search.appendChild(searchBttn);




//Creates an event listener for the reset button, and when clicked calls the initialStudents().  
reset.addEventListener('click', () => {
    initialStudents();
});


//Creates an event listener for the search box and button, and when clicked does the following (see comments in the eventListener below)
searchBttn.addEventListener('click', () => {
    //  1) Stores the value of of the text in the search bar in the searchValue variable.
    //  2) Creates an empty array called matches, which will be used to store the position in the studentItems of values who match the search.
    let searchValue = searchBar.value;
    let matches = [];

    //  3) Calls the removeQuery() to look to see if the message that is displayed when no values are returned by the search exists already.
    removeQuery('.no-returns');

    //  4) If the search box has nothing in it, calls the initialStudents().
    if (searchValue.length == 0) {
        initialStudents();
    } else {
        //  5) Otherwise, for each student-item that exists with the same textContent as the searchValue push the index to the matches array.  
        //  For the student-items that do not meet this condition, hide them.
        for (let i = 0; i < studentItems.length; i++) {
            if (studentNames[i].textContent.includes(searchValue)) {
                matches.push(i);
            } else {
                studentItems[i].style.display = 'none';
            }
        }

        //6)  Send the matches[] over to pagination.
        paginate(matches);

        //7)  If there are no entries in the matches array (no results were returned,), display a message.
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





// The displayStudents function loops through the array provided (students), and if the entry is between the lowend and highend values that 
// are to be displayed based off pagination, displays the student-item associated with that value.  If the entry is is not between the
// lowend and highend values, it does not display.
function displayStudents(students, lowEnd, highEnd) {
    //Hide students 11 and up.
    for (let i = 0; i < students.length; i += 1) {
        if (i < highEnd && i >= lowEnd) {
            studentItems[students[i]].style.display = 'block';
            
        } else {
            studentItems[students[i]].style.display = 'none';
        }
    }

}


// removeQuery(element) is a function that checks to to see if the no-returns message already exists, and if it does, removes it from the dom.
// This is used to remove the no returns message when running another search, and to clear out pagination when running another search.
function removeQuery(element) {
    let elementQuery = document.querySelector(element);

    if (elementQuery != null) {
        elementQuery.remove();
    }

}

// paginate(students) is a function that create the pagination based on the length of the array passed in to the function.  

function paginate(students) {
 
    //If the pagination already exists, delete the pagination.  
    removeQuery('.pagination');

    //Create the pagination html up until the list container (ul)
    let pagination = document.createElement('div');
    pagination.className = "pagination";
    let pageList = document.createElement('ul');

    //Insert the pagination html.
    page.appendChild(pagination);
    pagination.appendChild(pageList);


    //Create the number of buttons needed to represent the amount of student records being looked for, and append it to the list container (ul).
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

    //For each page that exists, add an event listener that calls the displayStudents() with a calculated lowEnd and highEnd based off of the number of pages
    for (let i = 0; i < pageCount; i++) {
        let lowEnd = i * 10;
        let highEnd = i * 10 + 10;

        pageLinks[i].addEventListener('click', () => {
            displayStudents(students, lowEnd, highEnd);
        });


    }
    //Calls the displayStudents() to show the first 10 entries that are being looked for (either by search or default), putting the user on the "first" page.
    displayStudents(students, 0, 10);

}

// initialStudents() is a function the sets the display of the students and pagination to it's default form, showing the first ten student items.
function initialStudents() {
    removeQuery('.no-returns');
    displayStudents(defaultStudents, 0, 10);
    paginate(defaultStudents);
}





