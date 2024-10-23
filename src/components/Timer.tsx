import React, { useEffect, useState, useRef } from "react";
import {
  WorkoutInfo,
  WorkoutExercise,
  WorkoutExerciseTime,
} from "../interface/WorkoutInfo";
import { formatSeconds } from "../utilities/time";
import useSound from "use-sound";
import tickShortSound from "../assets/audio/tick-short.wav";
import tickLongSound from "../assets/audio/tick-long.wav";
import Button from "./Button";
import { IoPlayOutline, IoPauseOutline } from "react-icons/io5";

interface TimerProps {
  exerciseSet: WorkoutExerciseTime;
  handleFinish: () => void;
}

const Timer: React.FC<TimerProps> = ({ exerciseSet, handleFinish }) => {
  const [seconds, setSeconds] = useState<number>(exerciseSet.seconds);
  const [isInPause, setIsInPause] = useState(false);

  const [playShort] = useSound(tickShortSound);
  const [playLong] = useSound(tickLongSound);

  useEffect(() => {
    setSeconds(exerciseSet.seconds);
  }, [exerciseSet]);

  useEffect(() => {
    if (!exerciseSet.isWork && seconds === 10) {
      playShort();
      setTimeout(() => playShort(), 300);
    }

    if (seconds === 3 || seconds === 2 || seconds === 1) {
      playShort();
    } else if (seconds === 0) {
      playLong();
    }

    if (seconds <= 0) {
      handleFinish();
      return;
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

  return (
    <div className="text-center">
      <audio ref={audioRef} src="/src/assets/audio/timer.mp3" preload="auto" />
      <p className="text-9xl font-bold text-black dark:text-white">
        {formatSeconds(seconds)}
      </p>

      <div className="">
        <Button onClick={togglePlay}>
          {isInPause ? (
            <IoPlayOutline size="80" />
          ) : (
            <IoPauseOutline size="80" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Timer;
