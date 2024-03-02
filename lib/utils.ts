import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import emailProviders from 'email-providers/all.json' assert {type: 'json'}
import validator from "validator";

export function emailValid (email:string) {
    return validator.isEmail(email)
}

export function isCustomEmail (email:string) {
    return !emailProviders.includes(getEmailDomain(email))
}

export function getEmailDomain (email:string) {
    const broken = email.split('@')
    return broken[broken.length - 1]
}

export function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs));
}