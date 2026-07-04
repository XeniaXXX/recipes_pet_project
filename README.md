# Recipe Book

A responsive web application for browsing, searching, and filtering recipes. The project demonstrates working with an API, dynamic rendering, client-side filtering, and page navigation using vanilla JavaScript.

## Features

* Browse a collection of recipes
* Search recipes by keyword
* Filter recipes by:

  * Cuisine
  * Main ingredient
  * Cooking time
  * Calories
* View detailed recipe information
* Dynamic rendering without page reloads
* Responsive layout for desktop and mobile devices

## Technologies

* HTML5
* SCSS
* JavaScript (ES6+)
* REST API

## Project Structure

src/
├── api/          # API requests
├── models/       # Data models
├── render/       # UI rendering
├── pages/        # Page logic
├── utils/        # Helper functions
├── styles/       # SCSS files
└── assets/       # Images and icons

##Data Source**

Recipe data is provided by the public SampleAPIs service:

https://api.sampleapis.com/recipes/recipes

## Installation

Clone the repository:
git clone https://github.com/your-username/recipe-book.git

Install dependencies:
npm install

## Functionality

### Home Page

* Displays featured recipes
* Shows recipe categories
* Navigation to recipe details and recipe list

### Recipes Page

* Displays all available recipes
* Search by keyword
* Multiple filters
* Real-time filtering
* Recipe counter

### Recipe Details

* Full recipe information
* Ingredients
* Cooking instructions
* Nutrition facts
* Link to the original recipe

## Future Improvements

* Pagination
* Sorting
* Favorite recipes
* User authentication
* Dark mode
* Saving filters between sessions

## Author

Developed as a portfolio project using vanilla JavaScript.
