export interface WorkoutInfo {
  isRunning?: boolean;
  isResting?: boolean;
  currentExerciseIndex: number;
  exercises: WorkoutExercise[];
  currentExerciseTimes?: WorkoutExerciseTime[];
  getExercise: (index: number) => WorkoutExercise;
  getCurrentExercise: () => WorkoutExercise;
  getPrevExercise: () => WorkoutExercise | null;
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

export interface Schedule {
  name: string;
  exercises: ScheduleExercise[];
}

export interface ScheduleExercise {
  name: string,
  workSeconds: number,
  restSeconds: number,
  times: number,
  exercises?: string[] | null;
}