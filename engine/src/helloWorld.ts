export const helloWorld = (exp: string, act: string): void => {
  const test = [exp, act].join(" / ");

  FileMaker.PerformScript("Perform JavaScript Result", test);
};
