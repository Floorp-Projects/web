import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import React from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Checks if the current environment is development
 */
export function isDevelopment() {
  return process.env.ENV === "development";
}

export const getComponent = (node: React.ReactNode, returnIfProduction: boolean = false): React.ReactNode | null  =>{
  if (isDevelopment()) {
    return returnIfProduction ? null : node;
  }

  return returnIfProduction ? node : null;
}

export const platformOptions = {
  "windows": "Windows",
  "linux": "Linux",
  "macos": "macOS",
  "android": "Android",
  "ios": "iOS",
} as Record<string, string>;

export enum Platform {
  Linux = 'Linux',
  Windows = 'Windows',
  MacOS = 'macOS',
  Android = 'Android',
  IOS = 'iOS',
}

export const convertOptionToPlatform = (option: string): Platform => {
  switch (option) {
    case "windows":
      return Platform.Windows;
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
    case Platform.Windows:
      return "windows";
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


export function getPlatformFromUA(ua: string): Platform {
  ua = ua.toLowerCase()
  if (ua.indexOf('windows') !== -1) {
    return Platform.Windows;
  }
  if (ua.indexOf('mac') !== -1) {
    return Platform.MacOS;
  }

  return Platform.Linux;
}

export function htmlUnescape(str: string): string {
  return str.replace(/&(lt|gt|amp|quot|#x27|#x60|nbsp);/g, (match) => {
    return {
      '&lt;': '<',
      '&gt;': '>',
      '&amp;': '&',
      '&quot;': '"',
      '&#x27;': "'",
      '&#x60;': '`',
      '&nbsp;': ' ',
    }[match]!
  });
}
