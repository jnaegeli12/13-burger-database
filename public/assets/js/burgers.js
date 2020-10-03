$(function() {
    $(".devour").on("click", function(event) {
      let id = $(this).data("id");
      let newlyEaten = $(this).data("newlyEaten");
  
      let newlyDevoured = {
        devoured: newlyEaten
      };
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newlyDevoured
      }).then(
        function() {
          location.reload();
        }
      );
    });
  
    $("#add-burger").on("click", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      const newBurger = {
        name: $("#burger-name").val().trim(),
        devoured: 0
      };
      console.log(newBurger);
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });
  