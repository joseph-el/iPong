import { Board } from "../interfaces/board.interface";

import CampCod        from "../assets/maps/map-CampCod.jpg";
import LazyLake       from "../assets/maps/map-LazyLake.jpg";
import TheSpire       from "../assets/maps/map-TheSpire.jpg";
import RetailRow      from "../assets/maps/map-RetailRow.jpg";
import NeoTilted      from "../assets/maps/map-NeoTilted.jpg";
import DirtyDocks     from "../assets/maps/map-DirtyDocks.jpg";
import BoneyBurbs     from "../assets/maps/map-BoneyBurbs.jpg";
import ScenicSpot     from "../assets/maps/map-ScenicSpot.jpg";
import GothamCity     from "../assets/maps/map-GothamCity.jpg";
import RiskyReels     from "../assets/maps/map-RiskyReels.jpg";
import SunnySteps     from "../assets/maps/map-SunnySteps.jpg";
import HollyHedges    from "../assets/maps/map-HollyHedges.jpg";
import SlurpySwamp    from "../assets/maps/map-SlurpySwamp.jpg";
import SweatySands    from "../assets/maps/map-SweatySands.jpg";
import CattyCorner    from "../assets/maps/map-CattyCorner.jpg";
import CoralCastle    from "../assets/maps/map-CoralCastle.jpg";
import VillainLair    from "../assets/maps/map-VillainLair.jpg";
import TiltedTowers   from "../assets/maps/map-TiltedTowers.jpg";
import PleasantPark   from "../assets/maps/map-PleasantPark.jpg";
import MistyMeadows   from "../assets/maps/map-MistyMeadows.jpg";
import CraggyCliffs   from "../assets/maps/map-CraggyCliffs.jpg";
import SteamyStacks   from "../assets/maps/map-SteamyStacks.jpg";
import WeepingWoods   from "../assets/maps/map-WeepingWoods.jpg";
import ShiftyShafts   from "../assets/maps/map-ShiftyShafts.jpg";
import SaltySprings   from "../assets/maps/map-SaltySprings.jpg";
import BelieverBeach  from "../assets/maps/map-BelieverBeach.jpg";
import PristinePoint  from "../assets/maps/map-PristinePoint.jpg";
import GuardianTowers from "../assets/maps/map-GuardianTowers.jpg";

