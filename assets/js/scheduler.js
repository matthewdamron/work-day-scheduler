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
            .addClass('col-9 text-dark description')
            .attr('id', 'description')
            .attr('hour', hour);
            
            currentHour(taskDescription, hour);

        var taskSaveIcon = $('<i>')
            .addClass('far fa-save');

        var taskSave = $('<button>')
            .addClass('col saveBtn')
            .append(taskSaveIcon);

        taskDiv
            .append(taskHourDiv)
            .append(taskDescription)
            .append(taskSave);
        
        $('.container')
            .append(taskDiv);
    };
};

setHoursOfDay();

setInterval(function () {
    $(".card .list-group-item").each(function(index, el) {
      auditTask(el);
    });
  }, (1000 * 60) * 15);