# Codenames MG - Backend

This is the backend code for my Codenames project! It provides the necessary APIs and functionalities to support the gameplay and data management.

This projects utilizes the socket-io library to enable multiple users to play the same game. It was a really fun project and taught me a lot in regards to websockets!

In order to utilize this backend in game, please see my readme for my React/Typescript Frontend: https://github.com/mgregerson/codenames-react

## Installation

To install and run the project locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-directory>`
3. Install dependencies: `npm install`

## Usage

To use the application, follow these steps:

1. Start the backend server: `npm start`
2. The server will be running on `http://localhost:<port>`
3. The backend provides the following routes:
   - `GET /cards`: Retrieves the cards data.
   - `POST /cards/join`: Handles player joining the game.
   - `POST /cards/update`: Updates the cards data on the backend.
4. Use an API testing tool like Postman or curl to interact with the routes.

## Contributing

Contributions to this project are welcome. You can contribute by submitting bug reports, feature requests, or pull requests.
