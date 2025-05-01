#!/bin/bash

if [[ $ENVIRONMENT == "production" ]]; then
  npm run build -- --mode=production
else
  npm run build -- --mode=staging
fi
