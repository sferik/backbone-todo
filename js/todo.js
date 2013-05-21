var Todos;

$(document).ready(function(){

  // model
  var Todo = Backbone.Model.extend({
    // attributes: title, createdAt, complete
    defaults: function() {
      return {
        title: "No title entered",
        createdAt: new Date(),
        complete: false
      };
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


  Todos = new TodoList();

  var TodoView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#list-item-template').html()),
    events: {
      // $('.checkbox').on(click, toggleView);
      "click .checkbox": function() {
        this.model.toggle();
      }
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  var AppView = Backbone.View.extend({
    el: $('#todoapp'),
    events: {
      "click #button": function() {
        // Todo.create({title => "foo"})
        Todos.create({title: this.input.val()});
        this.input.val('');
      }
    },
    initialize: function() {
      this.input = this.$('#new-todo');
      this.counter = this.$('#counter');
      this.listenTo(Todos, 'add', function(todo) {
        var view = new TodoView({model: todo});
        this.$('#todo-list').append(view.render().el);
      });
      this.listenTo(Todos, 'all', this.render);
      Todos.fetch();
    },
    counterTemplate: _.template($('#counter-template').html()),
    render: function() {
      var completed = Todos.completed().length;
      var incomplete = Todos.incomplete().length;
      this.counter.html(this.counterTemplate({
        completed: completed,
        incomplete: incomplete
      }));
    }
  });

  var App = new AppView();

});