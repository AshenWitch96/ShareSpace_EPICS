import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { FaCar } from "react-icons/fa";

import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
  GiElectricalSocket,
  GiFemale,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { MdFastfood } from "react-icons/md"; // For food aid
import { RiServiceLine } from "react-icons/ri"; // For services
import { BiHomeAlt } from "react-icons/bi"; // For homes and apartments
import { FaTshirt } from "react-icons/fa"; // For item rentals (clothes)

export const categories = [
  {
    label: "Homes",
    icon: BiHomeAlt,
    description: "Rent homes and apartments!",
  },
  {
    label: "Electrician",
    icon: GiElectricalSocket,
    description: "Get electrical services",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "Modern homes with great facilities!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "Properties in scenic countryside!",
  },
  {
    label: "Item Rentals",
    icon: FaTshirt,
    description: "Rent items like electronics, clothes, and more!",
  },
/*  {
    label: "Plumber",
    icon: GiIsland,
    description: "Get plumbing services",
  },*/
  {
    label: "Lakeside",
    icon: GiBoatFishing,
    description: "Properties near lakes!",
  },
/*  {
    label: "Skiing",
    icon: FaSkiing,
    description: "Properties with skiing nearby!",
  },
  {
/*    label: "Castles",
    icon: GiCastle,
    description: "Stay in ancient castles!",
  },
  {
    label: "Caves",
    icon: GiCaveEntrance,
    description: "Unique cave properties to stay in!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "Camping and outdoor activities!",
  },*/
  {
    label: "Food Aid",
    icon: MdFastfood,
    description: "Very Cheap food provided by NGOs!",
  },
  {
    label: "Vehicle Rentals",
    icon: FaCar,
    description: "Rent cars, bikes, and other vehicles for travel!",
  },
/*  {
    label: "Barns",
    icon: GiBarn,
    description: "Rent a rustic barn!",
  },*/
  {
    label: "Services",
    icon: RiServiceLine,
    description: "Hire services like laundry, plumbing!",
  },
];

export const LISTINGS_BATCH = 16;

export const menuItems = [
  {
    label: "My rents",
    path: "/trips",
  },
  {
    label: "My favorites",
    path: "/favorites",
  },
  {
    label: "My reservations",
    path: "/reservations",
  },
  {
    label: "My properties",
    path: "/properties",
  },
];
