
# Color Generator App

The Color Generator is a web application built with React that allows users to dynamically generate dominant color codes based on a provided search term. It leverages the Google Image API to fetch related images and extracts the dominant colors from each image using the ColorThief library.


## Features

- **Color Code Generation:** Enter a search term, click the "Search" button, and see dynamically generated color palettes based on images related to the search term.

- **Responsive Design:** The layout adjusts based on the screen width to provide a seamless experience across various devices.

- **Loading and Error Handling:** A loading spinner indicates ongoing activity during color code generation, and error messages are displayed if there are issues with data fetching or image processing.

- **Search Management:** Clear the search input and reset the displayed color palettes with the "Clear" button.


## Prerequisites

#### Install Node JS
Refer to https://nodejs.org/en/ to install nodejs


####  Cloning and Running the Application in local

- Clone the project into local

```bash
git clone https://github.com/Deva45anbu/color-generator-app.git
cd color-generator
```

- Install all the npm packages. Go into the project folder and type the following command to install all npm packages

```bash
npm install
```

- In order to run the application Type the following command

```bash
npm start
```

- Open your browser and visit http://localhost:3000 to see the Color Generator in action.

## Dependencies

- **React:** A JavaScript library for building user interfaces.

```
"react": "^17.0.2",
"react-dom": "^17.0.2",
"react-scripts": "4.0.3"
```
- **Axios:** A promise-based HTTP client for making requests to the Google Image API.
```
"axios": "^0.24.0"

```

- **ColorThief:** A JavaScript library for extracting color palettes from images.
```
"colorthief": "^2.3.0"
```
- **React Responsive Masonry:** A responsive Masonry layout component for React.

```
"react-responsive-masonry": "^1.0.1"
```
- **Bootstrap:** A popular CSS framework for building responsive and mobile-first websites.

```
"bootstrap": "^4.6.0"
```
## Key Components

#### ColorGenerator:
- This is the main component that orchestrates the color generation process. 
- Manages the state, including search input, dominant color results, loading state, and error state.
- Contains functions for generating color codes, loading images, converting RGB to hex, and clearing the search.
- Renders the user interface, including the search input, buttons, loading spinner, error messages, and the display of dominant colors in a Masonry layout.

#### Loader:

- This is a utility component that displays a loading spinner when the application is fetching data or processing images.
- It is likely located in the "Utils" directory and is used to provide visual feedback to the user during asynchronous operations.

#### ResponsiveMasonry and Masonry:
- These components are imported from the react-responsive-masonry library.
- They are used to create a responsive Masonry layout for displaying dominant colors.
- The ResponsiveMasonry component adjusts the number of columns based on screen width, and the Masonry component organizes the colored boxes.

#### GoogleImageApiCall:
- This is an external utility or API call function responsible for fetching image search results based on a provided search term, for more details refer this link [serpapi documentation](https://serpapi.com/google-images-api).

#### ColorThief:

- This component is imported from the colorthief library.
- It is used to extract dominant colors from images loaded in the application.
## Authors

- [@Deva45anbu](https://github.com/Deva45anbu)

