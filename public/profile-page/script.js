document.addEventListener('DOMContentLoaded', function() {
    // --- User Authentication and Greeting ---
    const userData = JSON.parse(localStorage.getItem('userData'));
    const greetingElement = document.getElementById('greeting');
    const profileNameElement = document.getElementById('profileName');

    if (userData && userData.name) {
        if (greetingElement) greetingElement.textContent = `Hello, ${userData.name}!`;
        if (profileNameElement) profileNameElement.textContent = userData.name;
    } else {
        window.location.href = "../login-page/login.html";
    }

    // --- Sign Out Button ---
    const signOutButton = document.getElementById('sign-out-button');
    if(signOutButton) {
        signOutButton.addEventListener('click', () => {
            localStorage.removeItem('userData');
            localStorage.removeItem('cart'); // Also clear cart on sign out
            localStorage.removeItem('profilePic');
            window.location.href = "../landing-page/landing.html";
        });
    }

    // --- Profile Picture Management ---
    const profilePreview = document.getElementById('profilePreview');
    const changePictureLink = document.getElementById('changePictureLink');
    const profilePicInput = document.getElementById('profilePicInput');

    const savedProfilePic = localStorage.getItem('profilePic');
    if (savedProfilePic) {
        profilePreview.src = savedProfilePic;
    }

    if (changePictureLink) {
        changePictureLink.addEventListener('click', (e) => {
            e.preventDefault();
            profilePicInput.click();
        });
    }

    if (profilePicInput) {
        profilePicInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const imageUrl = event.target.result;
                    profilePreview.src = imageUrl;
                    localStorage.setItem('profilePic', imageUrl);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // --- Order History Display ---
    const orderContainer = document.getElementById('orderContainer');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (orderContainer) {
        if (cart.length > 0) {
            cart.forEach(item => {
                const orderItem = document.createElement('div');
                orderItem.classList.add('order-item');

                orderItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="order-product-image">
                    <div class="order-details">
                        <h5>${item.name}</h5>
                        <p>Quantity: ${item.quantity}</p>
                        <p>Price: Rp ${item.price.toLocaleString('id-ID')}</p>
                    </div>
                `;
                orderContainer.appendChild(orderItem);
            });
        } else {
            orderContainer.innerHTML = '<p>You have no recent orders.</p>';
        }
    }
});
