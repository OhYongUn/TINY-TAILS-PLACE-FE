import type {ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";
import {clsx} from "clsx";

export function cn(...inputs: ClassValue[]) {
    console.log('cscscs')
    return twMerge(clsx(inputs))
}
