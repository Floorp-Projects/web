import {Octokit} from "octokit";
import {AssetInfo, Platform, PlatformDownload} from "@/lib/utils";



type RawAsset = {
  name: string;
  size: number;
  browser_download_url: string;
}

function getAssetInfo(asset: RawAsset): AssetInfo {
  const fileSize = asset.size / 1024 / 1024;
  return {
    url: asset.browser_download_url,
    label: asset.name,
    fileSize: `${fileSize.toFixed(2)} MB`,
  };
}

const getPlatformTypByAssetName = (name: string): Platform => {
  if (name.includes('windows') || name.includes('exe')) {
    return Platform.Windows;
  } else if (name.includes('linux')) {
    return Platform.Linux;
  } else if (name.includes('macos')) {
    return Platform.MacOS;
  }

  return Platform.Linux;
}

export async function getPlatformInstallers(platform: Platform) {
  const installers = await getInstallers();
  return installers[platform];
}

export async function getInstallers(): Promise<Record<Platform, AssetInfo[]>> {
  const octokit = new Octokit();
  const response = await octokit.rest.repos.getLatestRelease({
    owner: 'Floorp-Projects',
    repo: 'Floorp',
  });

  if (!response.data.assets || response.data.published_at === null) {
    return {} as Record<Platform, AssetInfo[]>;
  }
  const date = new Date(response.data.published_at);
  const assets: Record<string, AssetInfo[]> = {}
  for (let i = 0; i < response.data.assets.length; i++) {
    const asset = response.data.assets[i];
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

  return assets;
}

