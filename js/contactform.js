document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formStatus = document.getElementById('form-status');
    
    // Error message elements
    const nameError = document.getElementById('name-error');
    const phoneError = document.getElementById('phone-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    
    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^(\+\d{1,3}[-\s]?)?\d{8,}$/;  // Simple phone pattern
    
    // Input validation functions
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameInput.classList.add('invalid');
            nameError.textContent = 'Venligst indtast dit navn';
            return false;
        } else {
            nameInput.classList.remove('invalid');
            nameInput.classList.add('valid');
            nameError.textContent = '';
            return true;
        }
    }
    
    function validatePhone() {
        const phoneValue = phoneInput.value.trim();
        if (phoneValue === '') {
            phoneInput.classList.add('invalid');
            phoneError.textContent = 'Venligst indtast dit telefonnummer';
            return false;
        } else if (!phonePattern.test(phoneValue)) {
            phoneInput.classList.add('invalid');
            phoneError.textContent = 'Venligst indtast et gyldigt telefonnummer';
            return false;
        } else {
            phoneInput.classList.remove('invalid');
            phoneInput.classList.add('valid');
            phoneError.textContent = '';
            return true;
        }
    }
    
    function validateEmail() {
        const emailValue = emailInput.value.trim();
        if (emailValue === '') {
            emailInput.classList.add('invalid');
            emailError.textContent = 'Venligst indtast din email';
            return false;
        } else if (!emailPattern.test(emailValue)) {
            emailInput.classList.add('invalid');
            emailError.textContent = 'Venligst indtast en gyldig email';
            return false;
        } else {
            emailInput.classList.remove('invalid');
            emailInput.classList.add('valid');
            emailError.textContent = '';
            return true;
        }
    }
    
    function validateMessage() {
        if (messageInput.value.trim() === '') {
            messageInput.classList.add('invalid');
            messageError.textContent = 'Venligst indtast din besked';
            return false;
        } else {
            messageInput.classList.remove('invalid');
            messageInput.classList.add('valid');
            messageError.textContent = '';
            return true;
        }
    }
    
    // Add event listeners for real-time validation
    nameInput.addEventListener('blur', validateName);
    phoneInput.addEventListener('blur', validatePhone);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);
    
    // Remove validation styling on focus
    const inputs = [nameInput, phoneInput, emailInput, messageInput];
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.classList.remove('invalid');
            this.classList.remove('valid');
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        // Proceed only if all validations pass
        if (isNameValid && isPhoneValid && isEmailValid && isMessageValid) {
            // In a real application, you would send the form data to a server here
            // For this example, we'll just simulate a successful submission
            
            // Display success message
            formStatus.textContent = 'Tak for din besked! Vi vender tilbage hurtigst muligt.';
            formStatus.className = 'form-status success';
            
            // Reset form after successful submission
            setTimeout(() => {
                contactForm.reset();
                formStatus.style.display = 'none';
                inputs.forEach(input => {
                    input.classList.remove('valid');
                });
            }, 3000);
        } else {
            // Display error message
            formStatus.textContent = 'Venligst udfyld alle felter korrekt.';
            formStatus.className = 'form-status error';
        }
    });
    
    // Also add functionality for the hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
});

// Modal functionality for shops
document.addEventListener('DOMContentLoaded', function() {
    // Get all shop elements
    const shops = document.querySelectorAll('.shop');
    
    // Add click event listener to each shop
    shops.forEach(shop => {
        shop.addEventListener('click', function() {
            // Get shop ID
            const shopId = this.id;
            
            // Open corresponding modal
            const modal = document.getElementById(`modal-${shopId}`);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });
    
    // Close modal when clicking on close button
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
});