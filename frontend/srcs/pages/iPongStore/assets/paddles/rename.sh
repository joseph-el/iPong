#!/bin/bash

# Array of original file names
declare -a original_names=(
    "9orsan.png" "fir3awn.png" "imarat.png" "jocker.png" "ninja.png"
    "saudi.png" "spiderman.png" "zombie.png" "cold.png" "hacker.png"
    "inchtayn.png" "lacasa.png" "sahrawi.png" "space man.png" "the_dark.png"
)

# Array of corresponding logical names
declare -a logical_names=(
    "Archer.png" "Pharaoh.png" "Uae Man.png" "Joker.png" "Ninja.png"
    "Saudi man.png" "Spiderman.png" "Zombie.png" "Ice.png" "Hacker.png"
    "Albert Einstein.png" "La Casa De Papel.png" "Desert Man.png" "Astronaut.png" "Blood Sucker.png"
)

# Get the length of the arrays
len=${#original_names[@]}

# Iterate over each file and rename
for ((i=0; i<$len; i++)); do
    original="${original_names[$i]}"
    logical="${logical_names[$i]}"
    mv "$original" "$logical"
    echo "Renamed $original to $logical"
done
