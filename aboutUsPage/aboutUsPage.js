
document.querySelectorAll(".toggleButton").forEach(function(button) {
    button.addEventListener("click", function() {
      
      var content = button.nextElementSibling;
      
      
      if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";  
      } else {
        content.style.display = "none";  
      }
    });
  });
  