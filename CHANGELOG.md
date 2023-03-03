## v1.0.0-alpha004

### Features

- Plays an alarm sound when a cycle is completed [change](https://github.com/ominestre/pomo/pull/18)
  - The alarm sound was created using Reaper and Spire Synth

### Bugs

- Fixed an issue where the timer interval was setup incorrectly resulting in the state being fixed at the point of component render. Uses React's `useEffect` to re-evaluate the conditions of the interval whenever the subscribed state changes. [change](https://github.com/ominestre/pomo/pull/18)


### Build and Tools

- Configures Webpack and Typescript to support importing audio [change](https://github.com/ominestre/pomo/pull/18)
- Fixed the build script executing subshell git commands as a result of a poorly formatted string [change](https://github.com/ominestre/pomo/pull/12)

## v1.0.0-alpha003

### Build and Tools

- Fixes tag deployment workflow to use `main` branch instead of trying to find a branch with same name as tag [change](https://github.com/ominestre/pomo/pull/11/commits/f3e634aa4734949f50fde50f3e7870496cc1912a)
- Moves docs folder out of `src/` since it's not being built into a doc-site [change](https://github.com/ominestre/pomo/pull/11)
- Updates build script to set `NODE_ENV` to `production` for webpack

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
