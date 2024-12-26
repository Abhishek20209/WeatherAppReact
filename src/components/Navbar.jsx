import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar=({atHome,setAtHome})=>{

    const Navigate=useNavigate();

    function YourWeatherClickHandler()
    {
        if(!atHome)
        {
            Navigate("/");
            setAtHome(true);
            
        }
    }

    function SearchClickHandler(){
        if(atHome)
        {
            setAtHome(false);
            Navigate("/Search");
        }
    }

    return(
        <div className='bg-red-950 h-[12vh] flex flex-col justify-between'>

            <h1 className='font-bold text-blue-500 text-4xl text-center justify-center'>ForCast</h1>

            <div className='flex justify-center space-x-3 '>   
                <button onClick={YourWeatherClickHandler} className='bg-black w-[23vh] h-[5vh] text-blue-500 rounded-lg text-xl'>Your Weather</button>
                <button onClick={SearchClickHandler} className='bg-black w-[23vh] h-[5vh] text-blue-500 rounded-lg text-xl' >Search Weather</button>
            </div>
           

        </div>
    )
}

export default Navbar;