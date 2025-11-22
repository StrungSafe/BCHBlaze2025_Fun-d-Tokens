import {
    Contract,
    MockNetworkProvider,
    randomToken,
} from 'cashscript';
import {
    swapEndianness
} from '@bitauth/libauth';

import bytecode from './art/bytecode.json' with { type: 'json' };

import holdings from './art/holdings.json' with { type: 'json' };

const provider = new MockNetworkProvider();
// let bytecodeContract = new Contract(bytecode, [100n, 200n], { provider });

// console.log('template bytecode', bytecode.debug.bytecode);
// console.log('contract 0', bytecodeContract.bytecode);

const token = randomToken();
const category = swapEndianness(token.category);

const contract = new Contract(holdings, [category, category, 100n], { provider });

console.log('template', holdings.debug.bytecode);
console.log('actual', contract.bytecode);


