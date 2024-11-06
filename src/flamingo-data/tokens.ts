import { FlamingoToken } from "@custom-types/flamingo-data";
import FLMSymbolImage from '@assets/images/tokens/FLM-Symbol.svg';
import FLUNDSymbolImage from '@assets/images/tokens/FLUND-Symbol.svg';
import TIPSSymbolImage from '@assets/images/tokens/TIPS-Symbol.svg';
import NEOSymbolImage from '@assets/images/tokens/NEO-Symbol.svg';
import GASSymbolImage from '@assets/images/tokens/GAS-Symbol.svg';
import bNEOSymbolImage from '@assets/images/tokens/bNEO-Symbol.svg';
import FUSDSymbolImage from '@assets/images/tokens/FUSD-Symbol.svg';
import SOMSymbolImage from '@assets/images/tokens/SOM-Symbol.svg';
import CANDYSymbolImage from '@assets/images/tokens/CANDY-Symbol.svg';
import DOGERSymbolImage from '@assets/images/tokens/DOGER-Symbol.svg';
import FDESymbolImage from '@assets/images/tokens/FDE-Symbol.svg';
import fUSDTSymbolImage from '@assets/images/tokens/fUSDT-Symbol.svg';
import fWETHSymbolImage from '@assets/images/tokens/fWETH-Symbol.svg';
import fWBTCSymbolImage from '@assets/images/tokens/fWBTC-Symbol.svg';
import pONTSymbolImage from '@assets/images/tokens/pONT-Symbol.svg';
import GMSymbolImage from '@assets/images/tokens/GM-Symbol.svg';
import fCAKESymbolImage from '@assets/images/tokens/fCAKE-Symbol.svg';
import SWTHSymbolImage from '@assets/images/tokens/SWTH-Symbol.svg';
import fBNBSymbolImage from '@assets/images/tokens/fBNB-Symbol.svg';
import PlaceHolderSymbolImage from '@assets/icons/unknown-placeholder.svg';

const tokens: Record<string, FlamingoToken> = {
  FLM: {
    symbol: "FLM",
    decimals: 8,
    hash: "0xf0151f528127558851b39c2cd8aa47da7418ab28",
    colour: '#de49b1',
    image: FLMSymbolImage,
  },
  FLUND: {
    symbol: "FLUND",
    decimals: 8,
    hash: "0xa9603a59e21d29e37ac39cf1b5f5abf5006b22a3",
    colour: '#e45880',
    image: FLUNDSymbolImage,
  },
  TIPS: {
    symbol: "TIPS",
    decimals: 8,
    hash: "0x340720c7107ef5721e44ed2ea8e314cce5c130fa",
    colour: '#6a32f7',
    image: TIPSSymbolImage,
  },
  NEO: {
    symbol: "NEO",
    decimals: 0,
    hash: "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
    colour: '#00e599',
    image: NEOSymbolImage,
  },
  GAS: {
    symbol: "GAS",
    decimals: 8,
    hash: "0xd2a4cff31913016155e38e474a2c06d08be276cf",
    colour: '#8bf4cf',
    image: GASSymbolImage,
  },
  bNEO: {
    symbol: "bNEO",
    decimals: 8,
    hash: "0x48c40d4666f93408be1bef038b6722404d9a4c2a",
    colour: '#fcc43c',
    image: bNEOSymbolImage,
  },
  FUSD: {
    symbol: "FUSD",
    decimals: 8,
    hash: "0x1005d400bcc2a56b7352f09e273be3f9933a5fb1",
    colour: '#ec757d',
    image: FUSDSymbolImage,
  },
  LRB: {
    symbol: "LRB",
    decimals: 8,
    hash: "0x8c07b4c9f5bc170a3922eac4f5bb7ef17b0acc8b",
    colour: '#00abed',
    image: PlaceHolderSymbolImage,
  },
  USDL: {
    symbol: "USDL",
    decimals: 8,
    hash: "0xa8c51aa0c177187aeed3db88bdfa908ccbc9b1a5",
    colour: '#0a37d3',
    image: PlaceHolderSymbolImage,
  },
  SOM: {
    symbol: "SOM",
    decimals: 8,
    hash: "0x2d4c6cf0417209a7eb410160344e224e74f87195",
    colour: '#104aa8',
    image: SOMSymbolImage,
  },
  CANDY: {
    symbol: "CANDY",
    decimals: 9,
    hash: "0x88da18a5bca86ec8206d9b4960a7d0c4355a432f",
    colour: '#e826b0',
    image: CANDYSymbolImage,
  },
  DOGER: {
    symbol: "DOGER",
    decimals: 8,
    hash: "0x322b5a366ca724801a1aa01e669b5f3d7f8c7f6f",
    colour: '#db632c',
    image: DOGERSymbolImage,
  },
  DOGEF: {
    symbol: "DOGEF",
    decimals: 8,
    hash: "0xa3291b66f70d4687fc0e41977d8acb0699f235ae",
    colour: '#c5ae3a',
    image: PlaceHolderSymbolImage,
  },
  FDE: {
    symbol: "FDE",
    decimals: 8,
    hash: "0x9770f4d78a19d1a6fa94b472bcedffcc06b56c49",
    colour: '#7e56bc',
    image: FDESymbolImage,
  },
  fUSDT: {
    symbol: "fUSDT",
    decimals: 6,
    hash: "0xcd48b160c1bbc9d74997b803b9a7ad50a4bef020",
    colour: '#5cb49c',
    image: fUSDTSymbolImage,
  },
  fWETH: {
    symbol: "fWETH",
    decimals: 18,
    hash: "0xc14b601252aa5dfa6166cf35fe5ccd2e35f3fdf5",
    colour: '#8b8b8b',
    image: fWETHSymbolImage,
  },
  fWBTC: {
    symbol: "fWBTC",
    decimals: 8,
    hash: "0xd6abe115ecb75e1fa0b42f5e85934ce8c1ae2893",
    colour: '#f89c2c',
    image: fWBTCSymbolImage,
  },
  pONT: {
    symbol: "pONT",
    decimals: 9,
    hash: "0x8122bc2212ec971690a044b37a6f52a9349b702b",
    colour: '#48a3ff',
    image: pONTSymbolImage,
  },
  pWING: {
    symbol: "pWING",
    decimals: 9,
    hash: "0xeeccd60ed722111f8400434dac3ba42c14d8beb1",
    colour: '#000000',
    image: PlaceHolderSymbolImage,
  },
  GM: {
    symbol: "GM",
    decimals: 8,
    hash: "0x9b049f1283515eef1d3f6ac610e1595ed25ca3e9",
    colour: '#6d7584',
    image: GMSymbolImage,
  },
  fCAKE: {
    symbol: "fCAKE",
    decimals: 18,
    hash: "0xe65b462b90516012826f8a9c4c285d8c750e3a77",
    colour: '#d1884f',
    image: fCAKESymbolImage,
  },
  SWTH: {
    symbol: "SWTH",
    decimals: 8,
    hash: "0x78e1330db47634afdb5ea455302ba2d12b8d549f",
    colour: '#063c4f',
    image: SWTHSymbolImage,
  },
  fBNB: {
    symbol: "fBNB",
    decimals: 18,
    hash: "0xb56f0fba45cc57a948b342186274dfd863996bb3",
    colour: '#f0b90b',
    image: fBNBSymbolImage,
  },
};

export default tokens;