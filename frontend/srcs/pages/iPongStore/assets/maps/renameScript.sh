#!/bin/bash

# List of map names
map_names=(
    "TiltedTowers" "PleasantPark" "RetailRow" "LazyLake" "SaltySprings"
    "HollyHedges" "SlurpySwamp" "MistyMeadows" "CraggyCliffs" "SteamyStacks"
    "DirtyDocks" "WeepingWoods" "SweatySands" "BoneyBurbs" "CampCod"
    "BelieverBeach" "CattyCorner" "CoralCastle" "TheSpire" "PristinePoint"
    "GuardianTowers" "ScenicSpot" "ShiftyShafts" "GothamCity" "NeoTilted"
    "RiskyReels" "SunnySteps" "VillainLair"
)

# Iterate over each map name
for name in "${map_names[@]}"; do
    # Find corresponding file with different extensions
    for ext in "PNG" "JPG" "WEBP"; do
        if [ -f "map-${name}.${ext}" ]; then
            # Rename the file to map-{name}.jpg
            mv "map-${name}.${ext}" "map-${name}.jpg"
            break  # Stop after renaming the first found file
        fi
    done
done

echo "Renaming and converting completed."
