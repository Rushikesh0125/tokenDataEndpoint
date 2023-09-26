const ethers = require('ethers');
require('dotenv').config();
const ABI = require('../ABIs/stakingABI');
const DeployedAddresses = require('../getDeployedAddresses')

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

const getLastEvent = async (chain, func, startBlock, contractAddress) => {
    try{

    
        const provider = new ethers.JsonRpcProvider(await getProviderURL(chain));
        const contract = new ethers.Contract(contractAddress, ABI, provider);

        const latestBlockNumber = await provider.getBlockNumber();

        var data2 = [];
        if(func == "stake"){
            //var data2 = await contract.queryFilter("BudsStaked", Number(startBlock), latestBlockNumber);
            var filter = contract.filters.BudsStaked(null, null, null, null, null);
            data2 = await contract.queryFilter(filter, Number(startBlock), latestBlockNumber);
            data2 = data2.map((el) => ({sender:el.args[0], amount:Number(el.args[1].toString())/1e18, currentBlock: latestBlockNumber,  transactionBlock:el.blockNumber}))
        }
        if(func == "raid"){
            //var data2 = await contract.queryFilter("Raided", Number(startBlock), latestBlockNumber)
            var filter = contract.filters.Raided(null, null, null, null)
            data2 = await contract.queryFilter(filter, Number(startBlock), latestBlockNumber)
            data2 = data2.map((el) => ({ raider: el.args[0], status: el.args[1], currentBlock: latestBlockNumber, transactionBlock:el.blockNumber}))
        }
        console.log(data2)
        return data2;

    }catch(error){
        console.error('Error in getLastEvent:', error);
        throw error;
    }
    
}


module.exports = getLastEvent