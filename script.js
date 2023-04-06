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
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i-- ) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`; 
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        liTag += `<li>${i}</li>`; 
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => { // add click event on both arrow icons
        // Changes months depending on arrow clicked
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        renderCalendar();
    });
});