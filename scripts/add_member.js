const { ethers } = require("hardhat");
const { TOKEN, VESTING } = require("./addresses");
const inputConfirm = require("../scripts/cli/cli_confirm.js");
const askMember = require("../scripts/cli/cli_add_member.js");

const chalk = require("chalk");
const clear = require("clear");

async function main() {
  clear();
  const TeamVesting = await ethers.getContractFactory("TeamVesting");

  let [deployer] = await ethers.getSigners();
  let chainID = await deployer.getChainId();

  console.log(`Signing by ${deployer.address}`);
  console.log(`Chain id  ${chainID}`);

  console.log(`\n\n`);

  let title = "Adding a new member!";

  let memberData = await askMember();
  let address = memberData.MEMBER;
  let allowance = memberData.ALLOWANCE;
  let duration = memberData.DURATION;

  let params = {
    address: chalk.green(address),
    allowance: chalk.green(allowance),
    duration: chalk.green(duration),
  };

  await inputConfirm(title, params);

  let teamVesting = TeamVesting.attach(VESTING);

  const result = await teamVesting.addInvestor(address, allowance * 10 ** 18, duration);
  console.log(result.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
