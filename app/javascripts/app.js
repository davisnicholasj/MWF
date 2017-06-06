// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';

// Import our contract artifacts and turn them into usable abstractions.
import affair_artifacts from '../../build/contracts/Affair.json';
import purchase_artifacts from '../../build/contracts/Purchase.json';
import user_artifacts from '../../build/contracts/User.json';


// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.

function login() {
   var userMap = UserMapping.at(usersMapping).getUserByEmail(document.getElementById("emailLogin").value).then(function (userAddress) {
        var u = User.at(userAddress).getAccount().then(function (acc) {
            web3.personal.unlockAccount(acc, document.getElementById("passwordLogin").value, function (error, result) {
                if (!error) {
                    redirect("dashboard.html?id=" + userAddress);
                    //window.location.replace(window.location.pathname + "?id=" + userAddress);
                    user = userAddress;
                    console.log("Login was successful");
                } else {
                    console.log(error);
                }
            });
        }).catch(function (e) {
            console.log("User error: " + userAddress);
            console.log(e);
        });
    }).catch(function (e) {
        console.log("User mapping error:");
        console.log(e);
    });
}


window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});
