import { Open_Sans } from "next/font/google";
import { DM_Sans } from "next/font/google";

export const OpenSans=Open_Sans({
    subsets: ["latin-ext"],
    weight: ["400", "700","600"],
});

export const DMSans=DM_Sans({
    subsets: ["latin-ext"],
    weight: ["300","400", "700","600","500"],
});