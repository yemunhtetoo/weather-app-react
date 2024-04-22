import { useState } from "react";
import Search from "../search";
import { useEffect } from "react";
export default function Weather(){
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [error,setError] = useState(null);
    async function fetchWeatherData(param){
        setLoading(true)
        try{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=8b294f3b6edb4316ee0add41bdfae273`);
            if(!response.ok){
                setWeatherData(null)
                setLoading(false);
                setError('No Data Found')
            
            }else{
                setError(null)
                const data = await response.json();
                console.log(data, "data");
                if(data){
                    setWeatherData(data);
                    setLoading(false)
                }
            }
            
        }catch(e){
            console.log(e);
            setLoading(false)
        }
    }
    async function handleSearch(){
            fetchWeatherData(search);
    }
    
    function getCurrentDate(){
        return new Date().toLocaleDateString('en-us',{
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }

    useEffect(()=>{
        fetchWeatherData(search);
    },[]);
 
    return (
        
        <div className="weather-app">
            <Search search={search} setSearch={setSearch} handleSearch={handleSearch} />
            {loading ? <div>Loading...</div> : error ? <div>{error}</div> : weatherData ?
                ( 
                    <div>
                        <div className="city-name">
                            <h2>{weatherData?.name}, <span>{weatherData?.sys?.country}</span></h2>
                        </div>
                        <div className="date">
                            <span>{getCurrentDate()}</span>
                        </div>
                        <div className="temp">
                            {weatherData?.main?.temp}
                        </div>
                        <p className="description">
                           {weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : ''} 
                        </p>
                        <div className="weather-info">
                            <div className="column">
                                <div>
                                    <p className="wind">{weatherData?.wind?.speed}</p>
                                    <p>Wind Speed</p>
                                </div>
                            </div>

                            <div className="column">
                                <div>
                                    <p className="humidity">{weatherData?.main?.humidity}</p>
                                    <p>Humidity</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null
            }
            
            </div>
    );
}