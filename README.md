<h1 align="center">PosePal</h1>

<p>
  <a href="https://github.com/HzLi0220/PosePal/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/HzLi0220/PosePal" alt="contributors" />
  </a>
  <a href="">
    <img src="https://img.shields.io/github/last-commit/HzLi0220/PosePal" alt="last update" />
  </a>
  <a href="https://github.com/HzLi0220/PosePal/network/members">
    <img src="https://img.shields.io/github/forks/HzLi0220/PosePal" alt="forks" />
  </a>
  <a href="https://github.com/HzLi0220/PosePal/stargazers">
    <img src="https://img.shields.io/github/stars/HzLi0220/PosePal" alt="stars" />
  </a>
  <a href="https://github.com/HzLi0220/PosePal/issues/">
    <img src="https://img.shields.io/github/issues/HzLi0220/PosePal" alt="open issues" />
  </a>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Project Description](#project-description)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Roadmap](#roadmap)


## Project Description
![Alt text](https://cdn.discordapp.com/attachments/1175451410750513263/1175487426723061840/image.png?ex%253D656b68fa%2526is%253D6558f3fa%2526hm%253Da03ca50e588466b76c85803455cd0b93fcd52e8fe6f2f71e2f988eba590d8724%2526)
PosePal is a web application designed to encourage healthy screen habits. It monitors the distance between the user and their screen during work sessions. When users get too close, the app notifies them, promoting better posture and eye health. Additionally, PosePal includes a 'Bandage' feature for posture correction and historical statistics for tracking progress. This functionality helps users review and improve their screen habits over time. Aimed at enhancing user satisfaction, PosePal is a valuable tool for maintaining a healthy digital lifestyle.

## Tech Stack

*   **Frontend:** [React](https://reactjs.org/), [Tailwindcss](https://tailwindcss.com/)
*   **Backend:** [NodeJS](https://nodejs.org/en/docs)/[ExpressJS](https://expressjs.com/), [Knex](https://knexjs.org/)
*   **Database:** [SQLite](https://www.sqlite.org/)

## Getting Started

### Prerequisites

- Download and install the latest version of Git on your system. See https://git-scm.com/downloads.
- Download and install the latest version of NodeJS and npm on your system. See https://nodejs.org/en/.


### How to Run

- Clone the repository for this project by running the following command in a terminal: 
  ##### `git clone https://github.com/HzLi0220/PosePal`
- Open the cloned folder in VS Code. Open the terminal and make sure its pointing to the root of the cloned project.

- Running Backend Node JS Application:

  - Change the directory to backend folder using terminal command: `cd backend`
  - At the root of the backend directory, create an .env file and copy the content from .env.development into the new .env file. 
  - In the backend directory, you can run:

  ##### `npm install`

  - It'll download all the packages/dependencies as defined in package.json file. Once the system completes this process, we can type below command:

  ##### `npm start`

  - Runs the app in the development mode.
  - You can start making http calls to [http://localhost:3001](http://localhost:3001)
  - you may need to change `filename`to `'./dev.sqlite3'` in  `knexfile` before doing that

  ##### `npm run migrate`

  - you may need to change `filename`to `'./db/dev.sqlite3'` in  `knexfile` before doing that

  #### change `.env.development` to  `.env`

- Running Frontend React JS Application:

  - Change the directory to frontend folder using terminal command: `cd frontend`
  - At the root of the backend directory, create an .env file and copy the content from .env.development into the new .env file. 
  - In the frontend directory, you can run:

  ##### `npm install`

  - It'll download all the packages/dependencies as defined in package.json file. Once the system completes this process, we can type below command:

  ##### `npm start`

  - Runs the app in the development mode.
  - Open [http://localhost:3000](http://localhost:3000) to view it in the browser

  - The page will reload if you make edits.
  - You will also see any lint errors in the console.

  #### change `.env.development` to  `.env`

## Roadmap

Current Version: MVP
- *User Login and Registration*: Allows users to create and access their accounts.
- *Session Management with Distance Detection*: Users can start and end sessions where the app monitors and alerts on screen distance.
- *History Viewing*: Enables users to review their session histories, tracking screen habits over time.

## Contribute

- PosePal appreciates your contribution in any aspects of project development like documenting, UI/UX design, Frontend/Backend development etc.

