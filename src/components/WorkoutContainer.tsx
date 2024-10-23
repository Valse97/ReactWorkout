import { useState } from "react";
import {
  IoPlayOutline,
  IoPauseOutline,
  IoPlayBackOutline,
  IoPlaySkipBackOutline,
  IoPlaySkipForwardOutline,
  IoPlayForwardOutline,
} from "react-icons/io5";
import Timer from "./Timer";
import {
  WorkoutInfo,
  WorkoutExercise,
  WorkoutExerciseTime,
} from "../interface/WorkoutInfo";
import PrintExercise from "./PrintExercise";
import Button from "./Button";
import useSound from "use-sound";
import tickShortSound from "../assets/audio/tick-short.wav";
import tickLongSound from "../assets/audio/tick-long.wav";

interface WorkoutContainerProps {
  schedule: WorkoutExercise[];
}

const iconSize = 50;

const _workoutInfo: WorkoutInfo = {
  currentExerciseIndex: 0,
  currentExercise: null,
  currentExerciseTimes: [],
  exercises: [],
  getExercise(index: number) {
    return this.exercises[index];
  },
  getPrevExercise() {
    return this.currentExerciseIndex > 0
      ? this.getExercise(this.currentExerciseIndex - 1)
      : null;
  },
  getNextExercise() {
    return this.exercises.length > this.currentExerciseIndex
      ? this.getExercise(this.currentExerciseIndex + 1)
      : null;
  },
  getCurrentExercise() {
    return this.getExercise(this.currentExerciseIndex);
  },
  getExerciseTimes(exercise: WorkoutExercise) {
    let timeSet: WorkoutExerciseTime[] = [];
    for (let i = 0; i < exercise.times; i++) {
      if (exercise.workSeconds > 0)
        timeSet.push({
          seconds: exercise.workSeconds,
          done: false,
          isWork: true,
        } as WorkoutExerciseTime);
      if (
        exercise.restSeconds > 0 &&
        (exercise.workSeconds == 0 || i < exercise.times - 1)
      )
        timeSet.push({
          seconds: exercise.restSeconds,
          done: false,
          isWork: false,
        } as WorkoutExerciseTime);
    }

    return timeSet;
  },
};

