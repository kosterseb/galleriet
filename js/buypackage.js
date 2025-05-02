document.addEventListener("DOMContentLoaded", function () {
    // Package modal display functionality
    const packs = document.querySelectorAll(".pack");

    packs.forEach((pack) => {
        pack.addEventListener('click', function () {
            const packId = this.id;
            const modal = document.getElementById('modal-pack-' + packId);

            if (modal) {
                modal.style.display = "block";
            }
        });
    });

    // Modal close functionality
    const closeButtons = document.querySelectorAll(".close");
    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modal = this.closest('.modal1');
            if (modal) {
                modal.style.display = "none";
            }
        });
    });

    window.addEventListener('click', function (event) {
        if (event.target.classList.contains('modal1')) {
            event.target.style.display = "none";
        }
    });

    // Handle buy button clicks and save package info to local storage
    const buyButtons = document.querySelectorAll(".buy-button");
    buyButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            // Get package details from the modal content
            const modalContent = this.closest('.modal-content-packages');
            const packageName = modalContent.querySelector('h2').textContent;
            const packageDetails = modalContent.querySelector('p').textContent;
            const packagePrice = modalContent.querySelectorAll('p')[1].textContent;
            
            // Create a package object
            const packageInfo = {
                name: packageName,
                details: packageDetails,
                price: packagePrice,
                purchaseDate: new Date().toLocaleString()
            };
            
            // Save to local storage
            localStorage.setItem('selectedPackage', JSON.stringify(packageInfo));
            
            // The link will navigate to tilbud.html
            // We don't need to prevent default as we want the navigation to happen
        });
    });
});