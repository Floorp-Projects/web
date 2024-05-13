import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const platformOptions = {
  "windows32": "Windows32",
  "windows64": "Windows64",
  "linux": "Linux",
  "macos": "MacOS",
  "android": "Android",
  "ios": "IOS",
} as Record<string, string>;

export enum Platform {
  Linux = 'Linux',
  Windows32 = 'Windows32',
  Windows64 = 'Windows64',
  MacOS = 'MacOS',
  Android = 'Android',
  IOS = 'IOS',
}

export const convertOptionToPlatform = (option: string): Platform => {
  switch (option) {
    case "windows32":
      return Platform.Windows32;
    case "windows64":
      return Platform.Windows64;
    case "linux":
      return Platform.Linux;
    case "macos":
      return Platform.MacOS;
    case "android":
      return Platform.Android;
    case "ios":
      return Platform.IOS;
    default:
      return Platform.Linux;
  }
}

export const convertPlatformToOption = (platform: Platform): string => {
  switch (platform) {
    case Platform.Windows32:
      return "windows32";
    case Platform.Windows64:
      return "windows64";
    case Platform.Linux:
      return "linux";
    case Platform.MacOS:
      return "macos";
    case Platform.Android:
      return "android";
    case Platform.IOS:
      return "ios";
    default:
      return "linux";
  }
}


export function getPlatform(ua: string): Platform {
  ua = ua.toLowerCase()
  if (ua.indexOf('linux') !== -1) {
    return Platform.Linux
  }
  if (ua.indexOf('win32') !== -1) {
    return Platform.Windows32
  }
  if (ua.indexOf('win64') !== -1) {
    return Platform.Windows64
  }
  if (ua.indexOf('mac') !== -1) {
    return Platform.MacOS
  }
  if (ua.indexOf('android') !== -1) {
    return Platform.Android
  }
  if (ua.indexOf('iphone') !== -1 || ua.indexOf('ipad') !== -1) {
    return Platform.IOS
  }

  return Platform.Linux
}
