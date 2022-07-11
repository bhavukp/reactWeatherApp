import React, { Component } from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "d8d31362b0e419cc3cb64e9612e53a99";

class App extends Component {

    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined,
    }

    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`);
        const data = await apiCall.json();

        if (city && country && data.main) {
            this.setState({
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error: undefined,
            })
        }
        else {
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: "Please Check Your Values",
            })
        }

    }

    render() {
        return (
            <div className="wrapper">
                <div className="main">
                    <div className="title-container">
                        <Titles />
                    </div>
                    <div className="form-container">
                        <Form getWeather={this.getWeather} />
                        <Weather
                            temperature={this.state.temperature}
                            city={this.state.city}
                            country={this.state.country}
                            humidity={this.state.humidity}
                            description={this.state.description}
                            error={this.state.error}
                        />
                    </div>
                </div>
            </div>
        )
    }

}
export default App;