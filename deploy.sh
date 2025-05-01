#!/bin/bash

if [[ $ENV == "production" ]]; then
  npm run build -- --mode=production
else
  npm run build -- --mode=staging
fi
