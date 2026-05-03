# Release Notes

## v1.0.0

Initial release of the Task Manager CLI.

### Included

- Interactive command-line task manager.
- Add tasks with descriptions and deadlines.
- List all tasks or filter by number, description, deadline, or level.
- Update matching tasks.
- Remove matching tasks.
- Local JSON storage through `tasks.json`.
- Build script using esbuild.
- Packaging configuration for Linux, macOS, and Windows executables.

### Assets

The packaged executables are generated in:

```text
build/NodeLib
```

Expected files:

- `TASK MANAGER-linux`
- `TASK MANAGER-macos`
- `TASK MANAGER-win.exe`
