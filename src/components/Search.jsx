import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Loading from './Loading';

const Search=()=>{

    const [userInput,setUserInput]=useState("");
    const [FlagURL,setFlagURL]=useState("");
    const [IconUrl,setIconUrl]=useState("");
    const [stableData,setStableData]=useState("");
    const [apicall,setApicall]=useState(false);
    const [error,setError]=useState(false);
    

    

    const [data,setData]=useState({
        CityName: '',
        temp: '',
        feels_like: '',
        temp_min: '',
        temp_max: '',
        pressure: '',
        humidity: '',
        visibility: '',
        wind_speed: '',
        wind_deg: '',
        country: '',
        sunrise: '',
        sunset: '',
        description: '',
        cloudiness: '',
        weatherIcon:''
    });


    function ClickHandler()
    {
        if(userInput)
        {
            setStableData(userInput);
            
        }
        
    }

    function inputChangeHandler(event)
    {
        setUserInput(event.target.value);
    }



    const REACT_APP_API_KEY=process.env.REACT_APP_API_KEY;


    async function fetchData()
        {
            if(stableData)
            {

                
                try{
                    setError(false);
                    setApicall(true);
                    

                    const URL=`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${REACT_APP_API_KEY}`;
                    


                    const response=await axios.get(URL);

                    const weatherData=response.data;

                    console.log("printing data received of city");
                    console.log(weatherData);

                    setFlagURL(`https://flagsapi.com/${weatherData.sys.country}/flat/64.png`);
                    setIconUrl(`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`);

                    setData({

                        CityName: weatherData.name,
                        temp: (weatherData.main.temp - 273.15).toFixed(2),
                        feels_like: (weatherData.main.feels_like - 273.15).toFixed(2),
                        temp_min: (weatherData.main.temp_min - 273.15).toFixed(2),
                        temp_max: (weatherData.main.temp_max - 273.15).toFixed(2),
                        pressure: weatherData.main.pressure,
                        humidity: weatherData.main.humidity,
                        visibility: (weatherData.visibility / 1000).toFixed(2),
                        wind_speed: weatherData.wind.speed,
                        wind_deg: weatherData.wind.deg,
                        country: weatherData.sys.country,
                        sunrise: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(),
                        sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(),
                        description: weatherData.weather[0].description,
                        cloudiness: weatherData.clouds.all,
                        weatherIcon:weatherData.weather[0].icon
                    })
                    
                    setApicall(false);

                }
                catch(error)
                {
                    setApicall(false);
                    setError(true);
                    console.log(error);
                }

            }

        

    } 

    useEffect(()=>{

    fetchData();

    },[stableData]);


    

    return(
        <div >
            <div className='flex space-x-2 h-[9vh] items-center justify-center bg-black'>
                <label className='pt-[1vh] h-[4vh] text-center rounded-2xl'>
                
                    <input className='text-center rounded-lg border-[6px] bg-blue-200 border-blue-200'
                    
                        type="text"

                        placeholder='Enter the name of city'

                        value={userInput}

                        onChange={inputChangeHandler}

                    />

                </label>    
                <button className='rounded-xl mt-5 bg-blue-200 h-[4vh] w-[10vh]' onClick={ClickHandler}>Search</button>
            </div>

            
            
                {apicall ? (
                    <div className="flex items-center justify-center h-screen bg-black">
                        <Loading/>
                    </div>
                    
                ) : 

                (error) ?

                (<div className="flex flex-col bg-slate-400 h-[100vh] text-center font-bold justify-center items-center">
                    <div className='text-3xl'>
                        404 Please Check the location!
                    </div>
                </div>)

                    :
                    (data.CityName) ? (    
                        <div className=' pt-[7vh] flex flex-col bg-slate-500 items-center justify-center text-xl font-bold'>

                            <h2 className='text-2xl text-yellow-950' > {data.CityName}</h2>
                            
                            <img src={FlagURL} />

                            <div className='flex flex-col justify-center space-y-2 text-2xl font-semibold text-yellow-950 text-center my-4'>
                                <p><strong>Temp:</strong> {data.temp}°C</p>
                                <p><strong>Feels Like:</strong> {data.feels_like}°C</p>
                            </div>
                            
                            <div className='flex flex-col text-center justify-center text-yellow-900 rounded-xl mt-5 w-[17vh] h-[23vh] bg-blue-300'>
                                <p><strong>{data.description}</strong> </p>
                                <img src={IconUrl} />
                            </div>
                            

                            <div className='flex  flex-wrap space-x-20 justify-evenly mt-10 sm:space-x-4  text-yellow-950 '>

                            <div className="flex flex-col text-center justify-center rounded-xl h-[27vh] w-[80vw] sm:w-[30vh] space-y-10 bg-blue-300">
                                    <p>
                                    <strong>Min Temp:</strong> {data.temp_min}°C
                                    </p>
                                    <p>
                                    <strong>Max Temp:</strong> {data.temp_max}°C
                                    </p>
                                    <p>
                                    <strong>Pressure:</strong> {data.pressure} hPa
                                    </p>
                                </div>

                                <div className="flex flex-col text-center justify-center rounded-xl h-[27vh] w-[80vw] sm:w-[30vh] space-y-10 bg-blue-300">
                                    <p>
                                    <strong>Humidity:</strong> {data.humidity}%
                                    </p>
                                    <p>
                                    <strong>Visibility:</strong> {data.visibility} km
                                    </p>
                                    <p>
                                    <strong>Wind Speed:</strong> {data.wind_speed} m/s
                                    </p>
                                </div>

                                <div className="flex flex-col text-center justify-center rounded-xl h-[27vh] w-[80vw] sm:w-[30vh] space-y-10 bg-blue-300">
                                    <p>
                                    <strong>Cloudiness:</strong> {data.cloudiness}%
                                    </p>
                                    <p>
                                    <strong>Sunrise:</strong> {data.sunrise}
                                    </p>
                                    <p>
                                    <strong>Sunset:</strong> {data.sunset}
                                    </p>
                                </div>

                            </div>
                      
                        </div>
                    ) 
                    

                    :(
                        <div className="flex flex-col bg-slate-400 h-[100vh] text-center font-bold justify-center items-center">
                            <div className='text-3xl'>
                                Enter the Location
                            </div>
                        </div>

                    )
                }
        </div>
    )
}

export default Search;


 