/** @format */

const hre = require("hardhat");

async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  //   return hre.ethers.utils.formatEther(balanceBigInt);
  return ethers.formatEther(balanceBigInt);
}

async function printBalances(addresses) {
  let idx = 0;
  //   console.log("PASSED IN ADDRESSES", addresses);
  for (const address of addresses) {
    console.log(`Address ${idx} balance: `, await getBalance(address));
    idx++;
  }
}

async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(
      `At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`
    );
  }
}

async function main() {
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();

  //   await buyMeACoffee.deployed();
  await buyMeACoffee.waitForDeployment();
  //   console.log("BuyMeACoffee deployed to:", buyMeACoffee.address);
  console.log("BuyMeACoffee deployed to:", buyMeACoffee.target);

  const addresses = [owner.address, tipper.address, buyMeACoffee.target];
  console.log("== start ==");
  await printBalances(addresses);

  const tip = { value: hre.ethers.parseEther("1") };
  console.log("TIP VALUE", tip);
  await buyMeACoffee
    .connect(tipper)
    .buyMeACoffee("Carolina", "You're the best!", tip);
  await buyMeACoffee
    .connect(tipper2)
    .buyMeACoffee("Vitto", "Amazing teacher", tip);
  await buyMeACoffee
    .connect(tipper3)
    .buyMeACoffee("Kay", "I love my Proof of Knowledge", tip);

  console.log("== bought coffee ==");
  await printBalances(addresses);

  await buyMeACoffee.connect(owner).withdrawTips();

  console.log("== withdrawTips ==");
  await printBalances(addresses);

  console.log("== memos ==");
  const memos = await buyMeACoffee.getMemos();
  printMemos(memos);
}

main().then(() =>
  process.exit(0).catch(error => {
    console.error(error);
    process.exit(1);
  })
);
