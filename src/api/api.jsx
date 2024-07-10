
const apiKey = '6038c4c763f152fa60d1fc08146f7ed1';

async function GetWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}
export default GetWeather