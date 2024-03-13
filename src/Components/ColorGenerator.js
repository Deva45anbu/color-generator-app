import React, { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import GoogleImageApiCall from '../Api/Client';
import ColorThief from 'colorthief';
import { Loader } from '../Utils/Loader';


export const ColorGenerator = () => {

    // State variables for managing search input, dominant color results, loading state, and error state.
    const [searchTest, setSearchTest] = useState('')
    const [dominantColorResult, setDominantColorResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    // Generates dominant color codes from images based on the provided search term.
    const GenerateColorCode = async () => {
        if (searchTest !== '') {
            try {
                setLoading(true);
                let dominantColors = [];
                // Fetch image search results using the Google Image API.
                const imageSearchResults = await GoogleImageApiCall(searchTest);
                console.log(imageSearchResults.status);

                if (imageSearchResults.status === 200 && imageSearchResults.data.images_results) {
                    const colorThief = new ColorThief();

                    // Use Promise.all to concurrently process and extract colors from multiple images.
                    await Promise.all(imageSearchResults.data.images_results.map(async (item) => {
                        try {
                            await loadImage(item, colorThief, dominantColors);
                        } catch (error) {
                            console.error('Error processing image:', error);
                        }
                    }));
                    setDominantColorResult(dominantColors)
                    setLoading(false);
                } else {
                    setLoading(false);
                    setError(true)
                }

            } catch (error) {
                setLoading(false);
                setError(true)
                console.error('Error in GenerateColorCode:', error);
            }
        }
    };

    // Loads an image asynchronously, extracts its dominant color, and adds it to the dominantColors array.
    const loadImage = async (item, colorThief, dominantColors) => {
        return new Promise((resolve) => {
            const currentImage = new Image();
            // Set crossOrigin property to "Anonymous" to handle CORS for image fetching.
            currentImage.crossOrigin = "Anonymous";
            currentImage.src = item.original;
            currentImage.onload = async () => {
                const dominantColor = await colorThief.getColor(currentImage);
                const hexColor = rgbToHex(dominantColor);

                if (!dominantColors.includes(hexColor)) {
                    // Create a JSX element representing the dominant color, and add it to the array.
                    dominantColors.push(<div
                        key={dominantColors.length}
                        style={{
                            height: (dominantColors.length) % 5 === 0 ? "200px" :
                                (dominantColors.length) % 3 === 0 ? "50px" : (dominantColors.length) % 2 === 0 ? "100px" :
                                    "150px",
                            background: hexColor,
                            margin: "5px",
                            borderRadius: "8px"
                        }}
                    ><p>{hexColor}</p></div>)
                }
                // console.log(item.position, 'Dominant Color (Hex):', hexColor, "dominant length :", dominantColors.length);
                resolve();
            };

            currentImage.onerror = (error) => {
                console.error('Error loading image:', error);
                resolve(); // Resolve the promise even in case of an error
            };
        });
    };

    // Converts an RGB color array to its corresponding hexadecimal representation
    const rgbToHex = (rgb) => {
        return '#' + rgb.map((value) =>
            value.toString(16).padStart(2, '0')
        ).join('');
    };

    // Clears the search input and resets the dominant color results.
    const clearSearch = () => {
        setSearchTest('');
        setDominantColorResult([]);
    }

    // JSX rendering of the ColorGenerator component.
    return (
        <div className='card p-5' style={{ height: '100vh' }}
        >
            <div className='sticky-top'>
                <div className='row text-center my-3 '>
                    <h1>Color Generator</h1>
                </div>

                <div className="row d-flex justify-content-center">
                    <div className='w-25'>
                        <input type="text"
                            value={searchTest}
                            className="form-control"
                            placeholder="Enter A Word To Generate Color Codes"
                            disabled={loading}
                            onChange={(e) => setSearchTest(e.target.value)} />
                    </div>

                    <div className="text-center my-1">
                        <button className="btn btn-primary m-2"
                            disabled={loading}
                            onClick={() => clearSearch()}>Clear</button>
                        <button className="btn btn-primary m-2"
                            disabled={loading}
                            onClick={() => GenerateColorCode()}>Search</button>
                    </div>
                </div>
            </div>
            {/* Conditional rendering based on loading and error states. */}
            {loading ? (
                <Loader />
            ) : error ?
                <div className='text-center'>
                    <h4>
                        Error While fetching data
                    </h4>
                </div> : dominantColorResult.length !== 0 ?
                    (
                        <div className='card-body overflow-auto'>
                            <ResponsiveMasonry
                                columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4, 900: 5, 1100: 6, 1300: 7, 1500: 8 }}
                            >
                                <Masonry>{dominantColorResult}</Masonry>
                            </ResponsiveMasonry>
                        </div>
                    ) : null}
        </div>
    )
}