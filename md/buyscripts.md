# In-Depth JavaScript Documentation - Galleriet Website

## Overview of JavaScript Implementation

The Galleriet website uses JavaScript to enhance user experience through interactive elements and client-side data management. There are three primary JavaScript files:

1. `scripts.js` (for general site functionality)
2. `buypackage.js` (for package purchase functionality)
3. `tilbud.js` (for package redemption functionality)

This document provides a comprehensive analysis of these JavaScript files, explaining the implementation details, technical approaches, and coding patterns used.

## Common JavaScript Patterns Used

### 1. DOMContentLoaded Event Listener

All JavaScript files use the `DOMContentLoaded` event listener to ensure that scripts only execute after the HTML document has been fully loaded and parsed:

```javascript
document.addEventListener("DOMContentLoaded", function() {
    // Code that interacts with DOM elements
});
```

This is a best practice that prevents errors that could occur when trying to access DOM elements that haven't been loaded yet.

### 2. Event Delegation

The code uses event listeners assigned to parent elements or specific target elements to handle user interactions:

```javascript
// Example from buypackage.js
packs.forEach((pack) => {
    pack.addEventListener('click', function() {
        // Handler code
    });
});
```

### 3. Local Storage for State Management

The website uses the browser's `localStorage` API to maintain state between pages:

```javascript
// Storing data
localStorage.setItem('selectedPackage', JSON.stringify(packageInfo));

// Retrieving data
const selectedPackageJson = localStorage.getItem('selectedPackage');
```

## buypackage.js - Package Selection and Purchase

### File Purpose
This JavaScript file handles the user interactions on the experience packages page (oplevelser.html), allowing users to view package details and purchase them.

### Code Analysis

#### 1. Element Selection
The script begins by selecting necessary DOM elements:

```javascript
const packs = document.querySelectorAll(".pack");
const closeButtons = document.querySelectorAll(".close");
const buyButtons = document.querySelectorAll(".buy-button");
```

This selection uses the `querySelectorAll` method, which returns a NodeList of all elements matching the specified CSS selector.

#### 2. Package Modal Display

```javascript
packs.forEach((pack) => {
    pack.addEventListener('click', function() {
        const packId = this.id;
        const modal = document.getElementById('modal-pack-' + packId);

        if (modal) {
            modal.style.display = "block";
        }
    });
});
```

This section:
- Iterates through all elements with the class `.pack` using a forEach loop
- Adds a click event listener to each package element
- When clicked, it extracts the package ID from the element's ID attribute
- Constructs the corresponding modal ID using string concatenation
- Makes the modal visible by setting its display style to "block"

#### 3. Modal Close Functionality

```javascript
// Close button functionality
closeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const modal = this.closest('.modal1');
        if (modal) {
            modal.style.display = "none";
        }
    });
});

// Click outside modal to close
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal1')) {
        event.target.style.display = "none";
    }
});
```

This section implements two ways to close modals:
1. Clicking the close button (×) in the modal
   - Uses the `closest()` method to find the parent modal element
   - Sets its display to "none" to hide it
2. Clicking outside the modal content (on the overlay)
   - Checks if the clicked element has the class "modal1"
   - If so, hides that element

#### 4. Package Purchase Logic

```javascript
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
```

This section handles the purchase action:
1. When a buy button is clicked, it extracts package information from the modal:
   - Uses DOM traversal to find the modal content container
   - Extracts text content from specific elements (h2 for name, p elements for details and price)
2. Creates a JavaScript object with the package data
3. Adds a timestamp for the purchase date
4. Converts the object to a JSON string and stores it in localStorage
5. Allows the default link navigation behavior to redirect to the redemption page

### Key Technical Aspects
- **DOM Traversal**: Uses methods like `closest()` and `querySelector()` to navigate between related elements
- **Event Handling**: Implements event listeners for user interactions
- **Data Extraction**: Pulls information from DOM elements to create a data object
- **Data Persistence**: Uses localStorage to save data for use on another page

## tilbud.js - Package Redemption

### File Purpose
This JavaScript file manages the package redemption page (tilbud.html), checking for purchased packages in localStorage and displaying appropriate content.

### Code Analysis

#### 1. Initial Check for Purchased Packages

```javascript
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
        // Code to display package details
    } else {
        // Display the "no packages" message
        displayNoPackagesMessage(articleContent);
    }
});
```

This section:
1. Retrieves any package data from localStorage
2. Finds or creates an article element to hold the content
3. Checks if package data exists and branches logic accordingly

#### 2. Displaying Package Information

```javascript
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
```

This section:
1. Creates a new section element with appropriate class
2. Uses template literals to generate HTML content with dynamic data:
   - Constructs an image path based on the package name (with string manipulation)
   - Injects package data into the HTML structure
3. Inserts the newly created section into the DOM using `insertBefore()`

#### 3. Redemption and Cancellation Handlers

```javascript
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
```

This section:
1. Adds a click handler for the redemption button that:
   - Displays a success message via `alert()`
   - Removes the package data from localStorage
   - Removes the package section from the DOM
   - Calls a function to display the "no packages" message
