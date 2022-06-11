import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";

type RL = readline.Interface;
type ReadCommand = (rl: RL) => (command: string) => void;

const readCommand: ReadCommand = (rl) => (command) => {
  if (command === "EXIT") {
    rl.close();
  }


  console.log(command)

  
};

const rl = readline.createInterface({ input, output });

console.log("Enter your command.");

rl.on("line", readCommand(rl));