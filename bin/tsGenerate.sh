#!/bin/bash
./node_modules/.bin/ts-node ./src/generate.ts
./node_modules/.bin/tsc -p ./src/generated
