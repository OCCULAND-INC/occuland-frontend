import { getAddress } from '@ethersproject/address';

export function isAddress(value: string): boolean {
  try {
    getAddress(value);
    return true;
  } catch {
    return false;
  }
}

export function shortenAddress(address: string, chars = 4): string {
  if (isAddress(address)) {
    return `${address.substring(0, chars + 2)}...${address.substring(
      42 - chars,
    )}`;
  }
  return '';
}
