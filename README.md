# BCHBlaze2025 - Fun(d) Tokens

Fun(d) Tokens is a user defined token that represents a basket of tokens. Fun(d) Tokens has on-chain minting, redeemption, and real-time auditing

## Design Philosphy

Fun(d) Tokens focused on a composable contract structure.
The contracts are designed to work together to prove the transaction is currently designed in a highly parraelizable way.
This means Fun(d) Token transactions use several smaller contracts that focus on small pieces of validation instead of using one large or many chained contracts.

### Inflow

The inflow main contract and sub contracts asserts asset collection and allows minting of the basket token

### Outflow

The outflow main contract and sub contracts asserts the basket token is burned and allows redeeming for the underlying assets

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

## Chipnet Example

An example of a simple basket token comprised of two tokens can be found on chipnet:

[Minting Transaction](https://chipnet.chaingraph.cash/tx/5aa843322c03979a7b017d4f7876f3da4b1ba11fdc27d97c2c0b533229371274)

[Redeemption Transaction](https://chipnet.chaingraph.cash/tx/e1fbf2bf0a5947ef70faabc3a89251bac2ef6bac830b907035fda35821169dcb)
