#!/usr/bin/env bash

# see: https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -e # exit immediately if a pipeline returns a non-zero status

# Deploy uses AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY automatically
# see: https://serverless.com/framework/docs/providers/aws/guide/credentials/
yarn run serverless deploy --verbose
