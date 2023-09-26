const ethers = require('ethers');
require('dotenv').config();

const getProviderURL = async (networkName) => {
    switch(networkName){
        case"mainnet":
            return process.env.MAINNET
        case"goerli":
            return process.env.GOERLI_URL
        case"polygon":
            return process.env.POLYGON
        case"mumbai":
            return process.env.MUMBAI_URL
        case"bsc":
            return process.env.BSC
        case"bscTestnet":
            return process.env.BSCTESTNET_URL
        case"avalanche":
            return process.env.AVALANCH
        case"fuji":
            return process.env.FUJI
        case"arbitrum":
            return process.env.ARBITRUM  
    }
}

const getBlockNumber = async (chain) => {
    try{
        const provider = new ethers.JsonRpcProvider(await getProviderURL(chain));
        const latestBlockNumber = await provider.getBlockNumber();
        console.log(latestBlockNumber);
        return latestBlockNumber;

    }catch(error){
        console.error('Error in getLastEvent:', error);
        throw error;
    }
    
}

module.exports = getBlockNumber