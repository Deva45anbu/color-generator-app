import axios from 'axios';

const GoogleImageApiCall = async (query) => {
    try {
        const response = await axios.get(`https://serpapi.com/search.json?ijn=1&q=${query}&tbm=isch&api_key=f066e6d1872dd1cd66bed6a62049d314a739fc8fa0f5a1fc8f7d6df36caec877`);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export default GoogleImageApiCall;