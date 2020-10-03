$(function() {
    // click even to move a burger from the not-eaten list to the already eaten list
    $(".devour").on("click", function(event) {
      let id = $(this).data("id");
      let newlyEaten = $(this).data("newlyEaten");
  
      let newlyDevoured = {
        devoured: newlyEaten
      };
  
      // PUT request to update the burger's devoured status
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newlyDevoured
      }).then(
        function() {
          location.reload();
        }
      );
    });
  
    // click event to add a burger to the list
    $("#add-burger").on("click", function(event) {
      event.preventDefault();
      
      const newBurger = {
        name: $("#burger-name").val().trim(),
        devoured: 0
      };
      console.log(newBurger);
      
      // POST request to add a burger to the list of uneaten burgers (default devoured=false)
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          location.reload();
        }
      );
    });
  });
  