import {tasks} from './commands.js'
import fs from 'node:fs';
export default function runCommand (argv) {
if(!fs.existsSync('./tasks.json')) {
  fs.writeFileSync('./tasks.json', JSON.stringify([]));
}

  if(argv._[0] !== 'add' && argv._[0] !== 'a' && tasks.getAllTasks.length === 0 ) return console.log('No task\nUse "add" or "a" to add a task');
  
  for (const [key, value] of Object.entries(argv)) {
    if(key === '_') continue;
    if(Array.isArray(value)) {
      console.log(`Option entered more than once: "${key}"\nPlease enter options only once.`);
      return;
    }
  }
  
  switch (argv._[0]) {
    case 'add':
    case 'a':
      if(!/^\d{2}\/\d{2}\/\d{4}$/.test(argv.deadline)){
        console.log('Please enter a proper date for the deadline(day/month/year)\nFor example: 01/01/2026');
        break
      }
      const task = tasks.addTask(argv);
      if(task) {
        tasks.logTask(task);
      } else {
        console.log('Task already exists.');
      }
      break;

    case 'list':
    case 'ls':
      const requestedTasks = tasks.listTasks(argv);
      
      if(requestedTasks.found) {
        tasks.logTask(requestedTasks);
      } else {
        console.log(requestedTasks.message);
      }
      break;
    
    case 'remove':
    case 'rem':
      const removedTask = tasks.removeTask(argv);
      removedTask.found ? tasks.logTask(removedTask) : console.log(removedTask.message);
      ;
      break;

    case 'update':
    case 'u':
      if(argv.newValue && !['completed', 'uncompleted'].includes(argv.newValue)) {
        console.log('!Invalid value\nThe level can only be "completed" or "uncompleted"');
        break;
      }
      const updatedTask = tasks.updateTask(argv);
      updatedTask.found ? tasks.logTask(updatedTask) : console.log(updatedTask.message);
      break;

    default:
    console.log('Command not recognized')
  }
}
