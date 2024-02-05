# DaldartAssignment

# Firebase_Integration

1- Firebase is integrated into the application to handle data storage. The Firestore database is utilized to store information about subreddit posts.
Firebase configuration is set up at the beginning of the script using the firebase package, and Firestore functionalities are imported from 'firebase/firestore'.
Firestore Operations:

2-  When the server receives a request to fetch and store data, it checks if the data for the specified subreddit and pagination key already exists in Firestore.
- If the data is not present, it adds a new document to the Firestore collection, storing information such as children (subreddit posts) and the pagination key (after).
- If the data already exists, the server retrieves and returns the stored data from Firestore.
Error Handling:

3- The code includes error handling to manage situations where there might be issues with the Reddit API request, Firebase operations, or other potential errors. It sends appropriate responses with error details in case of failures.