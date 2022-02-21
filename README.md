# Habit tracker

---

<!-- badges -->
[![MIT license](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/mit-license.php)
[![GitHub latest commit](https://img.shields.io/github/last-commit/Dafe-akaka/habit-tracker-client.svg)](https://GitHub.com/Dafe-akaka/habit-tracker-client/commit/)
[![GitHub forks](https://img.shields.io/github/forks/Dafe-akaka/habit-tracker-client.svg)](https://GitHub.com/Dafe-akaka/habit-tracker-client)

An app built to help users track their habits.

This is the client side of a group project working on a habit tracker app.
The server side is stored in [this repo](https://github.com/Dafe-akaka/habit-tracker-server).

## Installation & Usage
---

### Installation

1. Clone this repo using `git clone`
2. Enter the directory `cd habit-tracker-server`
3. Install dependencies `npm install`
   
### Usage

* `npm start` to run the server.
* `npm test` to run tests contained in `test/` directory
* `npm run coverage` to check test coverage
* `npm run dev` to run the server with `nodemon`

### Technologies

* [node.js 🔗](https://nodejs.org/) 
* [express 🔗](https://expressjs.com/)
* [DB??🔗]( )
* [docker 🔗](https://docker.com/)
* [Jest 🔗](https://jestjs.io/)

### Deployment

This client is currently deployed at .....netlify.....

The server is currently deployed at ...heroku.....


## Design & Implementation

To create this 

### Routes


| **URL** | **HTTP Verb** |  **Action**| **Result (to edit)** 
|------------|-------------|------------|-------------|
| /habits/         | GET       | index  | Return all data |
| /habits/new      | GET       | new    | Return a specific thing |
| /habits          | POST      | create | Create a new thing | 
| /habits/:id      | GET       | show   | Return a specific thing |  
| /habits/:id/edit | GET       | edit   | Return a thing of a specific thing |     
| /habits/:id      | PATCH/PUT | update | Add or remove a specific thing |
| /habits/:id      | DELETE    | destroy| Delete something specific |

### BD Structure



#### `POST /habits` request body



#### `PATCH ` request body


#### `POST ` request body



## Changelog

* 

## Fixed Bugs

- [x] 

## Remaining Bugs

- [ ] Blank comments are accepted into the data.

## Pitfalls & Discoveries

* Finding a post (in the Posts array) by one of its properties using the [`Array.find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) function.

* `express.Router` can be used as a middleware to handle routes.

## Future Features

* Post moderation by adding a password protected delete route into the API.
* Nicknames to be added to posts alongside the title and message.

## License

[MIT License 🔗](https://opensource.org/licenses/mit-license.php)

