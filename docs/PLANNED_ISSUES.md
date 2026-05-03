# Planned GitHub Issues

Use these as starter issues for improving the project professionally.

## 1. Add automated tests for task operations

Labels: `enhancement`, `testing`

### Description

Add tests for the core task operations in `commands.js` and `run-command.js`.

### Why

Tests will make the project easier to maintain and show that the task manager behavior is verified, not only manually checked.

### Acceptance Criteria

- [ ] Tests cover adding a task.
- [ ] Tests cover preventing duplicate task descriptions.
- [ ] Tests cover listing all tasks.
- [ ] Tests cover filtering tasks.
- [ ] Tests cover updating tasks.
- [ ] Tests cover removing tasks.
- [ ] Tests use a temporary task file instead of overwriting real user data.

## 2. Support non-interactive CLI commands

Labels: `enhancement`

### Description

Allow commands to run directly from the terminal without entering the interactive prompt.

### Example

```bash
node manager.js add -d "Finish assignment" --dl "01/01/2026"
node manager.js list
node manager.js update -n 1 -p level --nv completed
node manager.js remove -n 1
```

### Why

This makes the app more useful for scripting and closer to how professional CLI tools usually work.

### Acceptance Criteria

- [ ] `node manager.js` still opens the interactive prompt.
- [ ] `node manager.js add ...` runs a command directly and exits.
- [ ] `node manager.js list` runs directly and exits.
- [ ] Invalid commands still show useful feedback.
- [ ] README examples are updated.

## 3. Improve update validation

Labels: `bug`, `enhancement`

### Description

The update command currently restricts every `newValue` to `completed` or `uncompleted`. That restriction should only apply when updating the `level` property.

### Why

Users should be able to update descriptions, deadlines, and numbers with valid values for those fields.

### Acceptance Criteria

- [ ] Updating `level` only accepts `completed` or `uncompleted`.
- [ ] Updating `deadline` validates the `dd/mm/yyyy` format.
- [ ] Updating `description` accepts normal task text.
- [ ] Invalid values show clear error messages.

## 4. Format tasks.json for readability

Labels: `enhancement`

### Description

Write `tasks.json` with indentation instead of one-line JSON.

### Why

Readable JSON makes it easier to inspect and debug stored tasks.

### Acceptance Criteria

- [ ] New tasks are saved with pretty-printed JSON.
- [ ] Updates preserve readable formatting.
- [ ] Removes preserve readable formatting.

## 5. Add a clear command

Labels: `enhancement`

### Description

Add a command to remove all tasks from `tasks.json`.

### Example

```bash
clear
```

### Why

Users may want to reset their task list without manually editing `tasks.json`.

### Acceptance Criteria

- [ ] `clear` empties the task list.
- [ ] The command asks for confirmation before deleting all tasks.
- [ ] README documents the new command.
