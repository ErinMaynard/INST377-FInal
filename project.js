// Fetch books from Gutendex and display them in the carousel


(async () => {
    const apiUrl = 'http://gutendex.com/books?languages=en'; // Gutendex API URL

    try {
        // Fetch books from Gutendex
        const res = await fetch(apiUrl);
        const data = await res.json();
        const books = data.results; // Extract book data from the response

        const carousel = document.getElementById('book-carousel');
        carousel.innerHTML = ''; // Clear the loading text

        // Loop through the books and fetch their covers
        for (const book of books) {
            const coverImg = await getBookCover(book.title); // Fetch book cover from Open Library

            // Only add books with available covers
            if (coverImg) {
                const img = document.createElement('img');
                img.src = coverImg;
                img.alt = book.title || 'Book Cover';
                img.style.maxHeight = '200px';
                img.style.margin = '10px';
                img.style.borderRadius = '10px';
                img.style.border = '2px solid #5c4033';
                carousel.appendChild(img); // Add the image to the carousel
            }
        }

        // Initialize the carousel
        new SimpleSlider('.slider', {
            arrows: true,
            autoplay: true,
            interval: 3000, // 3 seconds per slide
        });
    } catch (error) {
        console.error('Error fetching books for carousel:', error);
        document.getElementById('book-carousel').innerHTML = '<p>Failed to load carousel. Please try refreshing the page.</p>';
    }
})();

// Function to fetch book covers from Open Library API
async function getBookCover(title) {
    try {
        // Prepare the book title for the Open Library API call
        const bookTitle = title.trim().replace(/ /g, '+');
        const res = await fetch(`https://openlibrary.org/search.json?title=${bookTitle}&limit=1`);
        const data = await res.json();

        // If data is found and there's a cover ID
        if (data.docs && data.docs.length > 0) {
            const coverId = data.docs[0].cover_i;
            if (coverId) {
                return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`; // Return the cover image URL
            }
        }
        return null; // No cover found
    } catch (error) {
        console.error('Failed to fetch cover from Open Library:', error);
        return null;
    }
}

// Fetch genres and dynamically create buttons
(async () => {
    const genres = ['Fantasy', 'Science Fiction', 'Mystery', 'Romance', 'Horror', 'History']; // List of genres
    const genreContainer = document.getElementById('book-genres');

    genres.forEach((genre) => {
        const button = document.createElement('button');
        button.textContent = genre;
        button.setAttribute('class', 'genre-button');

        button.addEventListener('click', () => fetchGenreDetails(genre)); // Add click event to fetch books for the genre

        genreContainer.appendChild(button);
    });
})();

// Fetch books by genre and display detailed information
async function fetchGenreDetails(genre) {
    const apiUrl = `http://gutendex.com/books?languages=en&topic=${genre.toLowerCase()}`; // Filter books by genre

    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        const book = data.results[0]; // Get the first book in the genre

        if (book) {
            const bookTitle = document.getElementById('book-title');
            const bookAuthor = document.getElementById('book-author');
            const bookDescription = document.getElementById('book-description');
            const bookYear = document.getElementById('book-year');

            bookTitle.textContent = book.title || 'N/A';
            bookAuthor.textContent = book.authors?.map(author => author.name).join(', ') || 'Unknown';
            bookDescription.textContent = book.subjects?.join(', ') || 'No description available.';
            bookYear.textContent = book.download_count || 'N/A';

            document.getElementById('book-info').style.display = 'block'; // Show the book info section
        }
    } catch (error) {
        console.error('Error fetching books by genre:', error);
    }
}

// Audio control using Annyang.js for navigation and interaction
if (annyang) {
    const commands = {
        'load genre *genre': fetchGenreDetails, // Command to fetch books by genre
        'go to *page': (page) => {
            const formattedPage = page.toLowerCase().replace(/\s+/g, '');
            window.location.href = `${formattedPage}.html`; // Navigate to the specified page
        },
    };

    annyang.addCommands(commands);

    // Enable audio commands
    document.getElementById('audio-on').addEventListener('click', () => {
        annyang.start();
        alert('Audio commands enabled. Say, "Load genre [genre name]" or "Go to [page name]".');
    });

    // Disable audio commands
    document.getElementById('audio-off').addEventListener('click', () => {
        annyang.abort();
        alert('Audio commands disabled.');
    });
}
