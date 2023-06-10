import { ethers } from 'hardhat';

import type { EtherEngine } from '../typechain-types/EtherEngine';
import type { EtherEngine__factory } from '../typechain-types/factories/EtherEngine__factory';

async function main() {
  console.log('Interacting with EtherEngine....');

  // Multisig wallet required
  const owner = new ethers.Wallet(
    process.env.WALLET_PRIVATE_KEY || 'undefined',
    ethers.provider
  );

  const etherEngineFactory: EtherEngine__factory = <EtherEngine__factory>(
    await ethers.getContractFactory('EtherEngine', owner)
  );

  // Replace with the address of your deployed EtherEngine contract
  const etherEngineAddress = '0xA046f3D754B57Ef4DCCAa945cdcDbEFD7f072089';

  const etherEngine: EtherEngine = <EtherEngine>(
    etherEngineFactory.attach(etherEngineAddress)
  );

  console.log('Connected to EtherEngine at ', etherEngine.address);

  // Test runJob function
  console.log('Running a job....');
  const spec = '{"engine": "docker", "source": {"docker": {"image": "ubuntu"}}, "command": ["echo", "Hello, World!"]}';
  const tx = await etherEngine.runJob(spec, { value: ethers.utils.parseEther("0.1") });
  await tx.wait();
  console.log('Job run successfully');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
