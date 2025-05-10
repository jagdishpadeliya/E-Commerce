console.log("Hello from the server!");

const sum = (a: number, b: number): number => {
  return a + b;
};

const result = sum(5, 10);
console.log(`The sum of 5 and 10 is: ${result}`);

export default sum;
