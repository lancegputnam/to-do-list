"use script";

// this defines the Backbone Model Constructor 
var Task = Backbone.Model.extend({ 
    idAttribute: '_id'
});

//This defines the backbone Collection server
var TaskCollection = Backbone.Collection.extend({
    model: Task,
    url: 'http://tiny-pizza-server.herokuapp.com/collections/todo-lance',
});
 
// this defines the Backbone View constructor
var TaskView = Backbone.View.extend({
 
    template: _.template($('.task-list-item').text()),
    editTemplate: _.template($('.task-list-edit-item').text()),
 
    events: {
        'click .complete-button'    : 'showEdit',
        'click .save-button'        : 'saveChanges',
        'keydown input'             : 'checkForChanges'
 
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
    
    // this is for the complete button, which destroys the item
    showEdit: function(){
       this.model.destroy();
       this.remove();
    },
    
    // this is for the save button, which should save item to console
    saveChanges: function(){
        var nameVal = this.$el.find('.taskName input').val();
        this.model.set('task', nameVal);
        this.model.save();
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
console.log(addTask)

// this fetches the addTask collection 
var cool = addTask.fetch().done(function() {
    // this for eaches over the model instnace arrays 
  addTask.each(function(task) {
    // this creates a new task view
    new TaskView({
      model: task
    });
  });
});

console.log(cool)

// this gives functionality to the add new task button 
$('.newTaskButton').click(function(){
    var inputVal = $('.newItem').val();
    // this adds the input value to the collection instance 
    var newUserInstance = addTask.add({name: inputVal})
    // this saves the input value to the server 
    newUserInstance.save();
    // this clears the value of the new item input 
    $('.newItem').val('');
    new TaskView({model: newUserInstance});
});
 
// this renders 
// var AppView = Backbone.View.extend({
 
//   initialize: function(){
//     this.listenTo(coolUsers, 'add', function(task){
//       new TaskView({model: task})
//     })
//   }
 
// });
 
// // create instances
 
// var coolUsers = new TaskCollection();
// // console.log(coolUsers)
 
// var app = new AppView();
 
// coolUsers.fetch();












