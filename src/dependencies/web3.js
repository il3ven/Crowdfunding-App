import Web3 from 'web3';

const web3 = new Web3(window.ethereum);

window.ethereum.autoRefreshOnNetworkChange = false;

async function enableMetamask() {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            const accounts = await window.ethereum.enable();
            web3.eth.defaultAccount = accounts[0];
            // Acccounts now exposed
        } catch (error) {
            // User denied account access...
            alert("Enabling metamask is mandotory");
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed

    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
}

enableMetamask();

export default web3;