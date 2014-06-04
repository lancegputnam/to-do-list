'use strict';

// Backbone Model Constructor 
Task = Backbone.Model.extend({ 
    idAttribute: '_id'
});
 
TaskCollection = Backbone.Collection.extend({
    model: Task,
    url: 'http://tiny-pizza-server.herokuapp.com/collections/todo-lance',
});
 
 
TaskView = Backbone.View.extend({
 
    template: _.template($('.task-list-item').text()),
    editTemplate: _.template($('.task-list-edit-item').text()),
 
    events: {
        'click .edit-button'    : 'showEdit',
        'click .save-button'    : 'saveChanges',
        'click .delete-button'  : 'destroy',
        'keydown input'         : 'checkForChanges'
 
    },
 
    initialize: function(){
 
        this.listenTo(this.model, 'change', this.render);
        $('.toDoBox').prepend(this.el);
        this.render();
    },
 
    render: function(){
        var renderedTemplate = this.template(this.model.attributes);
        this.$el.html(renderedTemplate);
    },
 
    showEdit: function(){
        var renderedTemplate = this.editTemplate(this.model.attributes);
        this.$el.html(renderedTemplate);
    },
 
    saveChanges: function(){
        var nameVal = this.$el.find('.taskName input').val();
        this.model.set('task', nameVal);
        this.model.save();
    },
 
    destroy: function(){
        this.model.destroy();
        this.remove();
    },
 
    checkForChanges: function(){
        if (this.model.get('task') !== this.$el.find('.taskName input').val()){
            this.$el.find('.taskName input').addClass('changed');
        } else {
            this.$el.find('.taskName input').removeClass('changed');
        }
    }
});

//Create a new collection instance
var addTask = new TaskCollection();

//this function takes the arguments and posts it to the server/url below 
function updatedTaskList(taskList) {
    $.post('http://tiny-pizza-server.herokuapp.com/collections/todo-lance', taskList);
}

// //when the new task button is clicked, it creates an instance of the constructor
$('.newTaskButton').click(function () {
    //give the text in the todo-input field a name so it can be used in a chain
    var theTask = $('.newItem').val();
    //clears the input box
    $('.newItem').val('');
    //this will add  input value to the instance
    newTask = addTask.add({taskText: theTask});
    //the will save the input value to the server
    newTask.save();        
    //creates a new view instance with the above collection
    new TaskView({model: newTask});

    var outgoing = new Task();
    updateTaskList(outgoing);
});


// //when the new task button is clicked, it creates an instance of the constructor
// $('.newTaskButton').click(function() {

//     var task = $('.newItem').val();
//     $('.newItem').val('');

//     //this variable creates a new outgoing instance
//     var outgoing = new Task();

//     updateTaskList(outgoing);

// });

