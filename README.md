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

### `yarn contract:deploy:proxy`

Deploy contracts by name to the network. Append one or more contract names seperated by space to the command.

Each contract must be upgradeable. For each contract proxy will be deployed and pointed to the deployment.

Contract information for access within the react application is written to `src/contracts/<NetworkName>/<ContractName>.json`

### `yarn contract:deploy:upgrade`

Deploy contracts by name to the network. Append one or more contract names seperated by space to the command.

Existing proxy deployments will be upgraded to point to the new location. The proxy address is read from previous deployments information in `src/contracts/<NetworkName>/<ContractName>.json`

### `yarn contract:call`

Calls a function on a deployed contract. ABI information and address are read from `src/contracts/<NetworkName>/<ContractName>.json`.

Private Key for transactions is used from `hardhat.config.js`.

## Config

### Network

* `hardhat.config.js` contains
  * network configuration
  * private keys for deployment user
  * fee delegation sponsor
* prefix calls with `NETWORK=<network name>` to target a specific network