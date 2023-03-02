import React, { useState } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import Map from "./components/Map";
import Table from "./components/Table";
import DistrictPlanSelector from "./components/DistrictPlanSelector";
import District from "./components/District";

const App = () => {
  const [currentState, setCurrentState] = useState("");
  const [currentDistrict, setCurrentDistrict] = useState(null);
  const [showIncumbents, setShowIncumbents] = useState(false);

  const districtPlans = {
    2022: "2022",
    2020: "2020",
    random: "random",
  };

  const [selectedPlan, setSelectedPlan] = useState(districtPlans[2022]);

  let imag = "";
  let seats = "";
  let count = 0;
  if (currentState === "florida") {
    imag = "https://media.discordapp.net/attachments/1080353490171346954/1080779222857031751/florida.png";
    seats = "https://cdn.discordapp.com/attachments/1080353490171346954/1080772506782269552/image.png";
    count = 23;
  }
  if (currentState === "georgia") {
    imag = "https://media.discordapp.net/attachments/1080353490171346954/1080779222617948160/georgia.png";
    seats = "https://cdn.discordapp.com/attachments/1080353490171346954/1080774201578885200/image.png";
    count = 13;
  }
  if (currentState === "pennsylvania") {
    imag = "https://media.discordapp.net/attachments/1080353490171346954/1080779222425018409/pennsylvania.png";
    seats = "https://cdn.discordapp.com/attachments/1080353490171346954/1080773577260937266/image.png";
    count = 16;
  }
  return (
    <div className="App">
      <Map
        currentState={currentState}
        setCurrentState={setCurrentState}
        currentDistrict={currentDistrict}
        setCurrentDistrict={setCurrentDistrict}
        selectedPlan={selectedPlan}
        showIncumbents={showIncumbents}
        setShowIncumbents={setShowIncumbents}
      />
      <DistrictPlanSelector
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
        districtPlans={districtPlans}
      />
      <div className="data">
        {currentState && (
          <Table
            currentState={currentState}
            setCurrentState={setCurrentState}
          />
        )}
        {currentDistrict && (
          <District
            currentState={currentState}
            currentDistrict={currentDistrict}
          />
        )}
        {currentState && (
        <div className="ensemble"> 
          <h3>Ensemble Information & Prediction</h3>
          <strong>Number of District Plans: </strong> 10000 <br />
          <strong>Number of Incumbents: </strong> {count} <br />
          <strong>Number of Incumbents Predicted to Win: </strong> {count - 1} <br/>
          <img src={imag} alt="Ensemble Box and Whiskers"/> <br/>
          <img src={seats} alt="Open Seats"/> <br/>
        </div>)}
      </div>
    </div>
  );
};

export default App;