export const BOARDS_DB: Board[] = [
  {
    name: "Tilted Towers",
    description:
      "Once a bustling urban area, now a ghost town after the catastrophe.",
    imgPath: TiltedTowers,
    price: 50,
  },
  {
    name: "Pleasant Park",
    description:
      "A serene suburbia, perfect for a peaceful ride through the neighborhood.",
    imgPath: PleasantPark,
    price: 30,
  },
  {
    name: "Retail Row",
    description:
      "Shop til you drop in this commercial district turned skate haven.",
    imgPath: RetailRow,
    price: 1000,
  },
  {
    name: "Lazy Lake",
    description: "Relax and enjoy the peaceful lakeside skating experience.",
    imgPath: LazyLake,
    price: 200,
  },
  {
    name: "Salty Springs",
    description:
      "A small town with a big personality, and plenty of ramps to hit.",
    imgPath: SaltySprings,
    price: 73,
  },
  {
    name: "Holly Hedges",
    description:
      "Explore the cozy suburban area, now a skateboarding paradise.",
    imgPath: HollyHedges,
    price: 90,
  },
  {
    name: "Slurpy Swamp",
    description:
      "Navigate through the swampy terrain, perfect for adventurous skaters.",
    imgPath: SlurpySwamp,
    price: 55,
  },
  {
    name: "Misty Meadows",
    description: "Skate through the scenic countryside of Misty Meadows.",
    imgPath: MistyMeadows,
    price: 80,
  },
  {
    name: "Craggy Cliffs",
    description: "Conquer the cliffs and enjoy the breathtaking views.",
    imgPath: CraggyCliffs,
    price: 110,
  },
  {
    name: "Steamy Stacks",
    description:
      "Visit the industrial stacks and experience urban skateboarding.",
    imgPath: SteamyStacks,
    price: 95,
  },
  {
    name: "Dirty Docks",
    description:
      "Navigate through the busy docks, a challenging terrain for skaters.",
    imgPath: DirtyDocks,
    price: 85,
  },
  {
    name: "Weeping Woods",
    description:
      "Explore the dense woods, now a thrilling skateboard adventure.",
    imgPath: WeepingWoods,
    price: 75,
  },
  {
    name: "Sweaty Sands",
    description:
      "Enjoy skating on the sandy shores and lively streets of Sweaty Sands.",
    imgPath: SweatySands,
    price: 65,
  },
  {
    name: "Boney Burbs",
    description:
      "Skate through the skeletal remains of Boney Burbs, a spooky experience.",
    imgPath: BoneyBurbs,
    price: 120,
  },
  {
    name: "Camp Cod",
    description: "Embrace the natural beauty and rugged terrain of Camp Cod.",
    imgPath: CampCod,
    price: 70,
  },
  {
    name: "Believer Beach",
    description: "Ride the waves and skate the boardwalks of Believer Beach.",
    imgPath: BelieverBeach,
    price: 150,
  },
  {
    name: "Catty Corner",
    description:
      "Navigate through the corners and alleys of Catty Corner, a hidden gem.",
    imgPath: CattyCorner,
    price: 105,
  },
  {
    name: "Coral Castle",
    description:
      "Discover the ancient ruins and coral formations of Coral Castle.",
    imgPath: CoralCastle,
    price: 125,
  },
  {
    name: "The Spire",
    description: "Conquer the mystical Spire and its magical surroundings.",
    imgPath: TheSpire,
    price: 140,
  },
  {
    name: "Pristine Point",
    description:
      "Explore the pristine landscapes and hidden paths of Pristine Point.",
    imgPath: PristinePoint,
    price: 115,
  },
  {
    name: "Guardian Towers",
    description: "Ascend the heights and skate the towers of Guardian Towers.",
    imgPath: GuardianTowers,
    price: 160,
  },
  {
    name: "Scenic Spot",
    description: "Skate through the picturesque views and scenic spots.",
    imgPath: ScenicSpot,
    price: 180,
  },
  {
    name: "Shifty Shafts",
    description:
      "Venture underground into the abandoned mine shafts and hit some rails.",
    imgPath: ShiftyShafts,
    price: 60,
  },
  {
    name: "Gotham City",
    description: "Embrace the dark and thrilling streets of Gotham City.",
    imgPath: GothamCity,
    price: 200,
  },
  {
    name: "Neo Tilted",
    description:
      "Experience the futuristic cityscape and high-tech skateboarding in Neo Tilted.",
    imgPath: NeoTilted,
    price: 170,
  },
  {
    name: "Risky Reels",
    description:
      "Skate through the iconic drive-in theater and risky ramps of Risky Reels.",
    imgPath: RiskyReels,
    price: 195,
  },
  {
    name: "Sunny Steps",
    description:
      "Enjoy the sunny steps and ancient architecture of this historical spot.",
    imgPath: SunnySteps,
    price: 145,
  },
  {
    name: "Villain Lair",
    description:
      "Conquer the lair of villains and skate through their secret hideout.",
    imgPath: VillainLair,
    price: 190,
  },
];

