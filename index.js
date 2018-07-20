import createPrivateKeyHexString from "./lib/createPrivateKeyHexString";
import createEthereumKeyJson from "./lib/createEthereumKeyJson";
import decryptEthereumKeyJson from "./lib/decryptEthereumKeyJson";
import signTransaction from "./lib/signTransaction";

export const CreatePrivateKeyHexString = createPrivateKeyHexString;
export const CreateEthereumKeyJson = createEthereumKeyJson;
export const DecryptEthereumKeyJson = decryptEthereumKeyJson;
export const SignTransaction = signTransaction ;

// const pk = createPrivateKeyHexString();
// const keyJson = createEthereumKeyJson("12241224fuck", pk);

// console.error(pk);
// console.log(JSON.stringify(keyJson, null, 2));
// console.error(decryptEthereumKeyJson(keyJson, "12241224fuck"));
// console.error(
//   signTransaction(
//     decryptEthereumKeyJson(keyJson, "12241224fuck").privateKeyBuffer,
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
