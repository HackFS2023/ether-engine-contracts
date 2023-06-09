import { ethers } from 'hardhat';

import type { EtherEngine } from '../typechain-types/EtherEngine';
import type { EtherEngine__factory } from '../typechain-types/factories/EtherEngine__factory';

async function main() {
  console.log('EtherEngine deploying....');

  // Multisig wallet required
  const owner = new ethers.Wallet(
    process.env.WALLET_PRIVATE_KEY || 'undefined',
    ethers.provider
  );

  const etherEngineFactory: EtherEngine__factory = <EtherEngine__factory>(
    await ethers.getContractFactory('EtherEngine', owner)
  );

  // Replace with the address of your LilypadEventsUpgradeable contract
  const lilypadAddress = '0xdC7612fa94F098F1d7BB40E0f4F4db8fF0bC8820';

  const etherEngine: EtherEngine = <EtherEngine>(
    await etherEngineFactory.deploy(lilypadAddress)
  );

  await etherEngine.deployed();
  console.log('EtherEngine deployed to ', etherEngine.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
