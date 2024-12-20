// Accordion toggle functionality
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        header.classList.toggle('active');

        const content = header.nextElementSibling;

        if (header.classList.contains('active')) {
            content.style.display = 'block';
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            content.style.maxHeight = null;
            setTimeout(() => (content.style.display = 'none'), 300);
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


document.getElementById('viewMoreBtn').addEventListener('click', function() {
  const extraReviews = document.getElementById('extra-reviews');
  extraReviews.style.display = 'block'; 
  this.style.display = 'none'; 
});

document.addEventListener('DOMContentLoaded', function () {
  const reviewsContainer = document.getElementById('reviewsContainer');
  const reviewForm = document.getElementById('reviewForm');
  const reviewText = document.getElementById('reviewText');

  let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

  function displayReviews() {
    reviewsContainer.innerHTML = '';
    reviews.forEach((review, index) => {
      const reviewElement = document.createElement('div');
      reviewElement.classList.add('review');
      reviewElement.innerHTML = `
        <p><strong>Review:</strong> ${review.text}</p>
        <button class="btn btn-danger" onclick="deleteReview(${index})">Delete</button>
      `;
      reviewsContainer.appendChild(reviewElement);
    });
  }

  
  reviewForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (reviewText.value.trim() !== '') {
      reviews.push({ text: reviewText.value });
      localStorage.setItem('reviews', JSON.stringify(reviews));
      reviewText.value = ''; 
      displayReviews(); 
    }
  });

 
  window.deleteReview = function (index) {
    reviews.splice(index, 1); 
    localStorage.setItem('reviews', JSON.stringify(reviews));
    displayReviews(); 
  };
  displayReviews();
});
