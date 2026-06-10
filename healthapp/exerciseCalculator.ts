export interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyHours: number[],
  target: number
): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(h => h > 0).length;
  const total = dailyHours.reduce((a, b) => a + b, 0);
  const average = total / periodLength;

  const success = average >= target;

  let rating: 1 | 2 | 3;
  let ratingDescription: string;

  const ratio = average / target;

  if (ratio >= 1) {
    rating = 3;
    ratingDescription = "excellent";
  } else if (ratio >= 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "you need to train more";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};