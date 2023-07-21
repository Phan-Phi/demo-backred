import localFont from "next/font/local";
import { Inter, Bungee, Roboto, Jura } from "next/font/google";

const RobotoFont = Roboto({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const JuraFont = Jura({
  weight: ["400"],
  subsets: ["latin"],
});

const BungeeFont = Bungee({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export { RobotoFont, BungeeFont, JuraFont };
