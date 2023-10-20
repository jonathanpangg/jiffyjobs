import dotenv from 'dotenv';
import axios from 'axios';


// calculates distance from the jobaddress and targetaddress
export async function calculateDistance(jobaddress, targetaddress) {
    try{
        const apikey = process.env.API_KEY;
        const address = address
        const apiUrl = "";

        const response = await axios.get(apiUrl)
        console.log(response.data)
        return response.data;
        
    } catch(e) {
        return e;
    }
}