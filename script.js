// Sample Book Data
let books = [
    {
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        price: "$14.99",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
        description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
        reviews: [
            { name: "Sarah M.", rating: 5, text: "A beautiful, thought-provoking read about choices and regret." },
            { name: "John D.", rating: 4, text: "Really enjoyed the concept. Made me think about my own life." }
        ]
    },
    {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        price: "$16.99",
        rating: 5,
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400",
        description: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. Learn how tiny changes can lead to remarkable results.",
        reviews: [
            { name: "Emily R.", rating: 5, text: "Life-changing! I've implemented so many of these strategies." }
        ]
    },
    {
        id: 3,
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        price: "$12.99",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
        description: "Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life.",
        reviews: [
            { name: "Lisa K.", rating: 5, text: "Couldn't put it down! Evelyn's story is captivating." },
            { name: "Mike T.", rating: 5, text: "One of the best books I've read this year." },
            { name: "Anna P.", rating: 4, text: "Great character development and plot twists." }
        ]
    },
    {
        id: 4,
        title: "Educated",
        author: "Tara Westover",
        price: "$13.99",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
        description: "Born to survivalists in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom. Her family was so isolated from mainstream society that there was no one to ensure the children received an education.",
        reviews: [
            { name: "David L.", rating: 5, text: "Incredible memoir. Her journey is inspiring." }
        ]
    },
    {
        id: 5,
        title: "Project Hail Mary",
        author: "Andy Weir",
        price: "$15.99",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1614544048536-0d28caf77f41?w=400",
        description: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn't know that.",
        reviews: [
            { name: "Chris B.", rating: 5, text: "Even better than The Martian! Rocky is the best character." },
            { name: "Rachel W.", rating: 5, text: "Science fiction at its finest. Loved every page." }
        ]
    },
    {
        id: 6,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        price: "$11.99",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400",
        description: "Alicia Berenson's life is seemingly perfect. Then one evening she shoots her husband five times in the face, and then never speaks another word.",
        reviews: [
            { name: "Tom H.", rating: 4, text: "Great thriller with an amazing twist!" }
        ]
    }
];

let currentBookId = null;
let currentRating = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderBooks(books);
    setupSearch();
});

// Render Books Grid
function renderBooks(booksToRender) {
    const grid = document.getElementById('booksGrid');
    grid.innerHTML = booksToRender.map(book => `
        <div class="book-card" onclick="openBookModal(${book.id})">
            <img src="${book.image}" alt="${book.title}">
            <div class="book-card-info">
                <h3 class="book-card-title">${book.title}</h3>
                <p class="book-card-author">${book.author}</p>
                <p class="book-card-price">${book.price}</p>
                <p class="book-card-rating">${'★'.repeat(Math.floor(book.rating))}${'☆'.repeat(5-Math.floor(book.rating))} ${book.rating}</p>
            </div>
        </div>
    `).join('');
}

// Search Functionality
function setupSearch() {
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(searchTerm) || 
            book.author.toLowerCase().includes(searchTerm)
        );
        renderBooks(filteredBooks);
    });
}

// Open Book Modal
function openBookModal(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    currentBookId = bookId;

    document.getElementById('modalBookImage').src = book.image;
    document.getElementById('modalBookTitle').textContent = book.title;
    document.getElementById('modalBookAuthor').textContent = book.author;
    document.getElementById('modalBookPrice').textContent = book.price;
    document.getElementById('modalBookRating').textContent = '★'.repeat(Math.floor(book.rating)) + ` ${book.rating}/5`;
    document.getElementById('modalBookDescription').textContent = book.description;

    renderReviews(book.reviews);

    document.getElementById('bookModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal() {
    document.getElementById('bookModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    currentBookId = null;
}

// Render Reviews
function renderReviews(reviews) {
    const reviewsList = document.getElementById('reviewsList');
    if (reviews.length === 0) {
        reviewsList.innerHTML = '<p style="color: #8B6F4E; font-style: italic;">No reviews yet. Be the first to review!</p>';
        return;
    }

    reviewsList.innerHTML = reviews.map((review, index) => `
        <div class="review-item">
            <div class="review-header">
                <span class="reviewer-name">${review.name}</span>
                <span class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</span>
            </div>
            <p class="review-text">${review.text}</p>
        </div>
    `).join('');
}

// Show Review Form
function showReviewForm() {
    document.getElementById('reviewForm').style.display = 'block';
}

// Set Rating
function setRating(rating) {
    currentRating = rating;
    const stars = document.querySelectorAll('.star-rating span');
    stars.forEach((star, index) => {
        star.style.color = index < rating ? '#FFB347' : '#D4A574';
    });
}

// Submit Review
function submitReview() {
    const name = document.getElementById('reviewerName').value.trim();
    const text = document.getElementById('reviewText').value.trim();

    if (!name || !text || currentRating === 0) {
        alert('Please fill in all fields and select a rating!');
        return;
    }

    const book = books.find(b => b.id === currentBookId);
    book.reviews.push({
        name: name,
        rating: currentRating,
        text: text
    });

    // Update book rating
    const totalRating = book.reviews.reduce((sum, r) => sum + r.rating, 0);
    book.rating = parseFloat((totalRating / book.reviews.length).toFixed(1));

    renderReviews(book.reviews);
    document.getElementById('modalBookRating').textContent = '★'.repeat(Math.floor(book.rating)) + ` ${book.rating}/5`;

    // Clear form
    document.getElementById('reviewerName').value = '';
    document.getElementById('reviewText').value = '';
    currentRating = 0;
    document.getElementById('reviewForm').style.display = 'none';

    // Re-render grid to show updated rating
    renderBooks(books);

    alert('Review submitted successfully!');
}

// Delete Book
function deleteBook() {
    if (confirm('Are you sure you want to delete this book?')) {
        books = books.filter(b => b.id !== currentBookId);
        renderBooks(books);
        closeModal();
        alert('Book deleted successfully!');
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('bookModal');
    if (event.target === modal) {
        closeModal();
    }
}
