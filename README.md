# Friend Finder

A full-stack compatibility matching web application built with **Node.js**, **Express**, and **Materialize CSS**. Answer a 10-question personality survey and our matching algorithm will pair you with the community member you have the most in common with!

![Friend Finder Screenshot](./app/public/img/screenshot.png)

## Live Demo

**[View the Live App Here](https://herokuapp.com)**

---

## How It Works

1. Browse existing **Community Members** on the home page or click **Take the Survey**.
2. Enter your name, a link to your profile photo, and rate **10 personality statements** from `1` (Strongly Disagree) to `5` (Strongly Agree).
3. Submit the survey to send your scores to the `/api/friends` endpoint.
4. The server compares your answers question-by-question against every existing user to find the lowest total score difference, reveals your **Best Match** in a modal, and adds your profile to the community list.

---

## Features

* **Compatibility Matching Algorithm:** Calculates question-by-question absolute differences across all 10 survey responses to identify the closest personality match (with randomized tie-breaking).
* **RESTful API & HTML Routing:** Separates static page delivery (`htmlRoutes.js`) from JSON data endpoints (`apiRoutes.js`).
* **Modern Dark-Mode UI:** Styled with Materialize CSS and custom CSS variables, featuring responsive 4-column member cards, automatic fallback avatars for broken image URLs, and a match reveal modal.
* **Interactive Form Validation:** Highlights unanswered survey dropdowns and displays Materialize toast alerts before submitting.

---

## Technologies Used

* **Backend:** Node.js, Express.js (`express`)
* **Frontend:** HTML5, CSS3, JavaScript (ES6+), jQuery (`v3.3.1`), Materialize CSS (`v1.0.0`)
* **APIs & Tooling:** Fetch API, RESTful JSON Endpoints

---

## Routes

### HTML Routes

| Method | Path | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Serves `home.html` with the community directory |
| `GET` | `/survey` | Serves `survey.html` with the 10-question compatibility form |

### API Endpoints

| Method | Path | Description |
| :--- | :--- | :--- |
| `GET` | `/api/friends` | Returns a JSON array of all registered friends |
| `POST` | `/api/friends` | Evaluates survey scores, saves the new user, and returns the closest matched friend |

---

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org) (v10 or higher recommended)
* `npm`

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com
   cd friend-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   node server.js
   ```

4. Open [http://localhost:3000](http://localhost:3000) (or your configured `PORT`) in your browser.

---

## Project Structure

```text
friend-finder/
├── app/
│   ├── data/
│   │   └── friends.js          # Seed data and in-memory array of user profiles
│   ├── public/
│   │   ├── css/
│   │   │   └── style.css       # Custom dark-mode theme and responsive card styles
│   │   ├── js/
│   │   │   ├── home.js         # Fetches and renders community member cards
│   │   │   └── survey.js       # Validates form, posts scores, and triggers match modal
│   │   ├── home.html           # Landing page and community grid
│   │   └── survey.html         # 10-question compatibility survey and match modal
│   └── routing/
│       ├── apiRoutes.js        # GET /api/friends and POST matching logic
│       └── htmlRoutes.js       # HTML page routing
├── package.json
├── README.md
└── server.js                   # Express server entry point
```

---

## License

This project is open source and available under the [MIT License](LICENSE).
