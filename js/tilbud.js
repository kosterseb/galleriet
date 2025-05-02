document.addEventListener("DOMContentLoaded", function() {
    // Check if there's a selected package in local storage
    const selectedPackageJson = localStorage.getItem('selectedPackage');
    
    // Get or create the article element where content will be displayed
    let articleContent = document.querySelector('article');
    if (!articleContent) {
        articleContent = document.createElement('article');
        document.body.appendChild(articleContent);
    }
    
    if (selectedPackageJson) {
        const selectedPackage = JSON.parse(selectedPackageJson);
        
        // Create a section to display the selected package
        const packageSection = document.createElement('section');
        packageSection.className = 'selected-package';
        
        // Create content for the selected package
        packageSection.innerHTML = `
            <div class="package-redemption">
                <h2>Din valgte pakke:</h2>
                <div class="package-details">
                <img src="media/${selectedPackage.name.toLowerCase().replace(/\s+/g, '-')}.png" alt="${selectedPackage.name}">
                    <h3>${selectedPackage.name}</h3> <br>
                    <p>${selectedPackage.details}</p><br>
                    <p>${selectedPackage.price}</p><br>
                    <p>Købt den: ${selectedPackage.purchaseDate}</p>
                </div>
                <button id="redeem-package">Indløs pakke</button>
                <button id="clear-package">Annuller</button>
            </div>
        `;
        
        // Insert the package section at the beginning of the main content
        articleContent.insertBefore(packageSection, articleContent.firstChild);
        
        // Add event listeners for the buttons
        document.getElementById('redeem-package').addEventListener('click', function() {
            alert('Din pakke er nu indløst! God fornøjelse.');
            localStorage.removeItem('selectedPackage');
            packageSection.remove();
            
            // Show the "no packages" message after redemption
            displayNoPackagesMessage(articleContent);
        });
        
        document.getElementById('clear-package').addEventListener('click', function() {
            if (confirm('Er du sikker på, at du vil annullere denne pakke?')) {
                localStorage.removeItem('selectedPackage');
                packageSection.remove();
                
                // Show the "no packages" message after cancellation
                displayNoPackagesMessage(articleContent);
            }
        });
    } else {
        // Display the "no packages" message when there are no packages
        displayNoPackagesMessage(articleContent);
    }
});

// Function to display the "no packages" message
function displayNoPackagesMessage(container) {
    // Check if the no-packages section already exists
    if (!document.querySelector('.no-packages')) {
        const noPackagesSection = document.createElement('div');
        noPackagesSection.className = 'no-packages';
        
        // Create a placeholder image
        const placeholderImg = document.createElement('img');
        placeholderImg.src = 'media/updated.png'; 
        placeholderImg.alt = 'Placeholder';
        placeholderImg.className = 'package-placeholder';
        placeholderImg.style.width = '0px';
        
        // Create the h1 and h3 elements
        const heading = document.createElement('h1');
        heading.textContent = 'Pakker til indløsning:';
        
        const subheading = document.createElement('h3');
        subheading.textContent = 'Ingen pakker at indløse';
        
        // Add elements to the section
        noPackagesSection.appendChild(heading);
        noPackagesSection.appendChild(placeholderImg);
        noPackagesSection.appendChild(subheading);
        
        // Add the section to the container
        container.appendChild(noPackagesSection);
    }
}