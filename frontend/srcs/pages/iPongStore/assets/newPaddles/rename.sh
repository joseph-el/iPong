#!/bin/bash

# Directory containing the files (update this if necessary)
DIR="."

# Iterate over each SVG file in the directory
for file in "$DIR"/*.svg; 
do 
  # Extract the filename without the path
  basefile=$(basename "$file")
  
  # Check if the file name starts with 'paddles '
  if [[ "$basefile" == paddles\ * ]]; then
    # Remove the 'paddles ' prefix
    newname=${basefile#paddles }
  else
    # Use the base filename as it is
    newname="$basefile"
  fi
  
  # Prefix 'paddles-' to the filename
  newname="paddles-$newname"
  
  # Construct the full new file path
  newfilepath="$DIR/$newname"
  
  # Rename the file
  mv "$file" "$newfilepath"
  
  # Output the renaming action
  echo "Renamed '$file' to '$newfilepath'"
done
