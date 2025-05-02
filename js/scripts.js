document.addEventListener("DOMContentLoaded", function () {
    // Modal functionality for shops
    const shops = document.querySelectorAll(".shop");
    const closeButtons = document.querySelectorAll(".close");

    shops.forEach((shop) => {
        shop.addEventListener('click', function () {
            const shopId = this.id;
            const modal = document.getElementById('modal-' + shopId);

            if (modal) {
                modal.style.display = "block";
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = "none";
            }
        });
    });

    window.addEventListener('click', function (event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = "none";
        }
    });

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Optional: Animate hamburger icon to X
        const spans = this.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });
    
    // Close menu when clicking a link 
    const navLinks = document.querySelectorAll('#nav-menu li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.querySelectorAll('span').forEach(span => span.classList.remove('active'));
        });
    });
    
    // Close menu when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.querySelectorAll('span').forEach(span => span.classList.remove('active'));
        }
    });
});