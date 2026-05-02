import fs from 'node:fs';

export default class Task{

  get getAllTasks(){
    return JSON.parse(fs.readFileSync('tasks.json'));
  }
    
  taskProbs = ['number', 'level', 'description', 'deadline'];
  addTask ({description, deadline}) { 

    const allTasks = this.getAllTasks
    const taskExist = allTasks.find(task => task.description.toLowerCase() === description.toLowerCase()) 

    if (taskExist) return null;

    const newTask = {
      number: allTasks.length + 1,
      description, 
      deadline,
      level: 'uncompleted'
    };

    allTasks.push(newTask);

    fs.writeFileSync('tasks.json', JSON.stringify(allTasks));

    return {
      head: 'Task Added',
      body: [newTask]
    };
  }

  listTasks (argv) { 
    const allTasks = this.getAllTasks

    const criteria = this.taskProbs.filter(p => argv[p])

    if(criteria.length === 0) return {
      head: `Tasks`,
      found: true,
      body: allTasks,
      message: 'Tasks found'
    }; 
    
    const requestedTasks = allTasks.filter(t => criteria.every(p => t[p] === argv[p]));

    if(requestedTasks.length === 0) return {found: false, message: 'No task exist with the option value(s) you entered.'}
    
    return {
      head: `Tasks`,
      found: true,
      body: requestedTasks,
      message: 'Tasks found'
    }; 

  }

  updateTask ({property, newValue, ...rest}) { 
    const allTasks = this.getAllTasks;
    const criteria = this.taskProbs.filter(p => rest[p])
    
    if(criteria.length === 0) return null;
    
    const updatedTasks = allTasks.filter(t => criteria.every(p => t[p] === rest[p]));

    if(updatedTasks.length === 0) return {found: false, message: 'No task exist with the option value(s) you entered.'}

    updatedTasks.forEach(task => task[property] = newValue)

    updatedTasks.forEach(task => {
      let taskToUpdate = allTasks.find(t => t.number === task.number); 
      taskToUpdate = task;
    })

    fs.writeFileSync('tasks.json', JSON.stringify(allTasks));

    return {
      head: `Updated Task(s)`,
      found: true,
      body: updatedTasks,
      message: 'Tasks found'
    }; 

  }

  removeTask (argv) {
      const allTasks = this.getAllTasks

    const criteria = this.taskProbs.filter(p => argv[p])
    
    if(criteria.length === 0) return null;
    
    const removedTasks = allTasks.filter(t => criteria.every(p => t[p] === argv[p]));

    if(removedTasks.length === 0) return {found: false, message: 'No task exist with the option value(s) you entered.'}

    const newTasks = allTasks.filter(task => !removedTasks.includes(task));

    this.indexTasks(newTasks);

    fs.writeFileSync('tasks.json', JSON.stringify(newTasks));

    return {
      head: `Removed Task(s)`,
      found: true,
      body: removedTasks,
      message: 'Tasks found'
    }; 

  }
  indexTasks (tasks) {
    tasks.forEach((task, index) => {
      task.number = index + 1;
    });
  }

  logTask ({head, body}) {
    console.log(head);
    console.table(body);
  }

}

export const tasks = new Task();