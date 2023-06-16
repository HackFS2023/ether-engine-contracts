# EtherEngine

EtherEngine is a smart contract that interacts with the LilypadEventsUpgradeable contract. It allows users to run jobs on the Ethereum network. This project is currently set up to work with the Calibration Testnet.

## Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ether-engine.git
```

2. Install dependencies:

```bash
npm install
```

3. Compile the contract:

```bash
npx hardhat compile
```

## Deployment

To deploy the EtherEngine contract, you need to provide the address of the already deployed LilypadEventsUpgradeable contract. For the Calibration Testnet, we are using the following proxy address: `0xdC7612fa94F098F1d7BB40E0f4F4db8fF0bC8820`.

You can deploy the contract using the provided script:

```bash
npx hardhat run scripts/deploy.js
```

## Testing

You can test the contract using the provided test script:

```bash
npx hardhat test
```

## Usage

After deploying the contract, you can interact with it using the EtherEngine interface. You can run jobs by calling the `runJob` function and providing the job specification as a string.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
