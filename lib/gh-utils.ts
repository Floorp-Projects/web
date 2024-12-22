import { Endpoints } from "@octokit/types";
import {Platform} from "@/lib/utils";

type GitHubLatestRelease = Endpoints["GET /repos/{owner}/{repo}/releases/latest"]["response"]["data"];

type GitHubListTags = Endpoints["GET /repos/{owner}/{repo}/tags"]["response"]["data"];

type GitHubRateLimit = Endpoints["GET /rate_limit"]["response"]["data"];

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
  if (!name.includes('portable')) {
    if (name.includes('aarch64') && name.includes('linux')) {
      return 'Linux ARM64';
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
    if (name.includes('exe') && name.includes('win64') && !name.includes('aarch64') /* aarch64 package filename: floorp-win64-aarch64.installer.exe */) {
      return 'Windows 64-bit';
    }
    if (name.includes('exe') && name.includes('aarch64')) {
      return 'Windows ARM64'
    }
    if (name.includes('dmg')) {
      return 'macOS';
    }
  } else {
    if (name.includes('tar.zst') && name.includes('aarch64') && name.includes('linux')) {
      return 'Linux ARM64 Portable';
    }
    if (name.includes('tar.zst') && name.includes('x86_64') && name.includes('linux')) {
      return 'Linux 64-bit Portable';
    }
    if (name.includes('zip') && name.includes('x86_64') && name.includes('win')) {
      return 'Windows 64-bit Portable';
    }
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
const fetchOptions = accessToken ? {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
} : {};

const hasQuota = async (): Promise<boolean> => {
  const result = await fetch(`https://api.github.com/rate_limit`, fetchOptions);
  if (!result.ok) {
    console.error(`Failed to fetch rate limit data: ${result.status} ${result.statusText}`);
    return false;
  }

  const rateLimitResponse = (await result.json()) as GitHubRateLimit;

  if (rateLimitResponse.resources.core.remaining === 0) {
    return false;
  }

  return true;
}

const getLatestRelease = async ({ owner, repo }: { owner: string, repo: string }): Promise<GitHubLatestRelease | null> => {
  const result = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, fetchOptions);
  if (!result.ok) {
    console.error(`Failed to fetch release data: ${result.status} ${result.statusText}`);
    return null;
  }

  return (await result.json()) as GitHubLatestRelease;
}

const listTags = async ({ owner, repo }: { owner: string, repo: string }): Promise<GitHubListTags | null> => {
  const result = await fetch(`https://api.github.com/repos/${owner}/${repo}/tags`, fetchOptions);
  if (!result.ok) {
    console.error(`Failed to fetch release data: ${result.status} ${result.statusText}`);
    return null;
  }

  return (await result.json()) as GitHubListTags;
}

export async function getRelease(): Promise<Release | null> {
  if (!await hasQuota()) {
    return null;
  }
  try {
    const response = await getLatestRelease({
      owner: 'Floorp-Projects',
      repo: 'Floorp',
    });

    if (!response?.assets || response?.published_at === null) {
      console.error('Failed to fetch release data');
      return null;
    }
    const date = new Date(response.published_at);

    let hashes = '';
    const assets: Record<string, AssetInfo[]> = {}
    for (let i = 0; i < response.assets.length; i++) {
      const asset = response.assets[i];

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

    const portableResponse = await getLatestRelease({
      owner: 'Floorp-Projects',
      repo: 'Floorp-Portable',
    });
    if (portableResponse?.assets) {
      for (let i = 0; i < portableResponse.assets.length; i++) {
        const asset = portableResponse.assets[i];

        if (asset.name.includes("windows")) {
          if (!assets[Platform.Windows]) {
            assets[Platform.Windows] = [];
          }
          assets[Platform.Windows].push(getAssetInfo(asset));
        }

        if (asset.name.includes("linux")) {
          if (!assets[Platform.Linux]) {
            assets[Platform.Linux] = [];
          }
          assets[Platform.Linux].push(getAssetInfo(asset));
        }
      }
    }

    return {
      version: response.tag_name,
      name: response.name || response.tag_name,
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
  if (!await hasQuota()) {
    return [];
  }
  const response = await listTags({
    owner: 'Floorp-Projects',
    repo: 'Floorp',
  }) ?? [];
  return response.map((tag) => tag.name);
}

