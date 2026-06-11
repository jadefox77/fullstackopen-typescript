import express from "express";
import type { Request, Response } from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Server is running");
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req: Request, res: Response) => {
  const { height, weight } = req.query;

  if (
    typeof height !== "string" ||
    typeof weight !== "string"
  ) {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }

  const parsedHeight = Number(height);
  const parsedWeight = Number(weight);

  if (
    isNaN(parsedHeight) ||
    isNaN(parsedWeight)
  ) {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }

  return res.json({
    weight: parsedWeight,
    height: parsedHeight,
    bmi: calculateBmi(parsedHeight, parsedWeight)
  });
});



app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({
      error: "parameters missing"
    });
  }

  if (
    !Array.isArray(daily_exercises) ||
    isNaN(Number(target))
  ) {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }

  const parsedExercises = daily_exercises.map(Number);

if (parsedExercises.some(isNaN)) {
  return res.status(400).json({
    error: "malformatted parameters"
  });
}
   

  return res.json(
    calculateExercises(
      parsedExercises,
      Number(target)
    )
  );
});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});