// import RetailRow from     "../assets/maps/map-RetailRow.svg";
// import LootLake from      "../assets/maps/map-LootLake.svg";
// import DustyDivot from    "../assets/maps/map-DustyDivot.svg";
// import LazyLinks from     "../assets/maps/map-LazyLinks.svg";
// import GreasyGrove from   "../assets/maps/map-GreasyGrove.svg";
// import TiltedTowers from  "../assets/maps/map-TiltedTowers.svg";
// import PleasantPark from  "../assets/maps/map-PleasantPark.svg";
// import FlushFactory from  "../assets/maps/map-FlushFactory.svg";
// import SnobbyShores from  "../assets/maps/map-SnobbyShores.svg";
// import HauntedHills from  "../assets/maps/map-HauntedHills.svg";
// import SaltySprings from  "../assets/maps/map-SaltySprings.svg";
// import ShiftyShafts from  "../assets/maps/map-ShiftyShafts.svg";
// import TomatoTemple from  "../assets/maps/map-TomatoTemple.svg";
// import ParadisePalms from "../assets/maps/map-ParadisePalms.svg";

// export const BOARDS_DB: Board[] = [
//   {
//     name: 'Tilted Towers',
//     description: 'Once a bustling urban area, now a ghost town after the catastrophe.',
//     imgPath: TiltedTowers,
//     price: 50,
//   },
//   {
//     name: 'Pleasant Park',
//     description: 'A serene suburbia, perfect for a peaceful ride through the neighborhood.',
//     imgPath: PleasantPark,
//     price: 30,
//   },
//   {
//     name: 'Retail Row',
//     description: 'Shop til you drop in this commercial district turned skate haven.',
//     imgPath: RetailRow,
//     price: 1000,
//   },
//   {
//     name: 'Salty Springs',
//     description: 'A small town with a big personality, and plenty of ramps to hit.',
//     imgPath: SaltySprings,
//     price: 73,
//   },
//   {
//     name: 'Loot Lake',
//     description: 'Navigate through the remnants of Loot Lake, now a skater\'s paradise.',
//     imgPath: LootLake,
//     price: 1570,
//   },
//   {
//     name: 'Dusty Divot',
//     description: 'The aftermath of a meteor strike makes for some gnarly terrain.',
//     imgPath: DustyDivot,
//     price: 800,
//   },
//   {
//     name: 'Lazy Links',
//     description: 'A luxury golf resort turned extreme sports playground.',
//     imgPath: LazyLinks,
//     price: 750,
//   },
//   {
//     name: 'Tomato Temple',
//     description: 'Ride through the ruins of Tomato Town, now a temple to the past.',
//     imgPath: TomatoTemple,
//     price: 122,
//   },
//   {
//     name: 'Paradise Palms',
//     description: 'Cruise through this desert oasis turned skater\'s paradise.',
//     imgPath: ParadisePalms,
//     price: 90,
//   },
//   {
//     name: 'Haunted Hills',
//     description: 'Explore the spooky remains of Haunted Hills on your board.',
//     imgPath: HauntedHills,
//     price: 11,
//   },
//   {
//     name: 'Shifty Shafts',
//     description: 'Venture underground into the abandoned mine shafts and hit some rails.',
//     imgPath: ShiftyShafts,
//     price: 60,
//   },
//   {
//     name: 'Greasy Grove',
//     description: 'Skate through the greasy remnants of a once-popular fast-food joint.',
//     imgPath: GreasyGrove,
//     price: 145,
//   },
//   {
//     name: 'Flush Factory',
//     description: 'Navigate through this industrial area with plenty of pipes and ramps.',
//     imgPath: FlushFactory,
//     price: 110,
//   },
//   {
//     name: 'Snobby Shores',
//     description: 'Hit the streets of this upscale neighborhood for some high-class shredding.',
//     imgPath: SnobbyShores,
//     price: 70,
//   },
// ];

