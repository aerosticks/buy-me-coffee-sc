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

0xdbd3742850d225857fecfe296d078249c513b418

https://sepolia.etherscan.io/address/0xdBD3742850D225857feCFe296D078249C513b418
