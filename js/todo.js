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

  var TodoView = Backbone.View.extend({
    tagName: 'li',
    template: _.template('<span>' +
      '<input type="checkbox" class="checkbox"' +
      '<%= complete ? \' checked="checked"\' : "" %>>' +
      '<%= title %></span>'),
    events: {
      // $('.checkbox').on(click, toggleView);
      "click .checkbox": "toggleView"
    },
    toggleView: function() {
      this.model.toggle();
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

var AppView = Backbone.View.extend({
  el: $('#todoapp'),
  events: {
    "click #button": "addTodo"
  },
  initialize: function() {
    this.input = this.$('#new-todo');
    this.listenTo(Todos, 'add', this.appendTodo);
    Todos.fetch();
  },
  appendTodo: function(todo) {
    var view = new TodoView({model: todo});
    this.$('#todo-list').append(view.render().el);
  },
  addTodo: function() {
    // Todo.create({title => "foo"})
    Todos.create({title: this.input.val()});
    this.input.val('');
  }
});

var App = new AppView;

});