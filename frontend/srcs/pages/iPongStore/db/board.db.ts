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
    imgPath: TiltedTowers,
    price: 50,
  },
  {
    name: 'Pleasant Park',
    imgPath: PleasantPark,
    price: 30,
  },
  {
    name: 'Retail Row',
    imgPath: RetailRow,
    price: 1000,
  },
  {
    name: 'Salty Springs',
    imgPath: SaltySprings,
    price: 73,
  },
  {
    name: 'Loot Lake',
    imgPath: LootLake,
    price: 1570,
  },
  {
    name: 'Dusty Divot',
    imgPath: DustyDivot,
    price: 800,
  },
  {
    name: 'Lazy Links',
    imgPath: LazyLinks,
    price: 750,
  },
  {
    name: 'Tomato Temple',
    imgPath: TomatoTemple,
    price: 122,
  },
  {
    name: 'Paradise Palms',
    imgPath: ParadisePalms,
    price: 90,
  },
  {
    name: 'Haunted Hills',
    imgPath: HauntedHills,
    price: 11,
  },
  {
    name: 'Shifty Shafts',
    imgPath: ShiftyShafts,
    price: 60,
  },
  {
    name: 'Greasy Grove',
    imgPath: GreasyGrove,
    price: 145,
  },
  {
    name: 'Flush Factory',
    imgPath: FlushFactory,
    price: 110,
  },
  {
    name: 'Snobby Shores',
    imgPath: SnobbyShores,
    price: 70,
  },
];
