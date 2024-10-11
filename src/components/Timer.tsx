import React, { useEffect, useState, useRef  } from "react";
import { WorkoutInfo, WorkoutExercise, WorkoutExerciseTime } from "../interface/WorkoutInfo";
import { formatSeconds } from "../utilities/time";
import useSound from 'use-sound';
import timerSound from '../assets/audio/timer.mp3';

interface TimerProps {
  exerciseSet: WorkoutExerciseTime;
  onFinish: () => void;
}

const Timer: React.FC<TimerProps> = ({ exerciseSet, onFinish }) => {
  const [seconds, setSeconds] = useState(exerciseSet.seconds);

  const [play] = useSound(timerSound);

  useEffect(() => {
    setSeconds(exerciseSet.seconds);
  }, [exerciseSet]);

  useEffect(() => {
    if (seconds <= 0) {
      onFinish();
      return;
    }

    if(seconds == 3){
      play();
    }

    const timerId = setInterval(() => {
      setSeconds((prevSeconds) => {
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [seconds]);

  const audioRef = useRef(null);

  return (
    <div>
      <audio ref={audioRef} src="/src/assets/audio/timer.mp3" preload="auto" />
      <p>{formatSeconds(seconds)}</p>
    </div>
  );
};

export default Timer;