const WorkoutContainer = ({ schedule }: WorkoutContainerProps) => {
  _workoutInfo.exercises = schedule;
  const [workoutInfo, setWorkoutInfo] = useState<WorkoutInfo>(_workoutInfo);

  const prevExercise = workoutInfo.getPrevExercise();
  const nextExercise = workoutInfo.getNextExercise();
  const currentExerciseSet = workoutInfo.currentExerciseTimes?.find(
    (x) => !x.done
  );

  const [playShort] = useSound(tickShortSound);
  const [playLong] = useSound(tickLongSound);

  function startWorkout() {
    setWorkoutInfo((prevWorkoutInfo) => ({
      ...prevWorkoutInfo,
      isRunning: true,
      currentExercise: prevWorkoutInfo.getCurrentExercise(),
      currentExerciseTimes: prevWorkoutInfo.getExerciseTimes(
        prevWorkoutInfo.getCurrentExercise()
      ),
    }));
  }

  function prevWorkout() {
    if (prevExercise != null) {
      setWorkoutInfo((prevWorkoutInfo) => ({
        ...prevWorkoutInfo,
        currentExerciseIndex: prevWorkoutInfo.currentExerciseIndex - 1,
        currentExercise: prevWorkoutInfo.getPrevExercise(),
        currentExerciseTimes: prevWorkoutInfo.getExerciseTimes(
          prevWorkoutInfo.getPrevExercise() as WorkoutExercise
        ),
      }));
    } else {
    }
  }
  function nextWorkout() {
    if (nextExercise != null) {
      setWorkoutInfo((prevWorkoutInfo) => ({
        ...prevWorkoutInfo,
        currentExerciseIndex: prevWorkoutInfo.currentExerciseIndex + 1,
        currentExercise: prevWorkoutInfo.getNextExercise(),
        currentExerciseTimes: prevWorkoutInfo.getExerciseTimes(
          prevWorkoutInfo.getNextExercise() as WorkoutExercise
        ),
      }));
    } else {
      console.log("Workout finished!");
    }
  }
  function handleFinish() {
    skip(false);
  }
  function skip(skipAll: boolean) {
    var newSet = [
      ...(workoutInfo.currentExerciseTimes as WorkoutExerciseTime[]),
    ];
    if (!skipAll) {
      var taskToUpdate = newSet.find((x) => !x.done);
      if (taskToUpdate) {
        taskToUpdate.done = true;
      }
    } else {
      newSet.forEach((x) => {
        x.done = true;
      });
    }

    if (newSet.filter((x) => !x.done).length === 0) {
      console.log("Exercise finished!");
      nextWorkout();
    } else {
      setWorkoutInfo((prevWorkoutInfo) => ({
        ...prevWorkoutInfo,
        currentExerciseTimes: newSet,
      }));
    }
  }
  function prev(prevAll: boolean) {
    var newSet = [
      ...(workoutInfo.currentExerciseTimes as WorkoutExerciseTime[]),
    ];
    if (!prevAll) {
      newSet.reverse();
      var taskToUpdate = newSet.find((x) => x.done);
      newSet.reverse();
      if (taskToUpdate) {
        taskToUpdate.done = false;
      }
    } else {
      newSet.forEach((x) => {
        x.done = false;
      });
    }

    if (newSet.filter((x) => x.done).length === 0) {
      prevWorkout();
    } else {
      setWorkoutInfo((prevWorkoutInfo) => ({
        ...prevWorkoutInfo,
        currentExerciseTimes: newSet,
      }));
    }
  }

  let nextExerciseTag = <></>;
  if (nextExercise != null) {
    nextExerciseTag = (
      <>
        <h3 className="standard-text">Next:</h3>
        <PrintExercise
          exercise={nextExercise as WorkoutExercise}
          isMain={false}
        />
      </>
    );
  }

  return (
    <div
      className={`flex h-screen w-screen text-center ${
        currentExerciseSet !== undefined
          ? !currentExerciseSet?.isWork
            ? "bg-cyan-300 dark:bg-blue-950"
            : "bg-green-300 dark:bg-green-800"
          : "bg-orange-500"
      }`}
      // style={{
      //   backgroundColor: background,
      //   position: "absolute",
      //   height: "100%",
      //   width: "100%",
      // }}
    >
      <div className="m-auto">
        {!workoutInfo.isRunning ? (
          <>
            <Button onClick={startWorkout}>
              {<IoPlayOutline size="200" />}
            </Button>
          </>
        ) : (
          <>
            {workoutInfo.currentExerciseTimes?.length &&
              workoutInfo.currentExerciseTimes?.length > 1 && (
                <p className="standard-text">
                  {
                    workoutInfo.currentExerciseTimes?.filter(
                      (x) => !x.done && x.isWork
                    ).length
                  }{" "}
                  Remaining
                </p>
              )}
            <PrintExercise
              exercise={workoutInfo.currentExercise as WorkoutExercise}
              isMain={true}
            />

            <Timer
            playShort={playShort}
            playLong={playLong}
              handleFinish={handleFinish}
              exerciseSet={currentExerciseSet as WorkoutExerciseTime}
            />

            <div className="ml-4 mt-4">
              <Button
                onClick={() => {
                  prev(true);
                }}
              >
                <IoPlayBackOutline size={iconSize} />
              </Button>
              <Button
                onClick={() => {
                  prev(false);
                }}
              >
                <IoPlaySkipBackOutline size={iconSize} />
              </Button>
              <Button
                onClick={() => {
                  skip(false);
                }}
              >
                <IoPlaySkipForwardOutline size={iconSize} />
              </Button>
              <Button
                onClick={() => {
                  skip(true);
                }}
              >
                <IoPlayForwardOutline size={iconSize} />
              </Button>
            </div>

            {nextExerciseTag}
          </>
        )}
      </div>
    </div>
  );
};

export default WorkoutContainer;
