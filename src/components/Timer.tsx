import React, { useEffect, useState, useRef } from "react";
import {
  WorkoutInfo,
  WorkoutExercise,
  WorkoutExerciseTime,
} from "../interface/WorkoutInfo";
import { formatSeconds } from "../utilities/time";
import useSound from "use-sound";
import timerSound from "../assets/audio/timer.mp3";
import Button from "./Button";

interface TimerProps {
  exerciseSet: WorkoutExerciseTime;
  onFinish: () => void;
}

const Timer: React.FC<TimerProps> = ({ exerciseSet, onFinish }) => {
  const [seconds, setSeconds] = useState<number>(exerciseSet.seconds);
  const [isInPause, setIsInPause] = useState(false);

  const [play] = useSound(timerSound);

  useEffect(() => {
    setSeconds(exerciseSet.seconds);
  }, [exerciseSet]);

  useEffect(() => {
    if (seconds <= 0) {
      onFinish();
      return;
    }

    if (seconds == 3) {
      play();
    }

    const timerId = setInterval(() => {
      if (!isInPause) {
        setSeconds((prevSeconds) => {
          return prevSeconds - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [seconds, isInPause]);

  const audioRef = useRef(null);

  function togglePlay() {
    setIsInPause((oldPause) => {
      return !oldPause;
    });
  }

  function nextWorkout() {
    if (isInPause) setIsInPause(false);
    onFinish();
  }

  return (
    <div>
      <audio ref={audioRef} src="/src/assets/audio/timer.mp3" preload="auto" />
      <p>{formatSeconds(seconds)}</p>

      <div className="ml-4">
        <Button onClick={togglePlay}>{isInPause ? "Play" : "Pause"}</Button>
      </div>

      <div className="ml-4 mt-4">
        <Button onClick={nextWorkout}>Skip</Button>
      </div>
    </div>
  );
};

export default Timer;
