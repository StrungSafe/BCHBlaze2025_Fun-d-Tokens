# BCHBlaze2025 - Fun(d) Tokens

Fun(d) Tokens is a user defined token that represents a basket of tokens. Fun(d) Tokens has on-chain minting, redeemption, and real-time auditing

## Chipnet Example

An example of a simple basket token comprised of two tokens can be found on chipnet:

[Minting Transaction](https://chipnet.chaingraph.cash/tx/5aa843322c03979a7b017d4f7876f3da4b1ba11fdc27d97c2c0b533229371274)

[Redeemption Transaction](https://chipnet.chaingraph.cash/tx/e1fbf2bf0a5947ef70faabc3a89251bac2ef6bac830b907035fda35821169dcb)

## Design Philosphy

Fun(d) Tokens focused on a composable contract structure.
The contracts are designed to work together to prove the transaction is currently spent and the contract composition allows for sending transactions in a flexible way.
Being composed of several transaction means Fun(d) Token transactions use several small contracts that focus on a focused piece of validation vs using one large contract or many chained contracts.

Each contract is designed to validate a single requirement about the transaction and is used in conjunction with others. This design relies on contract "proof by spend" to ensure the transaction properly spends the contract UTXOs. Anytime we see a contract in the transaction we can assume it's passed validation (because the network will reject transactions that don't).

### Inflow (Minting)

The inflow main contract and sub contracts asserts asset collection and allows minting of the basket token

#### Contracts

1. inflow.cash
    1. main contract, ensures all children are referenced and all children reference main 
    1. prevents circular dependencies
    1. call for fund creation/minting 
1. collection.cash
    1. verifies the required collateral is collected and sent to the appropriate contract 
1. mint.cash
    1. controls the release of the fund's tokens 

### Outflow

The outflow main contract and sub contracts asserts the basket token is burned and allows redeeming for the underlying assets

#### Contracts

1. outflow.cash
    1. main contract, ensures all children are referenced and all children reference main
    1. prevents circular dependencies
    1. call for redemption   
1. burn.cash
    1. burn or collect the fund token 
1. distribute.cash
    1. verify all the underlying assets are released 
1. holdings.cash
    1. verify releasing the correct token and amount   

## Technology

1. Javascript/Node
1. Cashscript/libauth

## Enhancements

1. A multi-minting and multi-burning design that allows for creating many tokens at once
1. Refactor the contracts to use fungible tokens type for the token
1. Contract optimization
1. Managed basket tokens
1. Market driven managed basket tokens
1. Make the token create more robust and flexible (currently hardcoded tokens and amounts and/or would require additional coding to expand tokens and adjust amounts)

## How to Run Mock Example

1. Clone to local, open terminal and navigate to clone folder
1. `cd ./contracts`
1. `yarn`
1. `yarn build`
1. `yarn mock`

## Dependencies

* Node v22.17.0
* Yarn v1.22.22
