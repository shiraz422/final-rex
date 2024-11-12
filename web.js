const questions = document.querySelectorAll('.faq-question');

questions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const arrow = question.querySelector('.arrow');

        // Toggle visibility
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';

        // Rotate arrow
        if (answer.style.display === 'block') {
            arrow.style.transform = 'rotate(90deg)'; // Arrow points down
        } else {
            arrow.style.transform = 'rotate(0deg)'; // Arrow points right
        }
    });
});
// Select elements
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartIcon = document.getElementById('cart-icon');
const cartDiv = document.querySelector('.cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const totalPriceElement = document.getElementById('total-price');

// Store cart data
let cart = [];

// Update cart UI
function updateCart() {
    // Clear the cart items container
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    // Display cart items
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <span>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</span>
            <button class="remove-item" data-id="${item.id}">&times;</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
        totalPrice += item.price * item.quantity;
    });

    // Update total price and item count
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Add item to cart
function addToCart(productId, productName, productPrice, productImage) {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        // If item already in cart, increase quantity
        existingItem.quantity++;
    } else {
        // If item not in cart, add it
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }

    // Update the cart
    updateCart();
    cartDiv.style.display = 'block'; // Show cart when an item is added
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();

    // If no items in cart, hide cart
    if (cart.length === 0) {
        cartDiv.style.display = 'none';
    }
}

// Handle Add to Cart button click
addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const productElement = event.target.closest('.product');
        const productId = parseInt(productElement.getAttribute('data-id'));
        const productName = productElement.querySelector('h3').textContent;
        const productPrice = parseFloat(productElement.querySelector('p').textContent.replace('$', ''));
        const productImage = productElement.querySelector('img').src;

        addToCart(productId, productName, productPrice, productImage);
    });
});

// Handle Remove button click in cart
cartItemsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-item')) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        removeFromCart(productId);
    }
});

// Toggle cart display when cart icon is clicked
cartIcon.addEventListener('click', () => {
    cartDiv.style.display = (cartDiv.style.display === 'block') ? 'none' : 'block';
});





