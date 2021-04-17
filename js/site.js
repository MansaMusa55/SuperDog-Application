//Array of Events that loads when site is deployed
let superArray = [{
    eventName: "Super Dome",
    city: "Minneapolis",
    state: "Minnesota",
    attendance: 120120,
    date: "12/31/2021",
},

{
    eventName: "Game of Dogs",
    city: "Dallas",
    state: "Texas",
    attendance: 112020,
    date: "1/31/2021",
},

{
    eventName: "Champions Cup",
    city: "Los Angeles",
    state: "California",
    attendance: 5000,
    date: "2/31/2021",
},

{
    eventName: "Frozen Tundra",
    city: "Minneapolis",
    state: "Minnesota",
    attendance: 10000,
    date: "12/3/2021",
},

{
    eventName: "Wild Card",
    city: "Kernsville",
    state: "North Carolina",
    attendance: 109800,
    date: "12/4/2021",
},



];

//The default display is all events
let filteredEvents = superArray; 

//Drop down menu
function buildDropDown() {
    let eventDD = document.getElementById("eventDropDown");
    let curEvents = JSON.parse(localStorage.getItem("eventArray")) || superArray;
    let distinctEvents = [...new Set(curEvents.map((event) => event.city))];

    let linkHTMlEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All" >All</a>';
    let resultsHTML = "";

    for (let i = 0; i < distinctEvents.length; i++) {

        resultsHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;
    }

    resultsHTML += linkHTMlEnd;
    eventDD.innerHTML = resultsHTML;
    displayStats();
}
//Displays stats for events
function displayStats(){
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance  = 0;

//For loop to determine the most, least, average and total of all known events
    for (let i = 0; i < filteredEvents.length; i++) {
        currentAttendance = filteredEvents[i].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
        }

        if (least > currentAttendance || least < 0) {
            least = currentAttendance
        }
    
    }

    average = total / filteredEvents.length;
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }
    );


}

//Get the events for the selected city
function getEvents(element) {
    let city = element.getAttribute("data-string");
    curEvents = JSON.parse(localStorage.getItem("eventArray")) || superArray;
    filteredEvents = curEvents;
    document.getElementById("statsHeader").innerHTML = `Stats For ${city} Events`;
    if (city != "All") {
        filteredEvents = curEvents.filter(function (item){
            if(item.city == city) {
                return item;
            }
        });
    }
    
    displayStats();
}


loadAddDog();
// This will load data to the page as soon as the page is accessed
function loadAddDog() {
    let addDog = []; 
    addDog = getData();
    displayData(addDog);
}

function getData() {
    let addDog = JSON.parse(localStorage.getItem("eventArray")) || [];

    if (addDog.length == 0) {
        addDog = superArray;
        localStorage.setItem("eventArray", JSON.stringify(addDog));
    }
    return addDog;
}
//Saves event when entered into modal 
function saveEvent() {
    let addDog = JSON.parse(localStorage.getItem("eventArray")) || superArray;
//Get element by id method to extract the values entered into modal
    let obj = {};
    obj["eventName"] = document.getElementById("newEvent").value;
    obj["city"] = document.getElementById("newCity").value;
    obj["state"] = document.getElementById("newState").value;
    obj["attendance"] = document.getElementById("newAttendance").value;
    obj["date"] = document.getElementById("newDate").value;
//Pushes the entered information to the end of the superArray
    addDog.push(obj);

    localStorage.setItem("eventArray", JSON.stringify(addDog));

    buildDropDown();
    displayData(addDog);
    
}
//This function displays the new/existin data to the table on the bottom of the page
function displayData(addDog) {
    const template = document.getElementById("Data-template");
    const resultsBody = document.getElementById("resultsBody");

    resultsBody.innerHTML = "";
    for (let i = 0; i < addDog.length; i++) {
        const dataRow = document.importNode(template.content, true);

        dataRow.getElementById("eventName").textContent = addDog[i].eventName;
        dataRow.getElementById("city").textContent = addDog[i].city;
        dataRow.getElementById("state").textContent = addDog[i].state;
        dataRow.getElementById("attendance").textContent = addDog[i].attendance;
        dataRow.getElementById("date").textContent = addDog[i].date;

        resultsBody.appendChild(dataRow)
    }
}      