// export const boardsDB = [
//   {
//     name: 'Tilted Towers',
//     description: 'Once a bustling urban area, now a ghost town after the catastrophe.',
//     price: 50,
//   },
//   {
//     name: 'Pleasant Park',
//     description: 'A serene suburbia, perfect for a peaceful ride through the neighborhood.',
//     price: 30,
//   },
//   {
//     name: 'Retail Row',
//     description: 'Shop til you drop in this commercial district turned skate haven.',
//     price: 1000,
//   },
//   {
//     name: 'Lazy Lake',
//     description: 'Relax and enjoy the peaceful lakeside skating experience.',
//     price: 200,
//   },
//   {
//     name: 'Salty Springs',
//     description: 'A small town with a big personality, and plenty of ramps to hit.',
//     price: 73,
//   },
//   {
//     name: 'Holly Hedges',
//     description: 'Explore the cozy suburban area, now a skateboarding paradise.',
//     price: 90,
//   },
//   {
//     name: 'Slurpy Swamp',
//     description: 'Navigate through the swampy terrain, perfect for adventurous skaters.',
//     price: 55,
//   },
//   {
//     name: 'Misty Meadows',
//     description: 'Skate through the scenic countryside of Misty Meadows.',
//     price: 80,
//   },
//   {
//     name: 'Craggy Cliffs',
//     description: 'Conquer the cliffs and enjoy the breathtaking views.',
//     price: 110,
//   },
//   {
//     name: 'Steamy Stacks',
//     description: 'Visit the industrial stacks and experience urban skateboarding.',
//     price: 95,
//   },
//   {
//     name: 'Dirty Docks',
//     description: 'Navigate through the busy docks, a challenging terrain for skaters.',
//     price: 85,
//   },
//   {
//     name: 'Weeping Woods',
//     description: 'Explore the dense woods, now a thrilling skateboard adventure.',
//     price: 75,
//   },
//   {
//     name: 'Sweaty Sands',
//     description: 'Enjoy skating on the sandy shores and lively streets of Sweaty Sands.',
//     price: 65,
//   },
//   {
//     name: 'Boney Burbs',
//     description: 'Skate through the skeletal remains of Boney Burbs, a spooky experience.',
//     price: 120,
//   },
//   {
//     name: 'Camp Cod',
//     description: 'Embrace the natural beauty and rugged terrain of Camp Cod.',
//     price: 70,
//   },
//   {
//     name: 'Believer Beach',
//     description: 'Ride the waves and skate the boardwalks of Believer Beach.',
//     price: 150,
//   },
//   {
//     name: 'Catty Corner',
//     description: 'Navigate through the corners and alleys of Catty Corner, a hidden gem.',
//     price: 105,
//   },
//   {
//     name: 'Coral Castle',
//     description: 'Discover the ancient ruins and coral formations of Coral Castle.',
//     price: 125,
//   },
//   {
//     name: 'The Spire',
//     description: 'Conquer the mystical Spire and its magical surroundings.',
//     price: 140,
//   },
//   {
//     name: 'Pristine Point',
//     description: 'Explore the pristine landscapes and hidden paths of Pristine Point.',
//     price: 115,
//   },
//   {
//     name: 'Guardian Towers',
//     description: 'Ascend the heights and skate the towers of Guardian Towers.',
//     price: 160,
//   },
//   {
//     name: 'Scenic Spot',
//     description: 'Skate through the picturesque views and scenic spots.',
//     price: 180,
//   },
//   {
//     name: 'Shifty Shafts',
//     description: 'Venture underground into the abandoned mine shafts and hit some rails.',
//     price: 60,
//   },
//   {
//     name: 'Gotham City',
//     description: 'Embrace the dark and thrilling streets of Gotham City.',
//     price: 200,
//   },
//   {
//     name: 'Neo Tilted',
//     description: 'Experience the futuristic cityscape and high-tech skateboarding in Neo Tilted.',
//     price: 170,
//   },
//   {
//     name: 'Risky Reels',
//     description: 'Skate through the iconic drive-in theater and risky ramps of Risky Reels.',
//     price: 195,
//   },
//   {
//     name: 'Sunny Steps',
//     description: 'Enjoy the sunny steps and ancient architecture of this historical spot.',
//     price: 145,
//   },
//   {
//     name: 'Villain Lair',
//     description: 'Conquer the lair of villains and skate through their secret hideout.',
//     price: 190,
//   },
// ];
