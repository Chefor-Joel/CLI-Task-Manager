# Task Manager CLI

A simple interactive command-line task manager built with Node.js. It lets you add, list, update, and remove tasks from a local `tasks.json` file.

## Features

- Add tasks with a description and deadline.
- List all tasks or filter by task number, description, deadline, or level.
- Mark tasks as completed or uncompleted.
- Remove tasks by matching task details.
- Stores tasks locally in JSON.
- Can be bundled and packaged into standalone executables.

## Requirements

- Node.js 18 or newer
- pnpm

## Installation

Install the project dependencies:

```bash
pnpm install
```

## Usage

Start the interactive task manager:

```bash
node manager.js
```

You will see a prompt like this:

```text
Enter a command>
```

Type `exit` or `e` to leave the task manager.

## Commands

### Add a task

```bash
add --description "Finish assignment" --deadline "01/01/2026"
```

Alias:

```bash
a -d "Finish assignment" --dl "01/01/2026"
```

Deadlines must use this format:

```text
dd/mm/yyyy
```

### List tasks

List all tasks:

```bash
list
```

Alias:

```bash
ls
```

Filter tasks:

```bash
list --level completed
list --number 1
list --deadline "01/01/2026"
list --description "Finish assignment"
```

### Update a task

Update matching tasks by passing the task criteria, the property to update, and the new value.

```bash
update --number 1 --property level --newValue completed
```

Alias:

```bash
u -n 1 -p level --nv completed
```

Task levels can be:

```text
completed
uncompleted
```

### Remove a task

```bash
remove --number 1
```

Alias:

```bash
rem -n 1
```

You can also remove tasks by other matching fields:

```bash
remove --level completed
remove --deadline "01/01/2026"
```

## Task Data

Tasks are saved in `tasks.json` as an array of objects:

```json
[
  {
    "number": 1,
    "description": "Finish assignment",
    "deadline": "01/01/2026",
    "level": "uncompleted"
  }
]
```

## Build

Bundle the CLI with esbuild:

```bash
pnpm run build
```

The bundled file is created at:

```text
build/lib/manager.js
```

## Package Executables

Create standalone executables with `pkg`:

```bash
pnpm run pkg
```

Executables are written to:

```text
build/NodeLib
```

The package configuration currently targets Linux, macOS, and Windows.

## Project Structure

```text
.
|-- commands.js       # Task class and task storage methods
|-- manager.js        # Interactive CLI entry point
|-- run-command.js    # Command routing and validation
|-- tasks.json        # Local task storage
|-- package.json      # Scripts, dependencies, and package config
|-- build/            # Generated build output
```

## License

ISC
