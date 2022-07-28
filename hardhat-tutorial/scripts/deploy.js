const { ethers } = require("hardhat");
const { CRYPTO_NFT_DEV_ADDRESS } = require("../constants");

async function main() {
  const fakeNftMarketplace = await ethers.getContractFactory("FakeNFTMarketplace");
  const marketplace = await fakeNftMarketplace.deploy();
  await marketplace.deployed();
  console.log("FakeNFTMarketplace deployed to: ", marketplace.address);
  const CryptoDevDAO = await ethers.getContractFactory("CryptoDevsDAO");
  const daoContract = await CryptoDevDAO.deploy(marketplace.address, CRYPTO_NFT_DEV_ADDRESS, { value: ethers.utils.parseEther("0.05") });
  await daoContract.deployed();
  console.log("Dao contract with 0.05 ETH deployed to:", daoContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