2. Adds a click handler for the cancellation button that:
   - Shows a confirmation dialog using `confirm()`
   - If confirmed, follows the same cleanup process as redemption

#### 4. No Packages Message Function

```javascript
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
```

This function:
1. Checks if the message already exists to prevent duplication
2. Creates a new div element for the message
3. Programmatically constructs the content using DOM methods:
   - Creates elements (`createElement`)
   - Sets attributes and content (`src`, `alt`, `className`, `textContent`)
   - Builds the DOM structure (`appendChild`)
4. Appends the completed section to the provided container

### Key Technical Aspects
- **Dynamic DOM Manipulation**: Creating and inserting elements programmatically
- **Template Literals**: Using backtick syntax for HTML templates with embedded expressions
- **User Confirmation**: Using browser dialogs for feedback and confirmation
- **DOM Cleanup**: Removing elements from the page when no longer needed
- **State Management**: Removing data from localStorage when actions are completed
- **String Manipulation**: Transforming strings for creating image paths
- **Function Modularization**: Separating reusable logic into functions

## Data Flow Between JavaScript Files

### Package Purchase to Redemption Flow

1. **Data Creation (buypackage.js)**
   - User selects a package and clicks "Buy"
   - Package data is extracted from HTML elements
   - Data is structured as a JavaScript object
   - Object is converted to JSON and stored in localStorage

2. **Data Retrieval (tilbud.js)**
   - When redemption page loads, it checks localStorage
   - JSON data is retrieved and parsed back into a JavaScript object
   - Object properties are used to populate the UI

3. **Data Cleanup (tilbud.js)**
   - User redeems or cancels the package
   - Data is removed from localStorage
   - UI is updated to show "no packages" state

## Advanced JavaScript Concepts Used

### 1. DOM Manipulation Techniques
The code demonstrates several approaches to DOM manipulation:
- **Selection**: Using `querySelector`, `querySelectorAll`, and `getElementById`
- **Traversal**: Using `closest()` to find parent elements
- **Creation**: Using `createElement()` to create new elements
- **Insertion**: Using `insertBefore()`, `appendChild()` to add elements
- **Removal**: Using `remove()` to delete elements
- **Content Setting**: Using `innerHTML` for template-based content and `textContent` for text

### 2. Event Handling
The code implements different approaches to event handling:
- **Direct element binding**: Adding listeners to specific elements
- **Collection iteration**: Using `forEach` to add listeners to multiple elements
- **Event bubbling**: The window click handler for closing modals uses event bubbling

### 3. String Processing
Several string manipulation techniques are used:
- **Template literals**: For creating HTML templates with embedded expressions
- **String methods**: `toLowerCase()` and `replace()` with regex for image path construction
- **String concatenation**: For creating selector IDs

### 4. Conditionals and Error Prevention
The code includes several safety checks:
- Checking if elements exist before accessing them
- Using conditional statements to handle different states
- Preventing duplicate elements through existence checks

### 5. Browser API Integration
The code leverages several browser APIs:
- **localStorage**: For persisting data between page navigations
- **alert()** and **confirm()**: For user notifications and confirmations
- **DOM API**: For extensive document manipulation

## JavaScript Performance Considerations

### Efficient DOM Operations
- The code minimizes DOM operations by creating elements before inserting them
- Template literals are used for batch HTML creation instead of multiple DOM operations
- Event delegation is used where appropriate (window click handler)

### Memory Management
- Elements are properly removed from the DOM when no longer needed
- Event listeners are added only once during page load
- Data is cleaned up from localStorage when it's no longer needed

## Error Handling and Edge Cases

### Handled Edge Cases
1. **Missing Elements**: Checks if elements exist before manipulating them
2. **No Package Data**: Displays appropriate UI when no package is found
3. **Accidental Cancellation**: Confirms with user before cancelling a package

### Potential Improvements
1. **Input Validation**: Adding more validation for package data
2. **Error Logging**: Implementing proper error logging instead of silent fails
3. **Graceful Degradation**: Providing fallbacks for browsers without localStorage

## JavaScript and CSS Integration

The JavaScript code interacts with CSS in several ways:
1. **Class Manipulation**: Adding and removing classes for visual states
2. **Direct Style Changes**: Setting display properties for showing/hiding elements
3. **Dynamic Content**: Creating elements that inherit styles from the CSS files

## Conclusion

The JavaScript implementation in the Galleriet website demonstrates a practical application of foundational web development concepts:

1. **Separation of Concerns**: Different files handle distinct functionality
2. **Event-Driven Programming**: Code responds to user interactions
3. **Client-Side State Management**: Data persists between pages using localStorage
4. **DOM Manipulation**: Elements are created, modified, and removed dynamically
5. **User Feedback**: Alerts and confirmations provide interaction feedback

The code is well-structured and follows modern JavaScript practices while remaining straightforward and readable. It successfully implements the core functionality needed for the website's package purchase and redemption system without relying on external frameworks or libraries.
