# Project Setup

```shell
yarn create react-app .
```

## React

```shell
yarn add react-app-rewired
yarn add --dev assert buffer crypto-browserify stream-http https-browserify os-browserify process stream-browserify util stream
```

patch `package.json` according to instructions. In the same step prefix with `react:` to clarify that commands relate to react:

```diff
  /* package.json */

  "scripts": {
-   "start": "react-scripts start",
+   "react:start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "react:build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "react:test": "react-app-rewired test",
-   "eject": "react-scripts eject"
+   "react:eject": "react-scripts eject"
}
```

and create a custom `config-overrides.js` to provide all required dependencies:

```js
const webpack = require('webpack')

module.exports = function override (config, env) {
  config.ignoreWarnings = [/Failed to parse source map/]
  config.resolve.fallback = {
    url: require.resolve('url'),
    assert: require.resolve('assert'),
    crypto: require.resolve('crypto-browserify'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify/browser'),
    buffer: require.resolve('buffer'),
    stream: require.resolve('stream-browserify')
  }

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  )

  return config
}
```



## Hardhat

```shell
yarn add --dev hardhat @nomiclabs/hardhat-waffle ethereum-waffle @nomiclabs/hardhat-ethers @vechain.energy/hardhat-thor @openzeppelin/contracts hardhat-jest-plugin nodemon hardhat-contract-sizer @openzeppelin/contracts-upgradeable web3-eth-abi 

✔ What do you want to do? · Create an empty hardhat.config.js
✨ Config file created ✨
```

configure vechain and plugins in `hardhat.config.js`:

```js
require('@nomiclabs/hardhat-waffle')
require('@vechain.energy/hardhat-thor')
require('hardhat-jest-plugin')
require('hardhat-contract-sizer')

module.exports = {
  solidity: '0.8.4',
  networks: {
    vechain: {
      url: 'https://testnet.veblocks.net',
      privateKey: '0x80b97e2ecfab8b1c78100c418328e8a88624e3d19928ec791a8a51cdcf01f16f',
      delegateUrl: 'https://sponsor-testnet.vechain.energy/by/90',
      blockGasLimit: 10000000
    },
    main: {
      url: 'https://mainnet.veblocks.net',
      privateKey: '0x80b97e2ecfab8b1c78100c418328e8a88624e3d19928ec791a8a51cdcf01f16f',
      blockGasLimit: 10000000
    }
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
    only: []
  }
}
```

Init jest tests:

```shell
$ npx jest --init  

The following questions will help Jest to create a suitable configuration for your project

✔ Would you like to use Jest when running "test" script in "package.json"? … no
✔ Would you like to use Typescript for the configuration file? … no
✔ Choose the test environment that will be used for testing › node
✔ Do you want Jest to add coverage reports? … no
✔ Which provider should be used to instrument code for coverage? › babel
✔ Automatically clear mock calls, instances and results before every test? … yes

📝  Configuration file created at ./jest.config.js

```

Modify `jest.config.js` to execute tests only from contracts or tests folder:

```diff
  // A list of paths to directories that Jest should use to search for files in
-  // roots: [
-  //   "<rootDir>"
-  // ],
+  roots: [
+    "contracts",
+    "tests"
+  ],
```

and create both folders:

```shell
mkdir -p tests contracts
```

To execute hardhat tests easily, a new script `contract:test` and `contract:test:watch` is added to `package.json`:

```diff
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject",
+    "contract:test": "hardhat test:jest",
+    "contract:test:watch": "nodemon -e sol --exec 'hardhat test:jest --watch'"
  },
```

## Helpers

* standardjs

## UI Libraries

```shell
yarn add @vechain.energy/use-vechain antd @ant-design/icons
```
