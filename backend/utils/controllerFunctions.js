import axios from 'axios';

// calculates distance from the jobaddress and targetaddress
export async function getDistanceBetweenAddresses(origin) {
    const endpoint = 'https://nominatim.openstreetmap.org/search';
    const params = {
        q: origin,
        format: 'json',
        limit: 1
    };
    

    try {
        const response = await axios.get(endpoint, { params });
        const [data] = response.data; // Get the first result
        if (!data) {
            console.log(`No coordinates found for address: ${address}`);
            return null;
        }
        const { lat, lon, display_name } = data;
        return { lat, lon };
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
    }
}


