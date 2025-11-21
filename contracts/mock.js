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

const proofOfBurn = randomUtxo({
    token: randomToken({
        nft: randomNft(),
    })
});
const proofOfCollection = randomUtxo({
    token: randomToken({
        nft: randomNft(),
    })
});
const proofOfDistribution = randomUtxo({
    token: randomToken({
        nft: randomNft(),
    })
});

const asset1 = randomUtxo({
    token: randomToken(),
});
const asset2 = randomUtxo({
    token: randomToken(),
});

const fundToken = randomUtxo({
    token: randomToken({
        amount: 0n,
        nft: randomNft({
            capability: 'minting',
            commitment: '00,'
        }),
    }),
});



provider.addUtxo(wallet.address, initUtxo);





const authUtxo = initUtxo;
// amount: bigint;
//     category: string;
//     nft?: {
//         capability: 'none' | 'mutable' | 'minting';
//         commitment: string;
//     };
await new TransactionBuilder({ provider })
    .addInput(authUtxo, wallet.signatureTemplate.unlockP2PKH())
    .addOutput({
        to: wallet.address,
        amount: authUtxo.satoshis - 1000n,
        token: {
            amount: 0n,
            category: authUtxo.txid,
            nft: {
                capability: 'minting',
                commitment: '',
            }
        }
    })
    .send();

const mintingToken = (await provider.getUtxos(wallet.address))[0];

await new TransactionBuilder({ provider })
    .addInput(mintingToken, wallet.signatureTemplate.unlockP2PKH())
    .addOutput({
        to: wallet.address,
        amount: mintingToken.satoshis - 23000n,
    })
    .addOutput({
        to: wallet.address,
        amount: 10000n,
        token: {
            ...mintingToken.token,
        }
    })
    .addOutput({
        to: wallet.address,
        amount: 10000n,
        token: {
            ...mintingToken.token,
            nft: {
                capability: 'none',
                commitment: '',
            }
        }
    })
    .send();

const lastToken = (await provider.getUtxos(wallet.address))[2]
console.log(await provider.getUtxos(wallet.address));

await new TransactionBuilder({ provider })
    .addInput(lastToken, wallet.signatureTemplate.unlockP2PKH())
    .addOutput({
        to: wallet.address,
        amount: 1000n,
        token: {
            ...lastToken.token,
            amount: 0n
        }
    })
    .addOutput({
        to: wallet.address,
        amount: 1000n,
        token: {
            ...lastToken.token,
            amount: 0n
        }
    })
    .addOutput({
        to: wallet.address,
        amount: 1000n,
        token: {
            ...lastToken.token,
        }
    })
    .send();

console.log('last state', await provider.getUtxos(wallet.address));