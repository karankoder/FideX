import { ethers } from "hardhat";

export default async function deploy() {
  const CONTRACT_NAME = "FedX";

  const [deployer] = await ethers.getSigners(); // Get the deployer's account

  // Fetch and log the deployer's balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`Deployer address: ${deployer.address}`);
  console.log(`Deployer balance: ${ethers.formatEther(balance)} ETH`);

  console.log(`Deploying ${CONTRACT_NAME} contract...`);

  const contractFactory = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = await contractFactory.deploy();
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log(`${CONTRACT_NAME} deployed to: ${contractAddress}`);
}
