$(document).ready(function(){

  // model
  var Todo = Backbone.Model.extend({
    // attributes: title, createdAt, complete
    defaults: function() {
      return {
        title: "No title entered",
        createdAt: new Date,
        complete: false
      }
    },

    toggle: function() {
      this.save({complete: !this.get("complete")});
    }
  });

  // collection
  var TodoList = Backbone.Collection.extend({
    model: Todo,

    localStorage: new Backbone.LocalStorage('todos'),

    completed: function() {
      return this.filter(function(todo) {
        return todo.get('complete') === true;
      });
    },

    incomplete: function() {
      return this.filter(function(todo) {
        return !todo.get('complete');
      });
    }
  });

  var Todos = new TodoList;

});