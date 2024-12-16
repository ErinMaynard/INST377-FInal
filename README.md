INST 377 Group 4 Final Project

Project Name: Book Nook

Project Description:
The idea for our project is to create a resource for people who love reading, but are
having trouble finding new books or series to read. The goal is to make it simple and
easy to use so it is accessible to everyone who may need it. The user can input either
a genre, title, or author into the system and it will return a carousel of books that
match and/or are similar to what they put in. We are using two main resources, one that
is a collection of books with information about them, and another that has popularity
statistics on said books so we can provide users with the best rated material that matches
their input

Target Browsers:
Our main focus is on accessing it from a personal computer, but it will also be avaialable
to those on mobile devices such as IOS and Android.


Developer Manual:
# Developer Manual

This Developer Manual is designed to help future developers set up, run, and maintain the **Book Nook** application. It provides installation steps, instructions for running the application, testing information, API details, known issues, and a roadmap for future development.

---

## Table of Contents
1. [Installation](#installation)
2. [Running the Application](#running-the-application)
3. [Testing](#testing)
4. [API Documentation](#api-documentation)
   - [GET Endpoints](#get-endpoints)
   - [POST Endpoints](#post-endpoints)
5. [Known Bugs and Issues](#known-bugs-and-issues)
6. [Roadmap for Future Development](#roadmap-for-future-development)

---

## Installation

Follow these steps to set up the **Book Nook** application:

### Prerequisites
- Install [Node.js](https://nodejs.org) (v14 or higher) and [npm](https://www.npmjs.com/).
- Ensure you have a modern browser for testing (e.g., Chrome, Firefox).

### Steps
1. **Clone the Repository**
   ```bash
   git clone <https://github.com/ErinMaynard/INST377-FInal.git>
   cd <INST377-Final>

   Install Dependencies Run the following command to install project dependencies:

    npm install


    Set Up Environment Variables Create a .env file in the project root directory and add the following variables:


    SUPABASE_URL=<your-supabase-url>
    SUPABASE_KEY=<your-supabase-key>
    PORT=3000


    Set Up a Local Server Install a lightweight server such as http-server:

    npm install -g http-server


## Running the Application

    Running in VSCode
    Follow these steps to run the application in Visual Studio Code:

    Open the Project in VSCode

    Launch VSCode.
    Use File > Open Folder and navigate to the project directory.
    Install the Live Server Extension

    Open the Extensions view in VSCode (Ctrl+Shift+X or Cmd+Shift+X on macOS).
    Search for "Live Server" by Ritwick Dey and install it.
    Start the Application

    Right-click on home.html in the file explorer.
    Select "Open with Live Server".
    The application will open in your default browser at a URL similar to http://127.0.0.1:5500/home.html.
    Access Other Pages

    Use the navigation links in the app to explore About and Project Specific Functionality pages.



## Running Locally
    Start a local server:
    bash
    Copy code
    http-server . -p 3000
    Open your browser and visit:
    bash
    Copy code
    http://localhost:3000/home.html


## Deployment
    To deploy the application to production, use a hosting service like Netlify or Vercel. Ensure the .env file is correctly configured for the production environment.


## Testing
Currently, testing is manual. Follow these steps:

Open home.html in your browser via http://localhost:3000/home.html or Live Server.
Test the Start Search button for proper navigation to the Project Specific Functionality page.
Check book loading functionality by verifying API responses in the browser's developer tools.
Test the Add to Favorites feature by adding a book to the favorites list and confirming it displays correctly.


## Troubleshooting
Books Not Loading: Ensure API endpoints (http://gutendex.com and https://openlibrary.org) are reachable.
Favorites Not Saving: Verify the Supabase credentials in the .env file.

## API Documentation
The application integrates the following APIs:

## GET Endpoints
Gutendex API

URL: http://gutendex.com/books?languages=en
Purpose: Fetch a list of popular books in English.
Example Response:

{
  "results": [
    {
      "id": 1,
      "title": "Pride and Prejudice",
      "authors": [{"name": "Jane Austen"}],
      "download_count": 23456
    }
  ]
}


## Open Library API

URL: https://openlibrary.org/search.json?title=<book-title>&limit=1
Purpose: Fetch book cover details based on the title.
Example Response:

{
  "docs": [
    {
      "cover_i": 123456,
      "title": "Pride and Prejudice"
    }
  ]
}


## Supabase API (Favorites)

URL: <SUPABASE_URL>/favorites
Purpose: Manage the favorites table for user-added books.


## POST Endpoints
Add to Favorites
URL: <SUPABASE_URL>/favorites
Body:

{
  "book_title": "Pride and Prejudice",
  "book_author": "Jane Austen"
}
Response:

{
  "id": 1,
  "book_title": "Pride and Prejudice",
  "book_author": "Jane Austen",
  "created_at": "2024-01-01T00:00:00Z"
}


## Known Bugs and Issues
API Response Delays

Issue: Gutendex API responses may take a few seconds.
Workaround: The application includes a loading spinner.
Missing Book Covers

Issue: Some books lack covers in the Open Library API.
Workaround: Display "No cover available."
Supabase Rate Limiting

Issue: Supabase may reject rapid consecutive requests.
Workaround: Add retry logic or delays.


## Roadmap for Future Development


## Feature Enhancements

Add pagination to book lists.
Implement a search bar for more precise book queries.
Allow users to remove books from their favorites.
Performance Improvements

Implement caching for API responses.
Optimize carousel functionality for smoother transitions.
UI/UX Improvements

Add a dark mode feature.
Enhance mobile responsiveness.
Testing

Add automated tests using Jest or Cypress.

Documentation

Include a detailed sequence diagram for API interactions.
Provide step-by-step instructions for deploying on popular hosting platforms.

## Contributing
Contributions are welcome! Please fork this repository, create a new branch for your feature or fix, and submit a pull request.

## License
This project is licensed under the MIT License.



### Key Updates:
1. **Added VSCode Instructions**: Detailed steps on how to run the application using the Live Server extension in VSCode.
2. **Preserved Existing Running and Deployment Options**: The local server option and deployment instructions are still included.
3. **Improved Clarity**: Steps are broken down to make them easy to follow.
