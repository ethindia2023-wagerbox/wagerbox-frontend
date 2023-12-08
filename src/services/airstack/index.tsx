interface Data {
    Wallet: Wallet;
}

interface Error {
    message: string;
}

interface Wallet {
    socials: Social[];
    addresses: string[];
}

interface Social {
    dappName: "lens" | "farcaster";
    profileName: string;
}

export interface QueryResponse {
    data: Data | null;
    loading: boolean;
    error: Error;
}

export const fetchENS = (ens: string, blockchain: string) => `
query {
  Wallet(input: {identity: "${ens}", blockchain: ${blockchain}}) {
    socials {
      dappName
      profileName
    }
    addresses
  }
}
`;

export const fetchNFTs = (address: string, blockchain: string, limit=50) => `
query MyQuery {
  TokenBalances(
    input: {filter: {owner: {_eq: "${address}"}, tokenType: {_in: [ERC1155, ERC721]}}, blockchain: ${blockchain}, limit: ${limit}}
  ) {
    TokenBalance {
      owner {
        identity
      }
      amount
      tokenAddress
      tokenId
      tokenType
      tokenNfts {
        contentValue {
          image {
            small
          }
        }
      }
    }
    pageInfo {
      nextCursor
      prevCursor
    }
  }
}
`;