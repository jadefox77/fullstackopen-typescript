export const calculateBmi = (
  heightCm: number,
  weightKg: number
): string => {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  if (bmi < 18.5) {
    return "Underweight";
  }

  if (bmi < 25) {
    return "Normal range";
  }

  if (bmi < 30) {
    return "Overweight";
  }

  return "Obese";
};

const parseArguments = (args: string[]) => {
  if (args.length !== 2) {
    throw new Error("Wrong number of arguments");
  }

  const height = Number(args[0]);
  const weight = Number(args[1]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Arguments must be numbers");
  }

  return { height, weight };
};

if (process.argv[1] === "bmiCalculator.ts") {
  try {
    const { height, weight } = parseArguments(
      process.argv.slice(2)
    );

    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let message = "Something went wrong";

    if (error instanceof Error) {
      message += `: ${error.message}`;
    }

    console.log(message);
  }
}