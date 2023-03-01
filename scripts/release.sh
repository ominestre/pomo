#!/usr/bin/bash

export NODE_ENV="production"

version=`head -n 1 CHANGELOG.md | cut -c4-`

echo "creating v$version"

# `-f` flag used to force inclusion of `CHANGELOG.md` changes
npm version -f $version

unset NODE_ENV
