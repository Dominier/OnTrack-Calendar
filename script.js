// Calendar
const currentDate = document.querySelector(".current-date"),
daysTag = document.querySelector(".days"),
prevNextIcon = document.querySelectorAll(".arrowIcons span");
// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();


const months = ["January", "February", "March", "April", "May", "June", "July", 
                "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i-- ) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`; 
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year are matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                        && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`; 
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`; 
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => { // add click event on both arrow icons
        // Changes months depending on arrow clicked
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) { // if currMonth is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as a date value
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear(); // updating current year
            currMonth = date.getMonth(); // updating current month
        } else { // else pass new Date as date value
            date = new Date();
        }

        renderCalendar();
    });
});

//First whenever user clicks submit button: store item into a list and save the list locally
//Make sure the delete will remove the item from this list 
//Whenever the page gets refreshed first use a for loop for each item in saved list make a new object. 

// TO-DO LIST

window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || []; // Local storage for todo list -- global variable
    const nameInput = document.querySelector('#name'); // document.querySelector('#name') is selecting the first 'name' id
    const newTodoForm = document.querySelector('#new-todo-form');

    const username = localStorage.getItem('username') || ''; // creates local storage for usernames

    nameInput.value = username;

    nameInput.addEventListener('change', e => { // e is short for event
    localStorage.setItem('username', e.target.value); // stores username and updates name if changed
    //requests permission to send notifications
    
    DisplayTodos();
    })

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        Notification.requestPermission().then((result) =>{
            if (result !== 'granted'){
                alert('You need to allow notifications for your tasks');
            } else {
                const timeStamp = new Date().getTime() + 5 * 1000; 
                
            }
        });

        
        
        let taskContent = document.querySelector('#content').value;

       

        const todo = {
            content: taskContent,
            category: e.target.elements.category.value,
            timeNotify: e.target.elements.timeStart.value,
            done: false,
            createdAt: new Date().getTime()
        }
        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos)); 

        e.target.reset(); // reset the form

        DisplayTodos() // calls function to display the tasks/todos
    })

    DisplayTodos()
})

function DisplayTodos() {
    
    const todoList = document.querySelector('#todo-list');
    //localStorage.removeItem("todos");  //removes the items so not as cluttered for now in the local storage need to remove later.

    todoList.innerHTML = "";

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        const label = document.createElement('label'); // creates new label in html
        const input = document.createElement('input'); // creates new input in html
        const span = document.createElement('span'); // creates new span in html
        const content = document.createElement('div'); // creates new div in html
        const actions = document.createElement('div'); // creates new div in html
        const edit = document.createElement('button'); // creates new button in html
        const deleteButton = document.createElement('button'); // creates new button in html
        const timeStart = document.createElement('div'); //creates the time if added
       
        input.type = 'checkbox'; // check if done or not done
        input.checked = todo.done; // tell if done or not done
        span.classList.add('bubble'); // adds bubble span

        timeStart.innerHTML =todo.timeNotify;  //displays the time of the task
        timeStart.classList.add('time'); //adds a time class
        

        if (todo.category == 'personal') { // checks if user selects personal or business, then creates span according to choice
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');


        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`; // writing in html directly               FIX ME NEED TO CHECK HOW HE MAKES THE INNER HTML. 

        edit.innerHTML = 'Edit'; // creates edit text
        deleteButton.innerHTML = 'Delete'; // creates delete text

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);
        todoItem.appendChild(timeStart);

        todoList.appendChild(todoItem);

        if (todo.done) {
            todoItem.classList.add('done');
        }
        //works now!
        input.addEventListener('click', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));
            
            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }

            DisplayTodos();
        })

        /* Edit button */
        edit.addEventListener('click', e => {
            console.log(content.querySelector('input'));
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {  //checks if the user unfocuses
                input.setAttribute('readonly', true); 
                todo.content = e.target.value;  //changes the content object value to updated value 
                localStorage.setItem('todos', JSON.stringify(todos));  //updates the localStorage list item and changes it
                DisplayTodos();
            })
        })

        //for each todo object they have an event listener so the deleteButton can call a specific todo element to be deleted
        //Since this element was "clicked" this element is the 'todo' value. 
        deleteButton.addEventListener('click', (e) => {
            console.log(e);     
           
			todos = todos.filter(t => t != todo); //filters out an array where the elements do not equal to the specific todo object
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})
        
    })    
}






//experimenting with the notifications


//need to find a way to get time 
//time buttons
var btn = document.getElementById('btn');
function amClick(){
    btn.style.left = '0'
    
}
function pmClick(){
    btn.style.left = '110px'
}
const button = document.querySelector("button");
/* 
button.addEventListener("click", () => {
    Notification.requestPermission().then(perm =>{
        if (perm === "granted") {
            if (Math.round(new Date()))
            new Notification("Example notification", {
                body: "This is more text"
                
            })
        }
    })
})
*/