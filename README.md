# DaldartAssignment

# Fetching API

Creating a backend application using Node.js and the Express framework to build an API for fetching data from the Reddit API about the subreddit "wwe"

Setting Up the Project: Initialize a New Node.js Project:

1- Create a new directory for your project. Run npm init to initialize a new Node.js project, and follow the prompts to set up the project details.

2- Install necessary dependencies, including express for building the web server and axios for making HTTP requests.

3- Set up the main server file (e.g., app.js or server.js). Require express and create an instance of the application.

4- Configure middleware for handling JSON requests and handling CORS.

5- Use the axios library to make requests to the Reddit API.

6- Enable Cross-Origin Resource Sharing (CORS) to allow requests from your frontend application.

7- Set up Firebase to store and retrieve data from the Reddit API. Install the Firebase SDK and configure it.

# Firebase_Integration
1- Firebase is integrated into the application to handle data storage. The Firestore database is utilized to store information about subreddit posts. Firebase configuration is set up at the beginning of the script using the firebase package, and Firestore functionalities are imported from 'firebase/firestore'. Firestore Operations:

2- When the server receives a request to fetch and store data, it checks if the data for the specified subreddit and pagination key already exists in Firestore.

If the data is not present, it adds a new document to the Firestore collection, storing information such as children (subreddit posts) and the pagination key (after).
If the data already exists, the server retrieves and returns the stored data from Firestore. Error Handling:
3- The code includes error handling to manage situations where there might be issues with the Reddit API request, Firebase operations, or other potential errors. It sends appropriate responses with error details in case of failures.


# Project Overview:
This React project is designed to interact with the Reddit API and display a list of posts from a specified subreddit. The key feature of the application is the implementation of an infinite loading list, providing a smooth and dynamic user experience as the user scrolls through the content.

# Technologies Used:
React: The project is built using the React library, providing a component-based structure for efficient development and rendering.
Axios: Axios is utilized for making HTTP requests to the Reddit API, allowing seamless data retrieval.
Infinite Loading: The application employs an infinite loading technique to dynamically fetch and display additional posts as the user scrolls down the list.
Tailwind: Styled Components are used for styling, providing a modular and maintainable approach to styling React components.
