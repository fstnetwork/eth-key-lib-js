import { generate } from "ethereumjs-wallet";

export default function createPrivateKeyHexString() {
  let privateKeyHexString = null;

  try {
    const tmpWallet = generate();
    privateKeyHexString = "0x" + tmpWallet.getPrivateKey().toString("hex");
  } catch (err) {
    console.error("Creating private key is failed,", err);
  }

  if (privateKeyHexString === null || privateKeyHexString === undefined) {
    throw new Error("Creating private key is failed");
  }

  return privateKeyHexString;
}
