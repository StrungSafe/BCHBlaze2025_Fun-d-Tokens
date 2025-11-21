import {
    Contract,
    MockNetworkProvider,
    SignatureTemplate,
    TransactionBuilder,
    randomUtxo,
    randomToken,
    randomNft,
} from 'cashscript';
import {
    instantiateSecp256k1,
    instantiateRipemd160,
    instantiateSha256,
    generatePrivateKey,
    binToHex,
    encodeCashAddress,
} from '@bitauth/libauth';

import inflow from './art/inflow.cashc' with { type: 'json' };
import mint from './art/mint.cashc' with { type: 'json' };
import collection from './art/collection.cashc' with { type: 'json' };

import outflow from './art/outflow.cashc' with { type: 'json' };
import burn from './art/burn.cashc' with { type: 'json' };
import distribute from './art/distribute.cashc' with { type: 'json' };

import holdings from './art/holdings.cashc' with { type: 'json' };


const secp256k1 = await instantiateSecp256k1();
const ripemd160 = await instantiateRipemd160();
const sha256 = await instantiateSha256();

const network = 'mocknet';

const generateWallet = () => {
    const privateKey = generatePrivateKey();
    const pubKeyBin = secp256k1.derivePublicKeyCompressed(privateKey);
    const pubKeyHex = binToHex(pubKeyBin);
    const signatureTemplate = new SignatureTemplate(privateKey);
    const pubKeyHash = ripemd160.hash(sha256.hash(pubKeyBin));
    const encoded = encodeCashAddress({ prefix: network === 'mainnet' ? 'bitcoincash' : 'bchtest', type: 'p2pkhWithTokens', payload: pubKeyHash });
    return { privateKey, pubKeyHex, pubKeyHash, signatureTemplate, address: typeof encoded === 'string' ? encoded : encoded.address };
};

const provider = new MockNetworkProvider();
const wallet = generateWallet();

const contractUtxos = {
    inflow: randomUtxo({
        token: randomToken({
            nft: randomNft(),
        })
    }),
    minting: randomUtxo({
        token: randomToken({
            nft: randomNft(),
        })
    }),
    collection: randomUtxo({
        token: randomToken({
            nft: randomNft(),
        })
    }),
    outflow: randomUtxo({
        token: randomToken({
            nft: randomNft(),
        })
    }),
    burn: randomUtxo({
        token: randomToken({
            nft: randomNft(),
        })
    }),
    distribution: randomUtxo({
        token: randomToken({
            nft: randomNft(),
        })
    }),
};

const asset1 = randomUtxo({
    token: randomToken(),
});
const asset2 = randomUtxo({
    token: randomToken(),
});

const multiToken = randomUtxo({
    token: randomToken({
        amount: 0n,
        nft: randomNft({
            capability: 'minting',
            commitment: '00,'
        }),
    }),
});

// const mintContract = new Contract(mint, [fundToken.token.category, proofOfCollection.token.category], { provider });
const inflowContract = new Contract(inflow, [], { provider });
const mintContract = new Contract(mint, [], { provider });
const collectionContract = new Contract(collection, [], { provider });

const outflowContract = new Contract(outflow, [], { provider });
const burnContract = new Contract(burn, [], { provider });
const distributeContract = new Contract(distribute, [], { provider });

const holdingsContract = new Contract(holdings, [], { provider });
