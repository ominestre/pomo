## v1.0.0-alpha002

### Tasks UI

- Adds maximum width to task columns [change](https://github.com/ominestre/pomo/pull/10/commits/4977f438d18ce496074be83151b25df040abff63)
- Adds color to task edit buttons [change](https://github.com/ominestre/pomo/pull/10/commits/35522edb2f0b80b08f3eb7069d84f79ab28bf40d)
- Changes the card cursor to indicate when drag and drop is enabled [change](https://github.com/ominestre/pomo/pull/10/commits/5c816fdf6d72049f47758e10d2021cc7c4abe9c0)
- Changes card inputs to be multi-line textareas instead of inputs [change](https://github.com/ominestre/pomo/pull/10/commits/8472f5da3126df5d36bfaa29fbd1825cd2f91906)

### Build and Tools

- Fixes sourcemaps only showing TS compiled scripts instead of original source [change](https://github.com/ominestre/pomo/pull/10/commits/e9693befd85c4ce6b2226f1d177dfedce4f046da)

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
