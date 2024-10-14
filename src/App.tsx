import React from "react";
import logo from "./logo.svg";
import "./App.css";
import WorkoutContainer from "./components/WorkoutContainer";
import { schedules } from "./data/exercises";
import { WorkoutExercise } from "./interface/WorkoutInfo";
import Button from "./components/Button";
import styled from "styled-components";

const H1 = styled.label`
`;

function App() {
  const [exercises, setExercises] = React.useState<WorkoutExercise[]>([]);
  return (
    <div className="App">
      {!exercises.length ?
      <header className="App-header">
        <h1 className="text-3xl font-bold">My Workout App</h1>
        {schedules.map((schedule, index) => (<Button active={true} onClick={()=> {setExercises(schedule.Exercises)}}>{schedule.Name}</Button>))}
      </header>
      : 
      <WorkoutContainer schedule={exercises} />
}
    </div>
  );
}

export default App;
