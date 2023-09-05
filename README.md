<!-- @format -->

# buy-me-coffee-sc

## SAMPLE HARDHAT CONFIG FILE

    // hardhat.config.js

    require("@nomicfoundation/hardhat-toolbox");

    require("dotenv").config()

    // You need to export an object to set up your config
    // Go to https://hardhat.org/config/ to learn more

    const GOERLI_URL = process.env.GOERLI_URL;

    const PRIVATE_KEY = process.env.PRIVATE_KEY;

        module.exports = {

            solidity: "0.8.4",

            networks: {

                goerli: {

                    url: GOERLI_URL,

                    accounts: [PRIVATE_KEY]

                }

            }

        };

### Deployed contract address (sepolia)

0x2747724BEb99F625E99b350f2fec1631fB1cd9A8

https://sepolia.etherscan.io/address/0x2747724BEb99F625E99b350f2fec1631fB1cd9A8
