
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


const darkModeBtn = document.getElementById("darkModeBtn");

if(localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add("dark-mode");
  darkModeBtn.textContent = "Light Mode";
} else {
  darkModeBtn.textContent = "Dark Mode";
}

darkModeBtn.addEventListener("click", () => {

  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    darkModeBtn.textContent = "Light Mode";
    localStorage.setItem('darkMode', 'enabled'); 
  } else {
    darkModeBtn.textContent = "Dark Mode";
    localStorage.setItem('darkMode', 'disabled'); 
  }
});
  