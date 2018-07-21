import createPrivateKeyHexString from "./lib/createPrivateKeyHexString";
import createEthereumKeyJson from "./lib/createEthereumKeyJson";
import decryptEthereumKeyJson from "./lib/decryptEthereumKeyJson";
import signTransaction from "./lib/signTransaction";

export const CreatePrivateKeyHexString = createPrivateKeyHexString;
export const CreateEthereumKeyJson = createEthereumKeyJson;
export const DecryptEthereumKeyJson = decryptEthereumKeyJson;
export const SignTransaction = signTransaction;

// Code sample:
export function TestEthKeyLib() {
  const pk = createPrivateKeyHexString();
  const keyJson = createEthereumKeyJson("!!321iamastrongpassphrase123!!", pk);
  const decryptedWalletObj = decryptEthereumKeyJson(
    "!!321iamastrongpassphrase123!!",
    keyJson
  );

  console.log("The private key is", pk);
  console.log("The key json is", JSON.stringify(keyJson, null, 2));
  console.log(
    "The decrypted wallet obj from the key json is",
    JSON.stringify(decryptedWalletObj, null, 2)
  );
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

if (!(typeof self === "undefined")) {
  self.EthKeyLibBrowser = {};
  self.EthKeyLibBrowser.CreatePrivateKeyHexString = createPrivateKeyHexString;
  self.EthKeyLibBrowser.CreateEthereumKeyJson = createEthereumKeyJson;
  self.EthKeyLibBrowser.DecryptEthereumKeyJson = decryptEthereumKeyJson;
  self.EthKeyLibBrowser.SignTransaction = signTransaction;
  self.EthKeyLibBrowser.TestEthKeyLib = TestEthKeyLib;
}
