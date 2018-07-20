# eth-key-lib-js

This repository contains the essential helper functions for creating ethereum key json, decrypt ethereum key json and signing message / transaction

## Installation

    npm i "https://github.com/funderstoken/eth-key-lib-js"
or

	yarn add "https://github.com/funderstoken/eth-key-lib-js"
or (in browser)

	<script src="dist/eth-key-lib-js-browser.js"></script>
	// then inject below functions to global (window):
	//   window.EthKeyLibBrowser.CreatePrivateKeyHexString
	//   window.EthKeyLibBrowser.CreateEthereumKeyJson
	//   window.EthKeyLibBrowser.DecryptEthereumKeyJson
	//   window.EthKeyLibBrowser.SignTransaction
	//   window.EthKeyLibBrowser.TestEthKeyLib

## Functions

 1. CreatePrivateKeyHexString

     `CreatePrivateKeyHexString(): hexString`

	This is the first step for generating the wallet.
	
    Please DO NOT store this hex string at anywhere.

 2. CreateEthereumKeyJson

     `CreateEthereumKeyJson(passphrase: string, privateKeyHexString: hexString): KeyJsonV3`

	This KeyJson file is safe to store, but still not good to be public.

	And this file is compatible to most of the Ethereum wallets.

 3. DecryptEthereumKeyJson

     `DecryptEthereumKeyJson(passphrase: string, keyJson: KeyJsonV3): WalletObj`

    The WalletObj is not safe to store, it contains private key buffer.

    The schema of the WalletObj is (for example) :

		{
		  privateKeyBuffer: (Buffer),
		  addressString: "0xb1e8ecea490454339610baa1b77e2335321fa2d1",
		  checksumAddressString: "0xB1e8ECeA490454339610BaA1B77E2335321fa2D1"
		}

 4. SignTransaction

     `SignTransaction(privateKeyBuffer: buffer, transactionObject: TxObj): string`

	And then the broadcast the signed transaction hex string to the Ethereum network.

	About the schema of TxObj, please  refer to the next section.

5. TestEthKeyLib (for testing)

     `TestEthKeyLib(): void`

	Source :

        function TestEthKeyLib() {
          const pk = createPrivateKeyHexString();
          const keyJson = createEthereumKeyJson("!!321iamastrongpassphrase123!!", pk);
          const decryptedWalletObj = decryptEthereumKeyJson(
            "!!321iamastrongpassphrase123!!",
            keyJson
          );
        
          console.log("The private key is", pk);
          console.log("The key json is", JSON.stringify(keyJson, null, 2));
          console.log(
            "The decrypted privatekey from the key json is",
            "0x" + decryptedWalletObj.privateKeyBuffer.toString("hex")
          );
          console.log(
            "The signed transaction hex string is",
            signTransaction(decryptedWalletObj.privateKeyBuffer, {
              chainId: 42,
              data: "0x",
              gas: "0x5208",
              gasPrice: "0x3b9aca00",
              nonce: "0xed",
              to: "0x1211ef4E91607766a19e544a2F8d0CA68837cAd0",
              value: "0xc12dc63fa970000"
            })
          );
        }

	Console output :
	

	    The private key is 0x8094b1d2cd79b47a9e9c440e15452b8af50584b064bddfafd11da50030e64932
		The key json is {
		  "version": 3,
		  "id": "642ce934-fe22-499b-ad8b-582d9d5d45f4",
		  "address": "b1e8ecea490454339610baa1b77e2335321fa2d1",
		  "crypto": {
		    "ciphertext": "2d4f45e27f6046858b99d9efc4bb2c087719f39dedfd67fbbafb47c87cb0bce6",
		    "cipherparams": {
		      "iv": "c202cef938274df1b7e2eae5170c0397"
		    },
		    "cipher": "aes-128-ctr",
		    "kdf": "pbkdf2",
		    "kdfparams": {
		      "c": 20480,
		      "dklen": 32,
		      "prf": "hmac-sha256",
		      "salt": "2fc93d120b7438a3849d03b49e4566a7045ccc67c3f1c5b5f8f82cf261236815"
		    },
		    "mac": "836e370599a3876233780057eecc8f9acc99bee0a740c5f36b1d0eedfdb4f699"
		  }
		}
		The decrypted privatekey from the key json is 0x8094b1d2cd79b47a9e9c440e15452b8af50584b064bddfafd11da50030e64932
		The signed transaction hex string is 0xf86c81ed843b9aca00825208941211ef4e91607766a19e544a2f8d0ca68837cad0880c12dc63fa9700008078a039da9aaae0d2ded6c141ba9fccdb79b96eb2bd00a5e43d6d24aa59e5019f3d5ba053999c2463f98de70bf5c34e8dfdb353a0343a43cfddec54835841a3c4e95288
