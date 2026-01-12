import { useState } from "react";

function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    const fetchWeather = async () => {
        if (!city) return;

        try {
            setLoading(true);
            setError("");
            setWeather(null);

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
            );

            if (!response.ok) {
                throw new Error("City not found");
            }

            const data = await response.json();
            setWeather(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="weather-card">
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />

            <button onClick={fetchWeather}>Search</button>

            {loading && <p className="info">Loading...</p>}
            {error && <p className="error">{error}</p>}

            {weather && (
                <div className="result">
                    <h3>{weather.name}</h3>
                    <p>{weather.main.temp}°C</p>
                    <p>{weather.weather[0].main}</p>
                </div>
            )}
        </div>
    );
}

export default Weather;
