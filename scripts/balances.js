const { ethers } = require("hardhat");
const { VESTING } = require("./addresses");

const clear = require("clear");

async function main() {
  clear();
  const TeamVesting = await ethers.getContractFactory("TeamVesting");

  let [deployer] = await ethers.getSigners();
  let chainID = await deployer.getChainId();

  console.log(`Signing by ${deployer.address}`);
  console.log(`Chain id  ${chainID}`);


  let teamVesting = TeamVesting.attach(VESTING);

  const totalReleasedRes = await teamVesting.getTotalReleased().call({ from: deployer.address });
  const totalAvailableRes = await teamVesting.getTotalAvailable().call({ from: deployer.address });
  console.log(`Total released: ${totalReleasedRes}`);
  console.log(`Total available: ${totalAvailableRes}`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
