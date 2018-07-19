import { randomBytes, pbkdf2Sync, createCipheriv } from "crypto-browserify";

const ethJsAccount = require("ethjs-account");
const privateToAccount = ethJsAccount.privateToAccount;

import uuidv4 from "uuid/v4";
import createKeccakHash from "keccak";

export default function createEthereumKeyJson(passphrase, privateKeyHexString) {
  let privateKeyHexStringTestArray = privateKeyHexString.split("0x");
  let _privateKeyHexString = null;

  if (privateKeyHexStringTestArray.length === 1) {
    _privateKeyHexString = privateKeyHexString;
  }

  if (
    privateKeyHexStringTestArray.length === 2 &&
    privateKeyHexStringTestArray[0] === ""
  ) {
    _privateKeyHexString = privateKeyHexStringTestArray[1];
  }

  if (_privateKeyHexString === null) {
    throw new Error(
      "Creating ethereum key json is failed, privateKeyHexString format error:",
      privateKeyHexString
    );
  }

  let keyJson = null;

  try {
    const privateKeyBuffer = Buffer.from(_privateKeyHexString, "hex");
    const address = privateToAccount(_privateKeyHexString)
      .address.toLowerCase()
      .replace("0x", "");

    const salt = randomBytes(32);
    const iv = randomBytes(16);

    const kdf_c = 20480;
    const kdf_dklen = 32;
    const kdf_prf = "hmac-sha256";

    const derivedKey = pbkdf2Sync(
      Buffer.from(passphrase),
      salt,
      kdf_c,
      kdf_dklen,
      "sha256"
    );

    const cipher = createCipheriv("aes-128-ctr", derivedKey.slice(0, 16), iv);

    const ciphertext = Buffer.concat([
      cipher.update(privateKeyBuffer),
      cipher.final()
    ]);

    const mac = createKeccakHash("keccak256")
      .update(
        Buffer.concat([
          derivedKey.slice(16, 32),
          Buffer.from(ciphertext, "hex")
        ])
      )
      .digest();

    keyJson = {
      version: 3,
      id: uuidv4({ random: randomBytes(16) }),
      address: address,
      crypto: {
        ciphertext: ciphertext.toString("hex"),
        cipherparams: {
          iv: iv.toString("hex")
        },
        cipher: "aes-128-ctr",
        kdf: "pbkdf2",
        kdfparams: {
          c: kdf_c,
          dklen: kdf_dklen,
          prf: kdf_prf,
          salt: salt.toString("hex")
        },
        mac: mac.toString("hex")
      }
    };
  } catch (err) {
    console.error("Creating ethereum key json is failed,", err);
  }

  if (keyJson === null || keyJson === undefined) {
    throw new Error("Creating ethereum key json is failed");
  }

  return keyJson;
}
