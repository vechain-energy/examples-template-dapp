const { ethers } = require('hardhat')
const { BigNumber } = ethers
const Web3EthAbi = require('web3-eth-abi')
const ERC1967Proxy = require('@openzeppelin/contracts/build/contracts/ERC1967Proxy.json')

const contracts = {}
const users = {}

beforeEach(async function () {
  [users.owner, users.user1, users.user2, users.user3, users.user4] = await ethers.getSigners()
  contracts.myToken = await getContractWithProxy('MyToken')
})

describe('MyToken', () => {
  describe('Initialization', () => {
    it('sets msg.sender as default admin', async () => {
      const contract = await getContractWithProxy('MyToken')
      const role = '0x0000000000000000000000000000000000000000000000000000000000000000'
      const isOwner = await contract.hasRole(role, users.owner.address)
      expect(isOwner).toEqual(true)
    })
  })

  describe('mint(to, amount)', () => {
    it('mints correct amount for recipient', async () => {
      const amount = BigNumber.from(12345)
      await contracts.myToken.mint(users.user1.address, amount)
      const balance = await contracts.myToken.balanceOf(users.user1.address)
      expect(balance).toEqual(amount)
    })
  })
})

async function getContractWithProxy (contractName) {
  // get contract details
  const Contract = await ethers.getContractFactory(contractName)
  const contract = await Contract.deploy()

  const Proxy = await ethers.getContractFactoryFromArtifact(ERC1967Proxy)

  // calculate initialize() call during deployment
  const callInitialize = Web3EthAbi.encodeFunctionCall(
    Contract.interface.fragments.find(({ name }) => name === 'initialize'), []
  )

  // deploy proxy pointing to contract
  const proxy = await Proxy.deploy(contract.address, callInitialize)

  // return proxy address attached with contract functionality
  const proxiedContract = Contract.attach(proxy.address)
  return proxiedContract
}
