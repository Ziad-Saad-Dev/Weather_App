import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {
    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false)

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": cloud_icon,
        "04n": cloud_icon,
        "09d": drizzle_icon,
        "09n": drizzle_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "11d": rain_icon,
        "11n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }

    const search = async (city) => {
        if (city === "") {
            alert("Please enter a city name")
            return
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const response = await fetch(url)
            const data = await response.json()
            if (!response.ok) {
                alert(data.message)
                return
            }
            const icon = allIcons[data.weather[0].icon] || clear_icon
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temprature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) {
            setWeatherData(false)
            console.error("Error fetching weather data")
        }
    }

    useEffect(() => {
        search("London")
    }, [])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') search(inputRef.current.value)
    }

    return (
        <div className="container-fluid px-3 px-sm-4 py-4 d-flex justify-content-center align-items-center min-vh-100">
            <div className="weather-card card text-center">

                {/* Search-Bar */}
                <div className="search-bar d-flex align-items-center gap-2 mb-2">
                    <input
                        ref={inputRef}
                        type="text"
                        className="search-input flex-grow-1"
                        placeholder="Search city..."
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className="search-btn d-flex align-items-center justify-content-center flex-shrink-0"
                        onClick={() => search(inputRef.current.value)}
                        aria-label="Search"
                    >
                        <img src={search_icon} alt="Search" />
                    </button>
                </div>

                {weatherData ? (
                    <>
                        {/* Weather-Icon */}
                        <div className="d-flex justify-content-center my-3 my-md-4">
                            <img
                                src={weatherData.icon}
                                alt="Weather icon"
                                className="weather-icon img-fluid"
                            />
                        </div>

                        {/* Temperature */}
                        <p className="temperature mb-0">{weatherData.temprature}°C</p>

                        {/* Location */}
                        <p className="location mb-0">{weatherData.location}</p>

                        {/* Humidity & Wind */}
                        <div className="weather-data row g-3 mt-3 mt-md-4 w-100 mx-0">
                            <div className="col-6 d-flex align-items-center gap-2 justify-content-center justify-content-sm-start">
                                <img src={humidity_icon} alt="Humidity" className="weather-data-icon flex-shrink-0" />
                                <div className="text-start">
                                    <p className="mb-0 fw-semibold">{weatherData.humidity}%</p>
                                    <span className="data-label">Humidity</span>
                                </div>
                            </div>
                            <div className="col-6 d-flex align-items-center gap-2 justify-content-center justify-content-sm-start">
                                <img src={wind_icon} alt="Wind Speed" className="weather-data-icon flex-shrink-0" />
                                <div className="text-start">
                                    <p className="mb-0 fw-semibold">{weatherData.windSpeed} km/h</p>
                                    <span className="data-label">Wind Speed</span>
                                </div>
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default Weather
