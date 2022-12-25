import React, { useEffect, useState } from "react";
import "./style.css";
const Tempapp = () =>{
const [city,setCity]  = useState(null);
const [min,setMin]  = useState(null);
const [max,setMax]  = useState(null);
const [country,setCountry]  = useState(null);
const [temp,setTemp]  = useState(null);
const [search,setSearch]  = useState("Chittagong");
useEffect (()=>{
    const fetchApi = async () =>{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=83d2bb00b9ed3ba554051d9ba7359269` ;
        const response  = await fetch(url);
        const data  = await response.json();
         console.log(data);
        setCity(data.name);
        setTemp(data.main.temp);
        setMax(data.main.temp_max);
        setMin(data.main.temp_min);
        let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});

        setCountry( regionNames.of(data.sys.country));
    }
    fetchApi();
},[search]);

    return(
        <>
        <div className = "box">
            <br/>
            <div className="inputData">
            <input type="search" className="inputField" value={search} onChange={(event)=>{
             setSearch(event.target.value)
            }} />
        
        </div>
        {!city?(<p className="errorMsg">No Data Found</p>):( 
        <div>
        <div className="info">
            <h2 className=""><i className="fas fa-street-view"></i>{search} ({country})</h2>
            <h2 className="">{temp} °Cel</h2>
            <h3 className="tempmin_max">Min:{min} °Cel | Max:{max} °Cel</h3>
        </div>
        <div className="wave -one"></div>
        <div className="wave -two"></div>
        <div className="wave -three"></div>
        </div>
        )}
        </div>
        </>
    )
}
export default Tempapp;