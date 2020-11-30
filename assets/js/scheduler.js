// set array for hourly tasks
var hourlyTasks = [];

// pull and display current date from moment
$('#currentDay').text(moment().format('MMMM Do YYYY'));

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
    for (var hour = 9; hour < 18; hour++) {
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

// set time interval to reload the page every 15 min
setInterval(function () {
    location.reload();
}, (1000 * 60) * 15);