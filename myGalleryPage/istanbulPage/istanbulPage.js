document.addEventListener("DOMContentLoaded", function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const modalToggle = document.getElementById('modalToggle2');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription2');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const imageSrc = thumbnail.src;
            const description = thumbnail.getAttribute('data-description');

            modalImage.src = imageSrc;
            modalDescription.textContent = description;

            modalToggle.checked = true;
        });
    });

    const closeModalBtn = document.querySelector('.close-btn2');
    closeModalBtn.addEventListener('click', function() {
        modalToggle.checked = false;
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
