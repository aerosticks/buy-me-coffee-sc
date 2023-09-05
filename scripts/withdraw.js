/** @format */

const hre = require("hardhat");
const abi = require("../artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json");

async function getBalance(provider, address) {
  const balanceBigInt = await provider.getBalance(address);
  return hre.ethers.formatEther(balanceBigInt);
}

async function main() {
  const contractAddress = "0xdbd3742850d225857fecfe296d078249c513b418";
  const contractABI = abi.abi;

  //   const provider = new hre.ethers.providers.AlchemyProvider(
  //     "sepolia",
  //     process.env.SEPOLIA_API_KEY
  //   );

  const provider = hre.ethers.provider;

  const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const buyMeACoffee = new hre.ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  console.log(
    "current balance of owner: ",
    await getBalance(provider, signer.address),
    "ETH"
  );

  const contractBalance = await getBalance(provider, buyMeACoffee.target);

  console.log(
    "current balance of contract: ",
    await getBalance(provider, buyMeACoffee.target)
  );

  if (contractBalance !== "0.0") {
    console.log("withdraw funds..");
    const withdrawTxn = await buyMeACoffee.withdrawTips();
    await withdrawTxn.wait();
  } else {
    console.log("no funds to withdraw!");
  }

  console.log(
    "current balance of owner: ",
    await getBalance(provider, signer.address),
    "ETH"
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
