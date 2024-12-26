import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading';

const Home = () => {
  let lat = null;
  let lng = null;
  const [FlagURL,setFlagURL]=useState("");
  const [IconUrl,setIconUrl]=useState("");

  const API_KEY = process.env.REACT_APP_API_KEY;

  const [data, setData] = useState({
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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          lat = latitude;
          lng = longitude;

          if (lat !== null && lng !== null) {
            fetchData(lat, lng); 
          }
        },
        (err) => {
          console.log(err.message);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  async function fetchData(lat, lng) {
    try {

      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`;
      const response = await axios.get(URL);

      const weatherData = response.data;

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

      });

    } 
    catch (error) {
      console.log(error);
    }
  }

  return (
    // <div className='h-[94vh] bg-slate-400' > 
      
    //             {data.CityName ? (
    //                 <div className=' pt-[7vh] flex flex-col items-center justify-center text-xl font-bold'>

    //                   <h2 className='text-2xl text-yellow-950' > {data.CityName}</h2>
                      
    //                   <img src={FlagURL} />

    //                   <div className='flex flex-col justify-center space-y-2 text-2xl font-semibold text-yellow-950 text-center my-4'>
    //                     <p><strong>Temp:</strong> {data.temp}°C</p>
    //                     <p><strong>Feels Like:</strong> {data.feels_like}°C</p>
    //                   </div>
                      
    //                   <div className='flex flex-col text-center justify-center text-yellow-900 rounded-xl mt-5 w-[17vh] h-[23vh] bg-blue-300'>
    //                     <p><strong>{data.description}</strong> </p>
    //                     <img src={IconUrl} />
    //                   </div>
                      

    //                   <div className='flex space-x-20 justify-evenly mt-10 text-yellow-950 '>

    //                     <div className='flex flex-col text-center justify-center rounded-xl h-[27vh] w-[30vh]  space-y-10 bg-blue-300'>
    //                       <p><strong>Min Temp:</strong> {data.temp_min}°C</p>
    //                       <p><strong>Max Temp:</strong> {data.temp_max}°C</p>
    //                       <p><strong>Pressure:</strong> {data.pressure} hPa</p>
    //                     </div>
                        
    //                     <div className='flex flex-col text-center justify-center rounded-xl h-[27vh] w-[30vh]  bg-blue-300 space-y-10'>

    //                       <p><strong>Humidity:</strong> {data.humidity}%</p>
    //                       <p><strong>Visibility:</strong> {data.visibility} km</p>
    //                       <p><strong>Wind Speed:</strong> {data.wind_speed} m/s</p>

    //                     </div>
                        
    //                     <div className='flex flex-col text-center justify-center rounded-xl h-[27vh] w-[30vh]  bg-blue-300 space-y-10'>
    //                       <p><strong>Cloudiness:</strong> {data.cloudiness}%</p>
    //                       <p><strong>Sunrise:</strong> {data.sunrise}</p>
    //                       <p><strong>Sunset:</strong> {data.sunset}</p>
    //                     </div>

    //                   </div>
                      
    //                 </div>


    //             ) : (
    //               <div className="flex items-center justify-center h-screen bg-black">
    //                 <div>
    //                   <Loading/>
    //                 </div>
    //               </div>
    //             )}
    // </div>


<div className=" bg-slate-400">
{data.CityName ? (
  <div className="pt-[7vh] flex flex-col items-center justify-center text-xl font-bold">
    <h2 className="text-2xl text-yellow-950">{data.CityName}</h2>

    <img src={FlagURL} alt="Country Flag" />

    <div className="flex flex-col justify-center space-y-2 text-2xl font-semibold text-yellow-950 text-center my-4">
      <p>
        <strong>Temp:</strong> {data.temp}°C
      </p>
      <p>
        <strong>Feels Like:</strong> {data.feels_like}°C
      </p>
    </div>

    <div className="flex flex-col text-center justify-center text-yellow-900 rounded-xl mt-5 w-[17vh] h-[23vh] bg-blue-300">
      <p>
        <strong>{data.description}</strong>
      </p>
      <img src={IconUrl} alt="Weather Icon" />
    </div>

    <div className="flex flex-wrap justify-center space-x-0 sm:space-x-4 mt-10 text-yellow-950">
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
) : (
  <div className="flex items-center justify-center h-screen bg-black">
    <div>
      <Loading />
    </div>
  </div>
)}
</div>

  );
};

export default Home;
