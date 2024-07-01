import axios from 'axios'
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const[data, setData] = useState({
    celcius: 10, 
    name: 'London',
    humidity: 10,
    speed: 2, 
    image: ''
     
  });
  const[name, setName] = useState('');
  const[error, setError] = useState('');

  const handleClick = () => {
    if(name !== ""){
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=cfc8b15b46e2bd783d008b76594868ae&units=metric`; 
    axios.get(apiUrl)
    .then(res => {
      let imagePath = '';
      if(res.data.weather[0].main == "Clouds"){
        imagePath = "/Images/cloud.png"
      } else if(res.data.weather[0].main == "Clear"){
        imagePath = "/Images/clear.png"
      } else if (res.data.weather[0].main == "Rain"){
        imagePath = "/Images/rain.png"
      } else if (res.data.weather[0].main == "Drizzle"){
        imagePath = "/Images/snow.png"
      } else if (res.data.weather[0].main == "Mist"){
        imagePath = "/Images/misting.png"
      } else {
        imagePath = "/Images/cloud.png"
      }
      console.log(res.data);
      setData({...data, celcius: res.data.main.temp, name: res.data.name, 
        humidity: res.data.main.humidity, speed: res.data.wind.speed, 
      image: imagePath })
      setError('');
    })
    .catch(err => {
      if(err.response.status == 404){
        setError("Invalid City Name")
      } else{
        setError('');
      }
      console.log(err)
    });
    }
  }

  return (
    <div>
      <div className="container ">
        <div className="weather">
          <div className="search">
            <input type="text" placeholder="Enter City Name" onChange={e =>setName(e.target.value)}/>
            <button>
              <img src="/Images/search.png" onClick={handleClick} alt="" />
            </button>
          </div>
          <div className="error">
            <p>{error}</p>
          </div>
          <div className="webinfo">
            <img src={data.image} alt="" />
            <h1>{Math.round(data.celcius)}°c</h1>
            <h2>{data.name}</h2>
            <div className="details">
              <div className="col">
                <img src="/Images/humidity.png" alt="" />
                <div className='humidity'>
                  <p>{Math.round(data.humidity)}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="col">
              <img src="/Images/mist.png" alt="" />
                <div className='wind'>
                  <p>{Math.round(data.speed)}Km/h</p>
                  <p>Wind</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
