document.addEventListener('DOMContentLoaded', function() {
    // --- User Authentication and Greeting ---
    const userData = JSON.parse(localStorage.getItem('userData'));
    const greetingElement = document.getElementById('greeting');
    const signOutButton = document.getElementById('sign-out-button');

    if (userData && userData.name) {
        greetingElement.textContent = `Hello, ${userData.name}!`;
    } else {
        // If no user data, redirect to login
        window.location.href = "../login-page/login.html";
    }

    // --- Sign Out Functionality ---
    const signOut = () => {
        localStorage.removeItem('userData');
        window.location.href = "../landing-page/landing.html";
    };

    if (signOutButton) {
        signOutButton.addEventListener('click', signOut);
    }

    // --- Product Search and Filter Logic ---
    const searchBar = document.getElementById('searchBar');
    const productContainer = document.querySelector('.pro-container');
    const products = productContainer ? Array.from(productContainer.getElementsByClassName('pro')) : [];
    const filterButtons = document.querySelectorAll('.filter-button');

    if (searchBar) {
        searchBar.addEventListener('input', (e) => {
            const searchString = e.target.value.toLowerCase();
            products.forEach(product => {
                const productName = product.querySelector('h5').textContent.toLowerCase();
                const productVisible = productName.includes(searchString);
                product.style.display = productVisible ? '' : 'none';
            });
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            filterProducts(filter);
        });
    });

    function filterProducts(filter) {
        products.forEach(product => {
            const category = product.querySelector('span').textContent.toLowerCase();
            const productVisible = (filter === 'all' || category.includes(filter));
            product.style.display = productVisible ? '' : 'none';
        });
    }
});