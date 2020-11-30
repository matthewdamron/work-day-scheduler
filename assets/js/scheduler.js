var dayTasks = [];

// pull and set current date form moment
$('#currentDay').text(moment().format('MMMM Do YYYY'));

var currentHour = function (taskDescription, hour) {
    // var taskDescription = $('<textarea>');

    if (moment().hour() > hour) {
        taskDescription
            .addClass('past')
            .removeClass('present')
            .removeClass('future');
    }
    else if (moment().hour() === hour) {
        taskDescription
            .removeClass('past')
            .addClass('present')
            .removeClass('future');
    }
    else {
        taskDescription
            .removeClass('past')
            .removeClass('present')
            .addClass('future');
    }

    return taskDescription;
}

var setHoursOfDay = function() {
// generating textareas for scheduling
    for (var hour = 9; hour < 18; hour++) {
        // scheduledHours.push(moment({hour}).format('h  a'));
        var taskDiv = $('<div>')
            .addClass('row');
        
        var taskHourSpan = $('<span>')
            // .addClass('mx-auto')
            .text(moment({hour}).format('hA'));
        
        var taskHourDiv = $('<div>')
            .addClass('col text-dark time-block')
            // .attr('hour', hour)
            // .append(taskHourSpan);
            .text(moment({hour}).format('hA'));
        
        var taskDescription = $('<textarea>')
            .addClass('col-9 text-dark description ' + hour)
            // .addClass()
            .attr('id', 'description');
            // .attr('id', hour)
            // .attr('hour', hour);
            
            currentHour(taskDescription, hour);

        var taskSaveIcon = $('<i>')
            .addClass('far fa-save');

        var taskSave = $('<button>')
            .addClass('col saveBtn')
            .attr('hour', hour)
            .append(taskSaveIcon);

        taskDiv
            .append(taskHourDiv)
            .append(taskDescription)
            .append(taskSave);
        
        $('.container')
            .append(taskDiv);
    };
    loadTasks();
};

var saveTasks = function() {
    localStorage.setItem("dayTasks", JSON.stringify(dayTasks));
};

var loadTasks = function() {
    dayTasks = JSON.parse(localStorage.getItem("dayTasks"));
  
    // if nothing in localStorage, create a new object to track all task status arrays
    if (!dayTasks) {
        dayTasks = [];
    }
  
    // console.log(dayTasks);
    // $('.' + dayTasks[0].hour)
    //     .text(dayTasks[0].task);
    // loop over object properties
    // $.each(dayTasks, function(index) {
    //   // then loop over sub-array
    //     console.log(dayTasks[index].tasks);
    //     console.log(dayTasks.tasks);
    for (i = 0; i < dayTasks.length; i++) {
        // console.log(dayTasks[i].task);
        $('.' + dayTasks[i].hour)
            .text(dayTasks[i].task);
    }
    //   $('{dayTask}'.hour).text(dayTasks.task);
    //   arr.forEach(function(dayTasks) {
    //       $('{dayTask.hour}').text(task);
    //     // createTask(dayTasks.task, dayTasks.hour, list);
    //   });
    // });
};

setHoursOfDay();

$('.saveBtn').on('click', function() {
    var taskHourDescription = $(this).siblings('#description').val();
    var taskHourBlock = $(this).attr('hour');
    console.log(taskHourDescription, taskHourBlock);
    // debugger;
    if (!dayTasks.length) {
        dayTasks.push({
            hour: taskHourBlock,
            task: taskHourDescription
        });
        saveTasks();
    }
    else {
        for (i = 0; i < dayTasks.length; i++) {
            if (dayTasks[i].hour === taskHourBlock) {
                dayTasks[i].task = taskHourDescription;
                break;
                console.log(dayTasks);
                // saveTasks();
            }
            // else {
            //     dayTasks.push({
            //         hour: taskHourBlock,
            //         task: taskHourDescription
            //     });
            //     saveTasks();
            // };
        };
        dayTasks.push({
            hour: taskHourBlock,
            task: taskHourDescription
        });
    }
    
    // dayTasks.push({
    //     hour: taskHourBlock,
    //     task: taskHourDescription
    // });
    
    
    console.log(dayTasks);
    saveTasks();
});

setInterval(function () {
    location.reload();
}, (1000 * 60) * 15);