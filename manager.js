#!/usr/bin/env node
import readline from "node:readline";
import yargs from 'yargs';
import runCommand from './run-command.js';
import { log } from "node:console";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let description;
let deadline;

const level = {
  describe: 'completed, uncompleted',
  alias: 'l'
}

const number = {
  describe: 'Task number',
  alias: 'n'
}

const property = {
  describe: 'Description, Level, deadline or number',
  demand: true,
  alias: 'p'
}

const newValue = {
  describe: 'new description, completed, uncompleted or deadline',
  demand: true,
  alias: 'nv'
}

let argv;

function formatCommand(input) {
  argv = yargs(input)
    .exitProcess(false)
    .command({
      command: 'add',
      aliases: ['a'],
      describe: 'Add new task',
      builder: {
        description,
        deadline
      }
    })

    .command({
      command: 'list',
      aliases: ['ls'],
      describe: 'List task(s)',
      builder: {
        description,
        deadline,
        number,
        level
      }
    })

    .command({
      command: 'update',
      describe: 'Update task(s)',
      aliases: ['u'],
      builder: {
        description,
        deadline,
        number,
        level,
        property,
        newValue
      }
    })

    .command({
      command: 'remove',
      describe: 'Remove task(s)',
      aliases: ['rem'],
      builder: {
        description,
        deadline,
        number,
        level
      }
    })

    .help()
    .argv;
}

function execute(input) {
  formatCommand(input);
  if (argv._.includes('h') || argv._.includes('help')) return;
  runCommand(argv)
}

function main () {
  log('\n                 WELCOME TO YOUR TASK MANAGER\n');
  formatCommand(['help']);
  log('\nEnter exit or e to leave task manager\n');
  
  rl.setPrompt('Enter a command> ')
  rl.prompt();

  rl.on('line', (input) => {
    
    if (input.trim().toLocaleLowerCase() === 'exit' || input.trim().toLocaleLowerCase() === 'e') {
      log('Exiting...');
      setTimeout(() => process.exit(), 500)
      return;
    }

    if(input.trim().toLocaleLowerCase().startsWith('a') || input.trim().toLocaleLowerCase().startsWith('add')) {
      description = {
        describe: 'Task description',
        demand: true,
        alias: 'd'
      }

      deadline = {
        describe: 'Task deadline(day/month/year',
        demand: true,
        alias: 'dl'
      }
    } else {
      description = {
        describe: 'Task description',
        alias: 'd'
      }

      deadline = {
        describe: 'Task deadline',
        alias: 'dl'
      }
    }
    
    try {
      execute(input.trim());
      log('');
      rl.prompt();
    } catch(e) {
      log(e.message);
      log('');
      rl.prompt();
    }

  })
}

  main()