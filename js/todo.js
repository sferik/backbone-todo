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

});