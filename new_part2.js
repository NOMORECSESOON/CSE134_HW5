class WeatherWidget extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = '';

        const apiUrl = "https://api.weather.gov/gridpoints/SGX/55,21/forecast";

        fetch(apiUrl).then((response) => response.json())
            .then((data) => {
                console.log(data);
                const current_weather_data = data.properties.periods[0];
                const temp = current_weather_data.temperature;
                const unit = current_weather_data.temperatureUnit;
                const curTemp = `${temp} \u00B0${unit}`;

                const shortForecast = current_weather_data.shortForecast;
                const curShortForecast = `${shortForecast}`;

                const weather_Icon = document.createElement('img');
                
                const forecastWords = shortForecast.split(' ');
                const weather = ['rainy', 'sunny', 'cloudy', 'foggy', 'snowy', 'windy'];
                let curWeather = forecastWords.find(w => weather.includes(w.toLowerCase()));
                curWeather = curWeather.toLowerCase();
                if (curWeather === 'rainy') {
                    weather_Icon.src = "weather-icons/rainy.png";
                    weather_Icon.alt = "rainy";
                } 
                else if (curWeather === 'windy') {
                    weather_Icon.src = "weather-icons/windy.png";
                    weather_Icon.alt = "windy";
                } 
                else if (curWeather === 'cloudy') {
                    weather_Icon.src = "weather-icons/cloudy.png";
                    weather_Icon.alt = "cloudy";
                } 
                else if (curWeather === 'foggy') {
                    weather_Icon.src = "weather-icons/foggy.png";
                    weather_Icon.alt = "foggy";
                } 
                else if (curWeather === 'snowy') {
                    weather_Icon.src = "weather-icons/snowy.png";
                    weather_Icon.alt = "snowy";
                } 
                else if (curWeather === 'sunny') {
                    weather_Icon.src = "weather-icons/sunny.png";
                    weather_Icon.alt = "sunny";
                } 
                else {
                    weather_Icon.src = "weather-icons/clear.png";
                    weather_Icon.alt = "clear";
                }
                
                const relativeHumidity = current_weather_data.relativeHumidity.value;
                const curHumidity = `${relativeHumidity} %`;

                const windSpeed = current_weather_data.windSpeed;
                const windDirection = current_weather_data.windDirection;
                const curWind = `${windSpeed} ${windDirection}`;

                const weather_Info = document.createElement('p');
                weather_Info.textContent = `${curShortForecast} ${curTemp}`;

                const humidity_Info_Img = document.createElement('img');
                humidity_Info_Img.src = 'weather-icons/humidity.png';
                const humidity_Info = document.createElement('p');
                humidity_Info.textContent = `Humidity: ${curHumidity}`;

                const wind_Info_Img = document.createElement('img');
                wind_Info_Img.src = 'weather-icons/wind_dir.png';
                const wind_Info = document.createElement('p');
                wind_Info.textContent = `Wind: ${curWind}`;

                this.appendChild(weather_Icon);
                this.appendChild(weather_Info);
                this.appendChild(humidity_Info_Img);
                this.appendChild(humidity_Info);
                this.appendChild(wind_Info_Img);
                this.appendChild(wind_Info);                
            })
            .catch((error) => {
                console.error('Error fetching weather data:', error);
                this.textContent = 'Unable to fetch weather data';
            });
    }
}

customElements.define('weather-widget', WeatherWidget);