import Tx from "ethereumjs-tx";

// transactionObject schema example:
//
// { 
//   chainId: 42,
//   data: "0x",
//   gas: "0x5208",
//   gasPrice: "0x3b9aca00",
//   nonce: "0xed",
//   to: "0x1211ef4E91607766a19e544a2F8d0CA68837cAd0",
//   value: "0xc12dc63fa970000"
// }
//

export default function signTransaction(privateKeyBuffer, transactionObject) {
  const tx = new Tx(transactionObject);
  tx.sign(privateKeyBuffer);
  const serializedTx = tx.serialize();
  return "0x" + serializedTx.toString("hex");
}
