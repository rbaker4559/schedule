/* jQuery to ensure code isn't run until the browser has finished rendering all the elements in the html.*/
$(document).ready(function () {

  //stores time and agenda items
  $(".saveBtn").on("click", function() {
    var timeBlock = $(this).closest(".time-block");
    var timeBlockID = timeBlock.attr("id");
    var description = timeBlock.find(".description").val();

    localStorage.setItem(timeBlockID, description);
    console.log(localStorage);
  })

  //validates data by comparing current time w/ various time blocks; assigns class once validated
  function updateHours() {
    var currentHour = dayjs().hour();
    $(".time-block").each(function() {
      var timeBlock = $(this);
      var timeBlockHour = parseInt(timeBlock.attr("id").split("-")[1]);

      if (timeBlockHour < currentHour) {
        timeBlock.removeClass("present future").addClass("past");
      } else if (timeBlockHour === currentHour){
        timeBlock.removeClass("past future").addClass("present");
      } else if (timeBlockHour > currentHour){
        timeBlock.removeClass("past present").addClass("future");
      }
    });
  }
  

  //saves associated textarea elements
  $(".time-block").each(function(){
    var timeBlock = $(this);
    var timeBlockID = timeBlock.attr("id");
    var savedEvent = localStorage.getItem(timeBlockID)

    if(savedEvent) {
      timeBlock.find(".description").val(savedEvent);
    }
  })
  
  
  //displays current date w/in header
  function displayDate() {
    var currentDate = dayjs().format("dddd, MMMM, D, YYYY");
    $("#currentDay").text(currentDate);
  }
  updateHours();
  displayDate();
  setInterval(displayDate(), 60000);

});
