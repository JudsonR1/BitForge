document.addEventListener('DOMContentLoaded', function() {
    // --- Image Gallery ---
    const mainImg = document.getElementById("MainImg");
    const smallImgs = document.getElementsByClassName("small-img");

    for (let i = 0; i < smallImgs.length; i++) {
        smallImgs[i].onclick = function() {
            mainImg.src = this.src;
        }
    }

    // --- User Authentication ---
    const userData = JSON.parse(localStorage.getItem('userData'));
    const greetingElement = document.getElementById('greeting');

    if (userData && userData.name) {
        if (greetingElement) {
            greetingElement.textContent = `Hello, ${userData.name}!`;
        }
    }
});

// --- Add to Cart Functionality ---
function addToCart() {
    const productName = document.getElementById('product-name').innerText;
    const priceString = document.querySelector('.single-product-details h2').innerText.replace('Rp ', '').replace(/\./g, '');
    const price = parseInt(priceString, 10);
    const quantity = parseInt(document.querySelector('.single-product-details input').value);
    const image = document.getElementById('MainImg').src;

    const product = {
        name: productName,
        price: price,
        quantity: quantity,
        image: image
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex > -1) {
        // Update quantity if product exists
        cart[existingProductIndex].quantity += quantity;
    } else {
        // Add new product to cart
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} has been added to your cart!`);
    window.location.href = '../list-page/list.html'; // Redirect to cart page
}
