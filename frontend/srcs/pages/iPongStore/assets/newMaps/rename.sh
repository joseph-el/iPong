#!/bin/bash

map_names=("TiltedTowers" "PleasantPark" "RetailRow" "SaltySprings" "LootLake" "DustyDivot" "LazyLinks" "TomatoTemple" "ParadisePalms" "HauntedHills" "ShiftyShafts" "GreasyGrove" "FlushFactory" "SnobbyShores")

index=0
for file in game\ component-*.svg; do
  if [[ -e "$file" ]]; then
    map_name=${map_names[$index]}
    
    new_name="map-${map_name}.svg"
    
    mv "$file" "$new_name"
    
    index=$((index + 1))
    
    if [[ $index -ge ${#map_names[@]} ]]; then
      index=0
    fi
  fi
done

echo "Files have been renamed."
