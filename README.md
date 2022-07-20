# Getting Started with dApp

What you need to do:

1. Configure your own `privateKey` in `hardhat.config.js` _(generate one with: `` echo 0x`openssl rand -hex 32` ``)_
1. Put your contracts in `contracts` and build your react application in `src`

## Available Scripts

In the project directory, you can run:

### `yarn react:start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn react:test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn react:build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn react:eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### `yarn contract:test`

Runs the test runner in the none-interactive mode.
### `yarn contract:test:watch`

Launches the test runner in the interactive watch mode.

### `yarn contract:build`

Shortcut for `npx hardhat compile` which compiles the contracts

### `yarn contract:deploy`

Deploy contracts by name to the network. Append one or more contract names seperated by space to the command.

Contract information for access within the react application is written to `src/contracts/<NetworkName>/<ContractName>.json`

**Example**

```shell
$ yarn contract:deploy Test Test2
$ node scripts/deploy-contract.js Test Test2

Deploying to **TEST** network

ℹ [Test] Artifact written to src/contracts/test/Test.json
ℹ [Test] Transaction Id: 0x41d66727ef8585251325231e2fdd0d1f5141b1ff4344f640d1afe723140185e9
✔ [Test] Contract is now available at 0xe60E58731d22E683C6D4930B9c04F66cDbD7b789

ℹ [Test2] Artifact written to src/contracts/test/Test2.json
ℹ [Test2] Transaction Id: 0x2843ed8c3720958e7e6170a42f5697abf07ede596c3219520debbb9c6e3974b3
✔ [Test2] Contract is now available at 0x35Ff9586FB5a75bE3d94D7145449C848c51e6254

✨  Done in 43.10s.
```

### `yarn contract:deploy:proxy`

Deploy contracts by name to the network. Append one or more contract names seperated by space to the command.

Each contract must be upgradeable. For each contract proxy will be deployed and pointed to the deployment.

Contract information for access within the react application is written to `src/contracts/<NetworkName>/<ContractName>.json`

**Example**

```shell
$ yarn contract:deploy:proxy UpgradeableContract
$ node scripts/deploy-proxy.js UpgradeableContract

Deploying to **TEST** network

ℹ [UpgradeableContract] Artifact written to src/contracts/UpgradeableContract.json
ℹ [UpgradeableContract] Transaction Id: 0xd3f6512521ca99a7a1ea5ec66cfb5e2409ad28cf0f1b0e6375327703e8bb58aa
ℹ [UpgradeableContract] Contract is now available at 0x6eb60A80f33C0bABec9d0c5c2221308B1151525d
✔ [UpgradeableContract] Proxied Contract is now available at 0xD18aeae10c0d4C13276B0E745E6c0F08191F2085

✨  Done in 34.96s.
```

### `yarn contract:deploy:upgrade`

Deploy contracts by name to the network. Append one or more contract names seperated by space to the command.

Existing proxy deployments will be upgraded to point to the new location. The proxy address is read from previous deployments information in `src/contracts/<NetworkName>/<ContractName>.json`

**Example**

```shell
$ yarn contract:deploy:upgrade UpgradeableContract
$ node scripts/deploy-upgrade.js UpgradeableContract

Deploying to **TEST** network

ℹ [UpgradeableContract] Transaction Id: 0x8b12719d165b5e576939cff8f30d342ad748fb3eaaa51c4ae6c7b95a945a54f0
ℹ [UpgradeableContract] Contract is now available at 0xD8a85B8B20468E999121aA1865373F34d754D278
ℹ [UpgradeableContract] Artifact updated at src/contracts/UpgradeableContract.json
✔ [UpgradeableContract] Upgraded Contract available at Proxy 0xD18aeae10c0d4C13276B0E745E6c0F08191F2085

✨  Done in 26.54s.
```

### `yarn contract:call`

Calls a function on a deployed contract. ABI information and address are read from `src/contracts/<NetworkName>/<ContractName>.json`.

* Will `call` view-functions and execute others.
* Sending private key is (currently) used from `hardhat.config.js`

**Example**

```shell
$ yarn contract:call UpgradeableContract transferOwnership 0x105199a26b10e55300CB71B46c5B5e867b7dF427
$ node scripts/contract-call.js UpgradeableContract transferOwnership 0x105199a26b10e55300CB71B46c5B5e867b7dF427

Working on **TEST** network

ℹ [UpgradeableContract] 0xEDc433861F3115157225cA5ff04AD62A4261C4B8 executing transferOwnership(0x105199a26b10e55300CB71B46c5B5e867b7dF427)
ℹ [UpgradeableContract] emitted  OwnershipTransferred(address,address)
ℹ [UpgradeableContract] 
[
  "0x7eF0CbaDFc0da51A6153F35a99185B59a8cbc463",
  "0x105199a26b10e55300CB71B46c5B5e867b7dF427"
]
ℹ [UpgradeableContract] Gas costs: 31768 VTHO
✔ [UpgradeableContract] Completed with Transaction Id 0x91b1fb44892535e99042bbaa8fd03fa15d36f03eab2838eddd167a8013cdf0be

```

## Config

### Network

* `hardhat.config.js` contains
  * network configuration
  * private keys for deployment user
  * fee delegation sponsor
* prefix calls with `NETWORK=<network name>` to target a specific network