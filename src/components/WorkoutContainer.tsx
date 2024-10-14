import { useState } from "react";
import Timer from "./Timer";
import {
  WorkoutInfo,
  WorkoutExercise,
  WorkoutExerciseTime,
} from "../interface/WorkoutInfo";
import PrintExercise from "./PrintExercise";
import Button from "./Button";

interface WorkoutContainerProps {
  schedule: WorkoutExercise[];
}

const _workoutInfo: WorkoutInfo = {
  currentExerciseIndex: 0,
  currentExercise: null,
  currentExerciseTimes: [],
  exercises: [],
  getExercise(index: number) {
    return this.exercises[index];
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
      if (exercise.restSeconds > 0)
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

  const nextExercise = workoutInfo.getNextExercise();
  const currentExerciseSet = workoutInfo.currentExerciseTimes?.find(
    (x) => !x.done
  );
  const background =
    currentExerciseSet !== undefined
      ? !currentExerciseSet?.isWork
        ? "cyan"
        : "lightgreen"
      : "orange";

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
  function changeTimer(isWork: boolean) {
    console.log("changeTimer");
    setWorkoutInfo({
      ...workoutInfo,
      isResting: !isWork,
    });
  }
  function onFinish() {
    var newSet = [
      ...(workoutInfo.currentExerciseTimes as WorkoutExerciseTime[]),
    ];
    var taskToUpdate = newSet.find((x) => !x.done);
    if (taskToUpdate) {
      taskToUpdate.done = true;
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

  let nextExerciseTag = <></>;
  if (nextExercise != null) {
    nextExerciseTag = (
      <>
        <h3>Next:</h3>
        <PrintExercise
          exercise={nextExercise as WorkoutExercise}
          isMain={false}
        />
      </>
    );
  }

  return (
    <div
      style={{
        backgroundColor: background,
        position: "absolute",
        height: "100%",
        width: "100%",
      }}
    >
      {!workoutInfo.isRunning ? (
        <>
          <Button onClick={startWorkout}>Start</Button>
        </>
      ) : (
        <>
          {workoutInfo.currentExerciseTimes?.length &&
            workoutInfo.currentExerciseTimes?.length > 1 && (
              <p>
                {
                  workoutInfo.currentExerciseTimes?.filter(
                    (x) => !x.done && x.isWork
                  ).length
                }{" "}
                Remaining
              </p>
            )}
          <Timer
            onFinish={onFinish}
            exerciseSet={currentExerciseSet as WorkoutExerciseTime}
          />
          <PrintExercise
            exercise={workoutInfo.currentExercise as WorkoutExercise}
            isMain={true}
          />
          {nextExerciseTag}
        </>
      )}
    </div>
  );
};

export default WorkoutContainer;
