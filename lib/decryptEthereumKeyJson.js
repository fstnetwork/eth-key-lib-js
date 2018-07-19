const wallet = require("ethereumjs-wallet");

export default function decryptEthereumKeyJson(keyJson, passphrase) {
  let walletObj = null;

  try {
    const tmpWallet = wallet.fromV3(keyJson, passphrase);

    walletObj = {
      privateKeyBuffer: tmpWallet.getPrivateKey(),
      addressString: "0x" + tmpWallet.getAddress().toString("hex"),
      checksumAddressString: tmpWallet.getChecksumAddressString()
    };
  } catch (err) {
    console.error("Wrong passphrase,", err);
  }

  if (walletObj === null || walletObj === undefined) {
    throw new Error("Wrong passphrase");
  }

  return walletObj;
}
