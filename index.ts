import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import database from "./in-memory-database";
import { BeginCommand, CommitCommand, GetCommand, NumEqualToCommand, RollbackCommand, SetCommand, UnsetCommand } from "./commands";

type RL = readline.Interface;
type ReadCommand = (rl: RL) => (command: string) => void;

const readCommand: ReadCommand = (rl) => (command) => {
  if (command === "END") {
    rl.close();
  }

  database.execute(new BeginCommand())
  database.execute(new SetCommand('x','10'))
  console.log(database.execute(new GetCommand('x')))
  database.execute(new UnsetCommand('x'))
  console.log(database.execute(new GetCommand('x')))

  console.log("-----------")
  
  database.execute(new SetCommand('a','10'))
  database.execute(new SetCommand('b','10'))
  console.log(database.execute(new NumEqualToCommand('10')))
  console.log(database.execute(new NumEqualToCommand('20')))
  database.execute(new SetCommand('b','30'))
  console.log(database.execute(new NumEqualToCommand('10')))
  
  console.log("-----------")
  
  database.execute(new BeginCommand())
  database.execute(new SetCommand('a','10'))
  console.log(database.execute(new GetCommand('a')))
  database.execute(new BeginCommand())
  database.execute(new SetCommand('a','20'))
  console.log(database.execute(new GetCommand('a')))
  database.execute(new RollbackCommand())
  console.log(database.execute(new GetCommand('a')))
  database.execute(new RollbackCommand())
  console.log(database.execute(new GetCommand('a')))

  console.log("-----------")

  try {
    database.execute(new BeginCommand())
    database.execute(new SetCommand('a','30'))
    database.execute(new BeginCommand())
    database.execute(new SetCommand('a','40'))
    database.execute(new CommitCommand())
    console.log(database.execute(new GetCommand('a')))
    database.execute(new RollbackCommand())
  } catch (error) {
    console.log(error)
  }
  
  console.log("-----------")

  
};

const rl = readline.createInterface({ input, output });

console.log("Enter your command.");

rl.on("line", readCommand(rl));