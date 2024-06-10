import { Board } from '../interfaces/board.interface';

import RetailRow from     "../assets/maps/map-RetailRow.svg";
import LootLake from      "../assets/maps/map-LootLake.svg";
import DustyDivot from    "../assets/maps/map-DustyDivot.svg";
import LazyLinks from     "../assets/maps/map-LazyLinks.svg";
import GreasyGrove from   "../assets/maps/map-GreasyGrove.svg";
import TiltedTowers from  "../assets/maps/map-TiltedTowers.svg";
import PleasantPark from  "../assets/maps/map-PleasantPark.svg";
import FlushFactory from  "../assets/maps/map-FlushFactory.svg";
import SnobbyShores from  "../assets/maps/map-SnobbyShores.svg";
import HauntedHills from  "../assets/maps/map-HauntedHills.svg";
import SaltySprings from  "../assets/maps/map-SaltySprings.svg";
import ShiftyShafts from  "../assets/maps/map-ShiftyShafts.svg";
import TomatoTemple from  "../assets/maps/map-TomatoTemple.svg";
import ParadisePalms from "../assets/maps/map-ParadisePalms.svg";

export const BOARDS_DB: Board[] = [
  {
    name: 'Tilted Towers',
    description: 'Once a bustling urban area, now a ghost town after the catastrophe.',
    imgPath: TiltedTowers,
    price: 50,
  },
  {
    name: 'Pleasant Park',
    description: 'A serene suburbia, perfect for a peaceful ride through the neighborhood.',
    imgPath: PleasantPark,
    price: 30,
  },
  {
    name: 'Retail Row',
    description: 'Shop til you drop in this commercial district turned skate haven.',
    imgPath: RetailRow,
    price: 1000,
  },
  {
    name: 'Salty Springs',
    description: 'A small town with a big personality, and plenty of ramps to hit.',
    imgPath: SaltySprings,
    price: 73,
  },
  {
    name: 'Loot Lake',
    description: 'Navigate through the remnants of Loot Lake, now a skater\'s paradise.',
    imgPath: LootLake,
    price: 1570,
  },
  {
    name: 'Dusty Divot',
    description: 'The aftermath of a meteor strike makes for some gnarly terrain.',
    imgPath: DustyDivot,
    price: 800,
  },
  {
    name: 'Lazy Links',
    description: 'A luxury golf resort turned extreme sports playground.',
    imgPath: LazyLinks,
    price: 750,
  },
  {
    name: 'Tomato Temple',
    description: 'Ride through the ruins of Tomato Town, now a temple to the past.',
    imgPath: TomatoTemple,
    price: 122,
  },
  {
    name: 'Paradise Palms',
    description: 'Cruise through this desert oasis turned skater\'s paradise.',
    imgPath: ParadisePalms,
    price: 90,
  },
  {
    name: 'Haunted Hills',
    description: 'Explore the spooky remains of Haunted Hills on your board.',
    imgPath: HauntedHills,
    price: 11,
  },
  {
    name: 'Shifty Shafts',
    description: 'Venture underground into the abandoned mine shafts and hit some rails.',
    imgPath: ShiftyShafts,
    price: 60,
  },
  {
    name: 'Greasy Grove',
    description: 'Skate through the greasy remnants of a once-popular fast-food joint.',
    imgPath: GreasyGrove,
    price: 145,
  },
  {
    name: 'Flush Factory',
    description: 'Navigate through this industrial area with plenty of pipes and ramps.',
    imgPath: FlushFactory,
    price: 110,
  },
  {
    name: 'Snobby Shores',
    description: 'Hit the streets of this upscale neighborhood for some high-class shredding.',
    imgPath: SnobbyShores,
    price: 70,
  },
];

