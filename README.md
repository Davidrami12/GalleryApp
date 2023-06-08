# GalleryApp

## Table of Contents

1. [Introduction](#introduction)
2. [Technologies](#technologies)
3. [Features](#features)
4. [Setup](#setup)
5. [Usage](#usage)
6. [Contributing](#contributing)

## Introduction

<p>GalleryApp is a powerful and dynamic web application developed using React, Redux, and Material-UI (MUI). It allows users to seamlessly browse, search, download, and favorite high-quality images sourced from the Unsplash API.</p>

<p>🎨 It was firstly designed on Figma: https://www.figma.com/file/L6XNA2CBOQnaCt2TegDpI9/GalleryApp---MUI-(Material-Design-Component-Figma-Library-For-React)?type=design&node-id=729-2702&t=pkqAvQSqwLrLpJ28-0</p>

<p>💻 Deployed on GitHub Pages. You can visualize this project at: https://davidrami12.github.io/GalleryApp/</p>

## Technologies
- HTML
- CSS
- JavaScript
- React
- Redux
- Material-UI
- Unsplash API

## Features

- **Home Page**: The application's main page.
- **Search Page**: Connected to the Unsplash API, this page allows users to search for images by topic. With no input data, the search button will generate random images.
- **Favorites Page**: All images added to the favorites will be displayed here. Users can download, edit the description, or delete them from favorites.

## Setup

### Prerequisites

- Node.js installed (v14 or later recommended)
- NPM (v6 or later) or Yarn (v1.22 or later)

### Installation

1. Clone the repository

```bash
git clone https://github.com/username/GalleryApp.git
cd GalleryApp
```

2. Install NPM packages
```bash
npm install
```
  or
```bash
yarn install
```

3. Create a .env file in the root directory of the project, and add the Unsplash API key
```bash
REACT_APP_UNSPLASH_API_KEY=your_unsplash_api_key_here
```

4. Run the app in the development mode
```bash
npm start
```
   or
```
yarn start
```

Open http://localhost:3000 to view it in the browser.

## Usage
Navigate to the Search page and input a topic to retrieve images related to your query. To add an image to your Favorites, simply click on the heart icon. Visit the Favorites page to view all your favorite images.

## Contributing
If you want to contribute to this project and make it better, your help is very welcome.
