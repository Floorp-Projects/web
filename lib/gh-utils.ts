import {Octokit} from "octokit";
import {Platform} from "@/lib/utils";

type RawAsset = {
  name: string;
  size: number;
  browser_download_url: string;
}

export type AssetInfo = {
  name: string;
  url: string;
  fileName: string;
  fileSize: string;
};

export type PlatformDownload = {
  type: Platform;
  assets: AssetInfo[];
}

export type Release = {
  version: string;
  name: string;
  publishedAt: Date;
  downloads: Record<Platform, AssetInfo[]>;
  hashes: string;
}

const getReadableName = (name: string): string => {
  if (name.includes('aarch64')) {
    return 'Linux ARM';
  }
  if (name.includes('x86_64') && name.includes('linux')) {
    return 'Linux x86/x64';
  }
  if (name.includes('stub') && name.includes('exe')) {
    return 'Windows 64bit Online Installer';
  }
  if (name.includes('exe') && name.includes('win32')) {
    return 'Windows 32-bit';
  }
  if (name.includes('exe') && name.includes('win64')) {
    return 'Windows 64-bit';
  }
  if (name.includes('portable') && name.includes('zip') && name.includes('win')) {
    return 'Windows Portable';
  }
  if (name.includes('dmg')) {
    return 'macOS';
  }

  return name;
}

function getAssetInfo(asset: RawAsset): AssetInfo {
  const fileSize = asset.size / 1024 / 1024;
  return {
    url: asset.browser_download_url,
    fileName: asset.name,
    name: "Floorp " + getReadableName(asset.name),
    fileSize: `${fileSize.toFixed(2)} MB`,
  };
}

const getPlatformTypByAssetName = (name: string): Platform => {
  if (name.includes('windows') || name.includes('exe')) {
    return Platform.Windows;
  } else if (name.includes('linux')) {
    return Platform.Linux;
  } else if (name.includes('macos') || name.includes('dmg') || name.includes('DARWIN')) {
    return Platform.MacOS;
  }

  return Platform.Linux;
}

const accessToken = process.env.GITHUB_TOKEN;
const options = accessToken ? {auth: accessToken} : {};

const hasQuota = async (octokit: Octokit): Promise<boolean> => {
  const rateLimitResponse = await octokit.rest.rateLimit.get();

  if (rateLimitResponse.data.resources.core.remaining === 0) {
    console.log('Request quota exhausted before making request');
    return false;
  }

  return true;
}

export async function getRelease(): Promise<Release | null> {
  const octokit = new Octokit(options);
  if (!await hasQuota(octokit)) {
    return null;
  }
  try {
    const response = await octokit.rest.repos.getLatestRelease({
      owner: 'Floorp-Projects',
      repo: 'Floorp',
    });

    if (!response?.data.assets || response?.data.published_at === null) {
      console.error('Failed to fetch release data');
      return null;
    }
    const date = new Date(response.data.published_at);

    let hashes = '';
    const assets: Record<string, AssetInfo[]> = {}
    for (let i = 0; i < response.data.assets.length; i++) {
      const asset = response.data.assets[i];

      if (asset.name === "hashes.txt") {
        hashes = asset.browser_download_url;
      }

      if (asset.name.includes('.mar') || asset.name.includes('.txt')) {
        continue;
      }
      const platform = getPlatformTypByAssetName(asset.name);
      if (!assets[platform]) {
        assets[platform] = [];
      }
      assets[platform].push(getAssetInfo(asset));
    }

    const portableResponse = await octokit.rest.repos.getLatestRelease({
      owner: 'Floorp-Projects',
      repo: 'Floorp-Portable',
    });
    let targetAsset = portableResponse.data.assets.find((asset) => asset.name.includes('windows'));
    if (targetAsset) {
      if (!assets[Platform.Windows]) {
        assets[Platform.Windows] = [];
      }
      assets[Platform.Windows].push(getAssetInfo(targetAsset));
    }

    return {
      version: response.data.tag_name,
      name: response.data.name || response.data.tag_name,
      publishedAt: date,
      downloads: assets,
      hashes
    }
  } catch (e) {
    console.error('Failed to fetch release data', e);
    return null;
  }
}

export async function getTags(): Promise<string[]> {
  const octokit = new Octokit(options);
  if (!await hasQuota(octokit)) {
    return [];
  }
  const response = await octokit.rest.repos.listTags({
    owner: 'Floorp-Projects',
    repo: 'Floorp',
  });
  return response.data.map((tag) => tag.name);
}

