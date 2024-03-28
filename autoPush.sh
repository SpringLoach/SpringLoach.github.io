#!/bin/bash
 
while true; do
  if git push; then
    echo "Push successful"
    break
  else
    echo "Push failed, retrying..."
  fi
done