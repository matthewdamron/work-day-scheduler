// pull and set current date form moment
$('#currentDay').text(moment().format('MMMM Do YYYY'));

// generating textareas for scheduling
for (var hour = 9; hour < 18; hour++) {
    // scheduledHours.push(moment({hour}).format('h  a'));
    var taskDiv = $('<div>')
        .addClass('row');
    
    var taskHour = $('<div>')
        .addClass('col time-block')
        .text(moment({hour}).format('hA'));
    
    var taskDescription = $('<textarea>')
        .addClass('col-10 description past')
        .attr('id', 'description');

    var taskSaveIcon = $('<i>')
        .addClass('far fa-save');

    var taskSave = $('<button>')
        .addClass('col saveBtn')
        .append(taskSaveIcon);

    taskDiv
        .append(taskHour)
        .append(taskDescription)
        .append(taskSave);
    
    $('.container')
        .append(taskDiv);
}