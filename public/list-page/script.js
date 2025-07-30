document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalAmountEl = document.getElementById('subtotal-amount');
    const totalAmountEl = document.getElementById('total-amount');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 20px;">Your cart is empty.</td></tr>';
        } else {
            cart.forEach((item, index) => {
                const itemSubtotal = item.price * item.quantity;
                subtotal += itemSubtotal;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><i class="fas fa-times-circle" data-index="${index}"></i></td>
                    <td><img src="${item.image}" alt="${item.name}"></td>
                    <td>${item.name}</td>
                    <td>Rp ${item.price.toLocaleString('id-ID')}</td>
                    <td><input type="number" value="${item.quantity}" min="1" data-index="${index}"></td>
                    <td>Rp ${itemSubtotal.toLocaleString('id-ID')}</td>
                `;
                cartItemsContainer.appendChild(row);
            });
        }

        subtotalAmountEl.textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
        totalAmountEl.innerHTML = `<strong>Rp ${subtotal.toLocaleString('id-ID')}</strong>`; // Assuming free shipping
    }

    function updateQuantity(index, newQuantity) {
        cart[index].quantity = parseInt(newQuantity);
        if (cart[index].quantity < 1) {
            cart[index].quantity = 1; // Prevent quantity from being less than 1
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    function removeItem(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    cartItemsContainer.addEventListener('change', (e) => {
        if (e.target.tagName === 'INPUT' && e.target.type === 'number') {
            const index = e.target.getAttribute('data-index');
            updateQuantity(index, e.target.value);
        }
    });

    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-times-circle')) {
            const index = e.target.getAttribute('data-index');
            removeItem(index);
        }
    });

    // Initial render
    renderCart();

    // Greeting and Sign Out
    const userData = JSON.parse(localStorage.getItem('userData'));
    const greetingElement = document.getElementById('greeting');
    const signOutButton = document.getElementById('sign-out-button');

    if (userData && userData.name) {
        if(greetingElement) greetingElement.textContent = `Hello, ${userData.name}!`;
    }
    if(signOutButton) {
        signOutButton.addEventListener('click', () => {
            localStorage.removeItem('userData');
            window.location.href = "../landing-page/landing.html";
        });
    }
});
