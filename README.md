# BCHBlaze2025_Fun-d-Tokens

Fun(d) Tokens is a user defined token that represents a basket of tokens. Fun(d) Tokens has on-chain minting, redeemption, and real-time auditing

## Design Philosphy

Fun(d) Tokens focused on a composable contract structure.
The contracts are designed to work together to prove the transaction is currently designed in a highly parraelizable way.
This means Fun(d) Token transactions use several smaller contracts that focus on small pieces of validation instead of using one large or many chained contracts.

### Inflow

The inflow main contract and sub contracts asserts asset collection and allows minting of the composite token

### Outflow

The outflow main contract and sub contracts asserts the composite token is burned and allows redeeming for the underlying assets

## Technology

1. Javascript/Node
1. Cashscript/libauth

## Enhancements

1. A multi-minting and multi-burning design that allows for creating many composite tokens at once
1. Refactor the contracts to use fungible tokens type for the composite token
1. Contract optimization
1. Managed composite tokens that act as managed funds
1. Market driven managed composite tokens
1. Make the composite token create more robust and flexible (currently hardcoded baset tokens and amounts)

## How to Run Mock Example

1. Clone to local, open terminal and navigate to clone folder
1. `cd ./contracts`
1. `yarn`
1. `yarn build`
1. `yarn mock`

## Chipnet Example

A chipnet example can be found here:

[Minting Transaction -- TODO]()
[Redeemption Transaction -- TODO]()