## v1.0.0-alpha001

Finally at a point of deploying something that can actually be hosted and used so it's time to start
tracking changed! Yay!

### Features

- Creates Timer component
  - Has state management to handle swapping between work and break modes
  - Has UI to demonstrate when a timer is active or paused
  - Has controls for manually swapping timer modes, pausing, playing, and resetting
- Creates Kanban task board component
  - Can create and edit new cards
  - Can drag cards to other columns or other positions in the board (drop zones highlighted on drag start)
  - KNOWN BUG: Google Chrome's clickable zone for dragging a card isn't the entire card
- Creates Pager component
  - Only displays the Kanban board now but this will handle swapping what is visible in the main content area
