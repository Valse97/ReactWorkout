import { WorkoutExercise } from "../interface/WorkoutInfo";
import { formatSeconds_letter } from "../utilities/time";

interface PrintExerciseProps {
  exercise: WorkoutExercise;
  isMain: boolean;
}

const PrintExercise: React.FC<PrintExerciseProps> = ({ exercise, isMain }) => {
  const list = exercise.exercises && exercise.exercises.length > 0 && (
    <ul className="standard-text">
      {exercise.exercises?.map((ex, i) => {
        return (
          <li key={i} style={{ fontSize: isMain ? 16 : 12 }}>
            {ex}
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <h4 className={`${isMain ? "text-3xl" : "text-xl"} standard-text`}>
        {exercise.name}{" "}
        {formatSeconds_letter(
          exercise.workSeconds > 0 ? exercise.workSeconds : exercise.restSeconds
        )}{" "}
        {exercise.times > 1 ? "x " + exercise.times : ""}
      </h4>
      {list}
    </>
  );
};
export default PrintExercise;
