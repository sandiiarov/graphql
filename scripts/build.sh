#!/usr/bin/env bash

# see: https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -e # exit immediately if a pipeline returns a non-zero status

rm -rf .build/
yarn run babel config --out-dir .build/config --ignore __tests__,__mocks__
yarn run babel src --out-dir .build/src --ignore __tests__,__mocks__
# TODO: install only production dependencies (Docker)
