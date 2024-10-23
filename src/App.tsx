import React, { useEffect } from "react";
import logo from "./logo.svg";
import WorkoutContainer from "./components/WorkoutContainer";
import { schedules } from "./data/exercises";
import { Schedule, WorkoutExercise } from "./interface/WorkoutInfo";
import Button from "./components/Button";
import styled from "styled-components";
import { formatSeconds_letter } from "./utilities/time";
import useDarkMode from "./hooks/useDarkMode";
import { FaMoon, FaSun } from "react-icons/fa";

const H1 = styled.label``;

function getTotalSeconds(schedule: Schedule): number {
  let totalSeconds = 0;
  schedule.exercises.forEach((exercise) => {
    totalSeconds +=
      exercise.workSeconds * exercise.times +
      exercise.restSeconds * (exercise.times - 1);
  });
  return totalSeconds; // in seconds, e.g., 3600 seconds = 1 hour.
}

const ThemeIcon: React.FC<{ className: string }> = ({ className }) => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <span className={className} onClick={handleMode}>
      {darkTheme ? <FaSun size="24" /> : <FaMoon size="24" />}
    </span>
  );
};

function App() {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);

  useEffect(() => {
    // Prompt confirmation when reload page is triggered
    window.onbeforeunload = () => {
      return "";
    };

    // Unmount the window.onbeforeunload event
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const [exercises, setExercises] = React.useState<WorkoutExercise[]>([]);
  return (
    <>
      <ThemeIcon className={"fixed standard-text"} />
      <div className="flex top-0 left-0 h-screen w-screen bg-gray-100 dark:bg-gray-800">
        {!exercises.length ? (
          <div className="m-auto">
            <h1 className="text-4xl mb-3 font-bold text-center standard-text">
              My Workout App
            </h1>
            <p className="mb-3 text-center standard-text">v. 1.3</p>
            <div className="">
              {schedules.map((schedule, index) => (
                <div key={index} className="text-center">
                  <Button
                    className="text-2xl mb-2"
                    key={index}
                    active={true}
                    onClick={() => {
                      setExercises(schedule.exercises);
                    }}
                  >
                    {schedule.name +
                      " - " +
                      formatSeconds_letter(getTotalSeconds(schedule))}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <WorkoutContainer schedule={exercises} />
        )}
      </div>
    </>
  );
}

export default App;
