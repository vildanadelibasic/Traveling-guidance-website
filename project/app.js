document.addEventListener('DOMContentLoaded', function () {
    
   
    function loadPage(page) {
        const mainContent = document.getElementById('main-content');

        let isLoggedIn = localStorage.getItem('isLoggedIn');
        if (page !== 'loginPage' && isLoggedIn !== 'true') {
            page = 'loginPage';
        }
        
      
        fetch(`pages/${page}.html`)
            .then(response => response.text())
            .then(html => {
                mainContent.innerHTML = html; 
               
                loadCSS(page);
           
                if (page === 'istanbulPage') {
                    initImageModal(); 
                }
                if (page === 'questionPage') {
                    initializeQuestionPageFunctions(); 
                }
                if (page === 'loginPage') {
                    document.getElementById('loginForm').addEventListener('submit', login);
                }
                if (page === 'landingPage') {
                    document.getElementById('welcomeMessage').textContent = "WELCOME " + localStorage.getItem('name') + "!";
                }

                setActiveLink(page);
            })
            .catch(error => console.error("Greška prilikom učitavanja stranice:", error));
    }

    
    function loadCSS(page) {
        let existingLink = document.querySelector(`link[rel="stylesheet"][data-page]`);
        if (existingLink) {
            existingLink.href = `css/${page}.css`;
        } else {
            let link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `css/${page}.css`;
            link.type = 'text/css';
            link.setAttribute('data-page', page); 
            document.head.appendChild(link);
        }
    }

   
    function initImageModal() {
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
    }

   
    function initializeQuestionPageFunctions() {
       
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

  
        document.getElementById('viewMoreBtn').addEventListener('click', function() {
            const extraReviews = document.getElementById('extra-reviews');
            extraReviews.style.display = 'block';
            this.style.display = 'none';
        });

     
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

        reviewForm.addEventListener('submit', function(event) {
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
    }


  
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


    function setActiveLink(page) {
      
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.style.fontWeight = 'normal');

       
        if (page === 'planningPage') {
            document.getElementById('planningLink').style.fontWeight = 'bold';
        } else if (page === 'destinationPage') {
            document.getElementById('destinationLink').style.fontWeight = 'bold';;
        } else if (page === 'aboutUsPage') {
            document.getElementById('aboutUsLink').style.fontWeight = 'bold';
        } else if (page === 'istanbulPage') {
            document.getElementById('istanbulLink').style.fontWeight = 'bold';
        } else if (page === 'hercegNoviPage') {
            document.getElementById('hercegNoviLink').style.fontWeight = 'bold';
        } else if (page === 'parisPage') {
            document.getElementById('parisLink').style.fontWeight = 'bold';
        } else if (page === 'questionPage') {
            document.getElementById('questionsLink').style.fontWeight = 'bold';
        } else if (page === 'landingPage') {
            document.getElementById('landingLink').style.fontWeight = 'bold';
        }
    }

    function login(e) {
        e.preventDefault();
    
        let username = loginForm.querySelector('#username').value;
        let password = loginForm.querySelector('#password').value;
    
        fetch('js/users.json')
            .then(response => response.json())
            .then(users => {
                const user = users.find(u => u.username === username && u.password === password);
    
                if (user) {
              
                    localStorage.setItem('name', username);
                    localStorage.setItem('isLoggedIn', 'true');
                    loadPage('landingPage');
                } else {
                   
                    loginForm.querySelector('#errorMessage').textContent = 'Pogrešno korisničko ime ili lozinka';
                }
            })
            .catch(error => {
                console.error("Greška pri učitavanju podataka korisnika:", error);
                document.getElementById('errorMessage').textContent = 'Greška pri povezivanju sa serverom';
            });
    }
    

   
    loadPage('loginPage');

   
    document.getElementById('planningLink').addEventListener('click', () => loadPage('planningPage'));
    document.getElementById('destinationLink').addEventListener('click', () => loadPage('destinationPage'));
    document.getElementById('aboutUsLink').addEventListener('click', () => loadPage('aboutUsPage'));
    document.getElementById('hercegNoviLink').addEventListener('click', () => loadPage('hercegNoviPage'));
    document.getElementById('parisLink').addEventListener('click', () => loadPage('parisPage'));
    document.getElementById('istanbulLink').addEventListener('click', () => loadPage('istanbulPage'));
    document.getElementById('questionsLink').addEventListener('click', () => loadPage('questionPage'));
    document.getElementById('landingLink').addEventListener('click', () => loadPage('landingPage'));
});
