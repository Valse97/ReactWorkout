export interface WorkoutInfo {
  isRunning?: boolean;
  isResting?: boolean;
  currentExerciseIndex: number;
  exercises: WorkoutExercise[];
  currentExerciseTimes?: WorkoutExerciseTime[];
  getExercise: (index: number) => WorkoutExercise;
  getCurrentExercise: () => WorkoutExercise;
  getNextExercise: () => WorkoutExercise | null;
  getExerciseTimes: (exercise: WorkoutExercise) => WorkoutExerciseTime[];
  currentExercise: WorkoutExercise | null;
}

export interface WorkoutExercise {
  times: number;
  name: string;
  workSeconds: number;
  restSeconds: number;
  exercises?: string[] | null;
}

export interface WorkoutExerciseTime {
  seconds: number;
  isWork: boolean;
  done: boolean;
}
