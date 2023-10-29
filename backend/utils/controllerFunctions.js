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


export function distance(lat1,
    lat2, lon1, lon2)
{

    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 =  lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula 
    let dlon = lon2 - lon1; 
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
    + Math.cos(lat1) * Math.cos(lat2)
    * Math.pow(Math.sin(dlon / 2),2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 6371 
    // for kilos
    let r = 3956;

    // calculate the result
    return(c * r);
}