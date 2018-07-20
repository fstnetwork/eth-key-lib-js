import createPrivateKeyHexString from "./lib/createPrivateKeyHexString";
import createEthereumKeyJson from "./lib/createEthereumKeyJson";
import decryptEthereumKeyJson from "./lib/decryptEthereumKeyJson";
import signTransaction from "./lib/signTransaction";

export const CreatePrivateKeyHexString = createPrivateKeyHexString;
export const CreateEthereumKeyJson = createEthereumKeyJson;
export const DecryptEthereumKeyJson = decryptEthereumKeyJson;
export const SignTransaction = signTransaction;

if (!(typeof self === "undefined")) {
  self.eth_key_lib_CreatePrivateKeyHexString = createPrivateKeyHexString;
  self.eth_key_lib_CreateEthereumKeyJson = createEthereumKeyJson;
  self.eth_key_lib_DecryptEthereumKeyJson = decryptEthereumKeyJson;
  self.eth_key_lib_SignTransaction = signTransaction;
}

// Code sample:
//
// const pk = createPrivateKeyHexString();
// const keyJson = createEthereumKeyJson("!!321iamastrongpassphrase123!!", pk);

// console.log("The private key is", pk);
// console.log("The key json is", JSON.stringify(keyJson, null, 2));
// console.log(
//   "The decrypted privatekey the from key json is",
//   "0x" +
//     decryptEthereumKeyJson(
//       keyJson,
//       "!!321iamastrongpassphrase123!!"
//     ).privateKeyBuffer.toString("hex")
// );
// console.log(
//   signTransaction(
//     decryptEthereumKeyJson(keyJson, "!!321iamastrongpassphrase123!!")
//       .privateKeyBuffer,
//     {
//       chainId: 42,
//       data: "0x",
//       gas: "0x5208",
//       gasPrice: "0x3b9aca00",
//       nonce: "0xed",
//       to: "0x1211ef4E91607766a19e544a2F8d0CA68837cAd0",
//       value: "0xc12dc63fa970000"
//     }
//   )
// );
