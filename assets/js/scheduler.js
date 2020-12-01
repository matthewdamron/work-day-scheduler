// set array for hourly tasks
var hourlyTasks = [];

// setup selector for start time
var startHourSelect = $('#startHour');
var hourlyTasksStart = JSON.parse(localStorage.getItem("hourlyTasksStart"));
if (!hourlyTasksStart) {
    // set default time to 9
    startHourSelect.val('09:00');
    localStorage.setItem("hourlyTasksStart", JSON.stringify(startHourSelect.val()));
    hourlyTasksStart = JSON.parse(localStorage.getItem("hourlyTasksStart"));
}
else {
    startHourSelect.val(hourlyTasksStart);
}

// setup selector for end time
var endHourSelect = $('#endHour');
var hourlyTasksEnd = JSON.parse(localStorage.getItem("hourlyTasksEnd"));
if (!hourlyTasksEnd) {
    // set default time to 17
    endHourSelect.val('17:00');
    localStorage.setItem("hourlyTasksEnd", JSON.stringify(endHourSelect.val()));
    hourlyTasksEnd= JSON.parse(localStorage.getItem("hourlyTasksEnd"));
}
else {
    endHourSelect.val(hourlyTasksEnd);
}

// pull and display current date from moment
$('#currentDay').text(moment().format('MMMM Do YYYY'));

// option to change start and end hours of the day.
var changeStartStopTime = function() {
    if (startHourSelect.val() > endHourSelect.val() || endHourSelect.val() < startHourSelect.val()) {
        alert('Start and End time cant be larger or smaller then each other! Typical work hours are 9AM to 5PM.')
    }
    else {
        localStorage.setItem("hourlyTasksStart", JSON.stringify(startHourSelect.val()));
        localStorage.setItem("hourlyTasksEnd", JSON.stringify(endHourSelect.val()));
    }
};

// set description color based on the hour of the day
var currentHour = function (taskDescription, hour) {
    // check to see if the current hour is in the past
    if (moment().hour() > hour) {
        taskDescription
            .addClass('past')
            .removeClass('present')
            .removeClass('future');
    }
    // check to see if the current hour is now
    else if (moment().hour() === hour) {
        taskDescription
            .removeClass('past')
            .addClass('present')
            .removeClass('future');
    }
    // check to see if the current hour is in future
    else {
        taskDescription
            .removeClass('past')
            .removeClass('present')
            .addClass('future');
    }

    // returns the current hour color
    return taskDescription;
};

// function to create hour time blocks
var setHoursOfDay = function() {
    // set hours of the day from 9 to 5
    for (var hour = hourlyTasksStart.substring(0, 2); hour <= hourlyTasksEnd.substring(0, 2); hour++) {
        // create <div> for hour block
        var taskDiv = $('<div>')
            .addClass('row m-1');
        
        // create <div> for hour
        var taskHourDiv = $('<div>')
            .addClass('col text-dark time-block')
            .text(moment({hour}).format('hA'));
        
        // create <textarea> for task description
        var taskDescription = $('<textarea>')
            .addClass('col-9 text-dark description ' + hour)
            .attr('id', 'description');
            
            // assign color to task
            currentHour(taskDescription, hour);

        // create <i> for save icon
        var taskSaveIcon = $('<i>')
            .addClass('far fa-save');

        // create save button
        var taskSave = $('<button>')
            .addClass('col saveBtn')
            .attr('hour', hour)
            .append(taskSaveIcon);

        // append all items to parrent div
        taskDiv
            .append(taskHourDiv)
            .append(taskDescription)
            .append(taskSave);
        
        // append hour block to container
        $('.container')
            .append(taskDiv);
    };
    // load hourly tasks from localStorage
    loadTasks();
};

var saveTasks = function() {
    // set items into localStorage
    localStorage.setItem("hourlyTasks", JSON.stringify(hourlyTasks));
};

var loadTasks = function() {
    // get itmes from localStorage
    hourlyTasks = JSON.parse(localStorage.getItem("hourlyTasks"));
  
    // if nothing in localStorage, create a new object to track all task status arrays
    if (!hourlyTasks) {
        hourlyTasks = [];
    }

    // loop through the items to place tasks into the correct hour block
    for (i = 0; i < hourlyTasks.length; i++) {
        $('.' + hourlyTasks[i].hour)
            .text(hourlyTasks[i].task);
    }
};

var clearLocalSotrage = function() {
    localStorage.removeItem('hourlyTasks');
    location.reload();
};

setHoursOfDay();

// event to see if clicked save button
$('.saveBtn').on('click', function() {
    // get var from silbling save button
    var taskHourDescription = $(this).siblings('#description').val();
    // get hour from the button clicked
    var taskHourBlock = $(this).attr('hour');

    // check to see if there are any value in the hourlyTask array if not then load the first save in the array
    if (!hourlyTasks.length) {
        hourlyTasks.push({
            hour: taskHourBlock,
            task: taskHourDescription
        });
        saveTasks();
    }
    // if there are saved values in the hourlyTask array then check if there are tasks in that hour already and update to new information.
    else {
        for (i = 0; i < hourlyTasks.length; i++) {
            if (hourlyTasks[i].hour === taskHourBlock) {
                hourlyTasks[i].task = taskHourDescription;
                saveTasks();
                // exit out of function once the existing task has been updated
                return;
            }
        };
        // if there are no existing task then add them to the array
        hourlyTasks.push({
            hour: taskHourBlock,
            task: taskHourDescription
        });
        saveTasks();
    }    
});

// $('#startHour').change('change', function() {
    // localStorage.setItem("hourlyTasksStart", JSON.stringify(startHourSelect.val()));
    // var startHourSplitVal = startHourSelect.val().split(":");
    // var startHourSplit = startHourSplitVal[0];
    // console.log('test');
// });

// $('#endHour').change('change', function() {
    // localStorage.setItem("hourlyTasksEnd", JSON.stringify(endHourSelect.val()));
    // console.log('test');
// });

// set time interval to reload the page every 15 min
setInterval(function () {
    location.reload();
}, (1000 * 60) * 15);