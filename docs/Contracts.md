# Deployment

```shell
yarn add --dev ora@4 chalk@4
```

Deployment helper are available in `scripts/`

1. `deploy-contract.js` creates new deployments, contract names are given as arguments
1. `deploy-proxy.js` creates new deployments with `ERC1967Proxy` proxy in front
1. `deploy-upgrade.js` deploys contract and upgrades proxy

`package.json` is extended with shortcuts:

```diff
    "contract:test": "hardhat test:jest",
    "contract:test:watch": "nodemon -e sol --exec 'hardhat test:jest --watch'",
+    "contract:build": "hardhat compile",
+    "contract:deploy": "node scripts/deploy-contract.js",
+    "contract:deploy:proxy": "node scripts/deploy-proxy.js",
+    "contract:deploy:upgrade": "node scripts/deploy-upgrade.js",
+    "contract:call": "node scripts/contract-call.js"
```



## Simple Contracts

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



## Upgradeable Contracts

**Initial Deployment**

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

**Upgrade Deployment**


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


## Contract Calls

`yarn contract:call <Contract Name> <Function Name> <Args>` can call or execute transactions on the deployed contract

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