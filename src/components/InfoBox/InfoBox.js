import "./InfoBox.css";
import axios from "axios";
import { useState, useEffect } from "react";

// import from Material-UI
import TextField from '@mui/material/TextField';

export function InfoBox() {

  // useState
  const [Info, setInfo] = useState(null);
  const [url, setUrl] = useState("http://localhost:8000/appInfo");
  const [refreshTime, setRefreshTime] = useState(null);

  // useEffect
  // GET request to "/appInfo" 
  useEffect(() => {
    axios.get(url)
    .then(({data}) => {
      setInfo(data);
      setRefreshTime(data[0].refreshTime)
    })
  }, [url])

  // track the data fetching process
  // useEffect(() => {
  //   console.log(Info);
  //   console.log(refreshTime)
  // }, [Info, refreshTime])

  
  // function expressions
  const handleRefreshTimeChange = e => setRefreshTime(e.target.value);

  return (
    <div className="InfoBox">
      <h1 className="title">DashBoard</h1>
      <section className="Boxes">
        {
          Info && Info.map(box => (
            <div className="box" key={box.id} style={box.status === 'UP' ? {backgroundColor: "rgba(21,122,48,0.3)"} : {backgroundColor: "tomato"}}>
              <section className="top">
                <p>{box.appName}</p>
                {box.status === 'UP' ? <img width="24" height="24" src="https://img.icons8.com/emoji/48/green-circle-emoji.png" alt="green-circle-emoji"/> : <img width="24" height="24" src="https://img.icons8.com/emoji/48/red-circle-emoji.png" alt="red-circle-emoji"/>}
              </section>
              <section className="content">
                <h4>Error name: <span>{box.errorCode === '' ? "N/A" : box.errorCode}</span></h4>
                <h4>Start time: <span>{box.startTime}</span></h4>
                <h4>CF API: <a href={box.cfApi} target="_blank">{box.cfApi}</a></h4>
                <h4>Space name: <span>{box.spaceName}</span></h4>
                <label className="refresh">
                  <TextField 
                      id="standard-basic" 
                      label="Refresh time" 
                      variant="standard" 
                      value={refreshTime} 
                      onChange={handleRefreshTimeChange}
                      color="secondary"
                      />
                </label>
              </section>
            </div>
          ))
        }
      </section>
    </div>
  )
}