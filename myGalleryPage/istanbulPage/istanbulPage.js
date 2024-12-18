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
