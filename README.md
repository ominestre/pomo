# Pomo

## Prerequisites

- `Node > v18.12.1`
- `Yarn > v1.22.9`

## Getting Started

`yarn start` will build the app and use `webpack-dev-server` to hot reload
any changes you make to watched files.

## Project Structure

- `dist/` this is final distribution folder that is meant to be manually or
automatically deployed to a web server or host.
- `public/` this contains the files which need to be included in the distribution
but do not need to be compiled or altered at build time.
- `src/` this contains the files that should be compiled or altered at build time

### Automagic to be aware of

- The webpack HTML plugin automatically compiles `.ejs` so the `src/index.ejs` is
used implicitly.
