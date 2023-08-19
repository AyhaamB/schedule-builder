// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

    let saveBtns = document.querySelectorAll(".saveBtn");
    for (let i = 0; i < saveBtns.length; i++) {
      let button = saveBtns[i];
      // adding an event listener to the buttons
      button.addEventListener("click", function (save) {
        let clicked = save.target; // Capturing the clicked button
        // targets the sibling elements to the button which is the text area
        let descriptionEl = clicked.previousElementSibling;
  
        // capturing the value of the text area
        let description = descriptionEl.value;
        // grabs the id of the parent element which is a div
        let hourId = clicked.parentElement.id;
  
        // sets the div id and the text area into the local storage
        localStorage.setItem(hourId, description);
      });
    }
  
    // function to retrieve the data stored in local storage
    function pullMemos() {
      let timeBlocks = document.querySelectorAll(".time-block");
      for (let i = 0; i < timeBlocks.length; i++) {
        // the selected slot will be the index of the time blocks
        let selectedSlot = timeBlocks[i];
        // grabs the id of the current selected slot
        let hourSelected = selectedSlot.id;
  
        // setting variables for the data in the local storage and selecting the text area in the html 
        let planMemo = localStorage.getItem(hourSelected);
        let planEl = selectedSlot.querySelector(".description");
  
        // displaying the data into the selected class
        planEl.value = planMemo
      }
    }
    // Creating a function that will upadate time block colours based on the current time
    function updateTimeBlocks() {
      // pulling the current hour in military time from dayjs
      let currentTime = dayjs().hour();
      // selecting time block class and for each of them we are running a function
      $(".time-block").each(function () {
        // gets the id from the time block div and removes the word hour, and changes the numeric string to an interger using the parse, the split method will remove the dash between the hour and its number
        var timeBlockHr = parseInt($(this).attr("id").split("-")[1])
        // checks if the current time block is less than the current hour, if yes, add the past class to the current time block
        if (timeBlockHr < currentTime) {
          $(this).addClass("past")
          // checks if the current time block is strictly equal to the current hour, if yes, remove the past class and add the present class
        } else if (timeBlockHr === currentTime) {
          $(this).removeClass("past")
          $(this).addClass("present")
          // if neither of the above are true, remove the past and present class and add the future class
        } else {
          $(this).removeClass("past")
          $(this).removeClass("present")
          $(this).addClass("future")
        }
      })
    }
  
    updateTimeBlocks();
    // setting an interval so the time block backgrounds compare themselves to the hour every 30 seconds
    setInterval(updateTimeBlocks, 30000)
  
    pullMemos();
  
  
    // TODO: Add code to display the current date in the header of the page.
    let timeDisplayEl = document.querySelector("#currentDay")
  
    function displayTime() {
      // pulling the current time from the dayjs library
      var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
      timeDisplayEl.textContent = rightNow;
    }
  
    displayTime();
    // setting an interval so the current time stays up to date every second
    setInterval(displayTime, 1000)
  
  });
  
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
  
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
  
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?