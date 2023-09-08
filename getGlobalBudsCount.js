const ethers = require('ethers');
require('dotenv').config();
const ABI = require('./ABI');
const DeployedAddresses = require('./getDeployedAddresses')


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

const getGlobalBudsCount = async () => {

    const chains = ["goerli", "mumbai", "bscTestnet"];

    const addresses = ["0x59D40bfAf1899A10E674c535acE5f577D57dD689", "0xe5Ddd0d2408Bb8C6559dDdC2923E3bFCB8DA16F3","0x422eB4C884f8f5054b28072cD53f44B605680ef6"];

    let count = BigInt(0);

    for(let i = 0; i < chains.length; i++){
        const provider = new ethers.JsonRpcProvider(await getProviderURL(chains[i]));

        const contract = new ethers.Contract(addresses[i], ABI, provider);

        const res = await contract.getNumberOfLocalStakedBuds();
        
        const resBig = BigInt(res);

        count+=resBig;
    }
    
    return count.toLocaleString();
}   

module.exports = getGlobalBudsCount

