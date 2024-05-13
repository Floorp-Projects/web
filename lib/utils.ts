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
  Unknown = 'Unknown'
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

  return Platform.Unknown
}
