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
