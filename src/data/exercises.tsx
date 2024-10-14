import { WorkoutExercise } from "../interface/WorkoutInfo";

export const schedules = [
  {
    Name: "Sara - Giorno 1",
    Exercises: [
      {
        name: "Warm up",
        workSeconds: 60 * 5,
        restSeconds: 0,
        times: 1,
        exercises: ["Esercizi per riscaldarsi (polsi, spalle, gomiti)"],
      },
      {
        name: "Jump Squat +6kg",
        workSeconds: 60,
        restSeconds: 0,
        times: 10,
      },
      { name: "Rest", workSeconds: 0, restSeconds: 60 * 2, times: 1 },
      {
        name: "Jump Squat +6kg",
        workSeconds: 120,
        restSeconds: 0,
        times: 10,
        exercises: ["10rep - Squat +6kg", "5rep - Curl bicipiti +3kg", "5rep - Alzate laterali +3kg per braccio"],
      },
      { name: "Rest", workSeconds: 0, restSeconds: 60 * 2, times: 1 },
      {
        name: "Jump Squat +6kg",
        workSeconds: 120,
        restSeconds: 0,
        times: 10,
        exercises: ["4rep - HipDip +6kg per gamba", "20s - Plank", "10rep - Stacchi rumeni +6kg ed elastici"],
      },
    ]
  },{

    Name: "Davide - Lunedì",
    Exercises: [
      {
        name: "Planche Dream Machine",
        workSeconds: 15,
        restSeconds: 45,
        times: 5,
      },
      {
        name: "Warm up",
        workSeconds: 60 * 5,
        restSeconds: 0,
        times: 1,
        exercises: ["Esercizi per riscaldarsi (polsi, spalle, gomiti)"],
      },
      {
        name: "Superset",
        workSeconds: 60 * 2,
        restSeconds: 0,
        times: 10,
        exercises: ["Chinup 6rep", "Handstand Pushup to wall 4rep"],
      },
      { name: "Rest", workSeconds: 0, restSeconds: 60 * 5, times: 1 },

      { name: "Rest", workSeconds: 0, restSeconds: 60 * 5, times: 1 },
    ],
  },
  {
    Name: "Davide - Venerdì",
    Exercises: [
      {
        name: "Warm up",
        workSeconds: 60 * 5,
        restSeconds: 0,
        times: 1,
        exercises: ["Pushup, Pullup, Dip, Squat"],
      },
      {
        name: "Superset",
        workSeconds: 60 * 2,
        restSeconds: 0,
        times: 10,
        exercises: [
          "Pullup +10kg  3rep + 1 fronte/sbarra 3s",
          "Dip +10kg 6rep",
          "Squat +10kg 10rep",
          "Polpacci +10kg 10rep a gamba",
        ],
      },
      { name: "Rest", workSeconds: 0, restSeconds: 60 * 5, times: 1 },
      {
        name: "Superset",
        workSeconds: 80,
        restSeconds: 0,
        times: 8,
        exercises: [
          "Pushup +10Kg 8rep (1sec di blocco)",
          "Squat +10kg 12rep",
          "Pull parallele +10kg  6rep",
        ],
      },
      { name: "Rest", workSeconds: 0, restSeconds: 60 * 5, times: 1 },
      {
        name: "Superset",
        workSeconds: 60 * 1.2,
        restSeconds: 0,
        times: 8,
        exercises: [
          "Archer pushup 4rep xbraccio",
          "Diamond pushup 6rep",
          "Australian pullup anelli 8rep",
        ],
      },
      { name: "Rest", workSeconds: 0, restSeconds: 60 * 2, times: 1 },
      {
        name: "Muscle up anelli",
        workSeconds: 60 * 1,
        restSeconds: 0,
        times: 6,
      },
      { name: "Rest", workSeconds: 0, restSeconds: 60 * 3, times: 1 },
      {
        name: "Frontlever Dream Machine",
        workSeconds: 20,
        restSeconds: 40,
        times: 5,
      },
      { name: "Rest", workSeconds: 0, restSeconds: 60 * 2, times: 1 },
      {
        name: "Planche Dream Machine",
        workSeconds: 15,
        restSeconds: 45,
        times: 5,
      },
      { name: "Rest", workSeconds: 0, restSeconds: 60 * 3, times: 1 },
      {
        name: "Pullup x 6",
        workSeconds: 60 * 1,
        restSeconds: 0,
        times: 10,
      },
      { name: "Rest", workSeconds: 0, restSeconds: 60 * 1, times: 1 },
      {
        name: "Dip x 12",
        workSeconds: 20,
        restSeconds: 0,
        times: 10,
      },
    ],
  },
];
