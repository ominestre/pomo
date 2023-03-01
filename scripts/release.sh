#!/usr/bin/bash

export NODE_ENV="production"

version=`head -n 1 CHANGELOG.md | cut -c4-`

echo "running production build"
npm run build

echo "creating v$version"
# `-f` flag used to force inclusion of `CHANGELOG.md` changes
npm version -f $version

echo "ready for push with `git push main` and `git push --tags`"

unset NODE_ENV
