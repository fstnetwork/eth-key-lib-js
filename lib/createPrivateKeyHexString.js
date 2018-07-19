import { randomBytes } from "crypto-browserify";

const ethJsAccount = require("ethjs-account");
const generate = ethJsAccount.generate;

function getRandomBytesHexString() {
  return randomBytes(256).toString("hex");
}

export default function createPrivateKeyHexString() {
  let privateKeyHexString = null;

  try {
    const tmpPrivateKeyHexString = generate(getRandomBytesHexString())
      .privateKey;
    privateKeyHexString = tmpPrivateKeyHexString;
  } catch (err) {
    console.error("Creating private key is failed,", err);
  }

  if (privateKeyHexString === null || privateKeyHexString === undefined) {
    throw new Error("Creating private key is failed");
  }

  return privateKeyHexString;
}
