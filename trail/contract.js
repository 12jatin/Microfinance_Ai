let web3;
let loanManager;
let account;

async function connectToBlockchain() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = LoanManager.networks[networkId];
        loanManager = new web3.eth.Contract(
            LoanManager.abi,
            deployedNetwork && deployedNetwork.address,
        );
        account = (await web3.eth.getAccounts())[0];
        console.log("Connected Account:", account);
    } else {
        alert("MetaMask is not installed.");
    }
}

// Call this function on page load to automatically connect to the blockchain
window.onload = () => {
    connectToBlockchain();
};
