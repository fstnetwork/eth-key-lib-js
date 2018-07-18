import { fromV3 } from "ethereumjs-wallet";

export default function decryptEthereumKeyJson(keyJson, passphrase) {
  const tmpWallet = fromV3(keyJson, passphrase);

  return {
    privateKeyBuffer: tmpWallet.getPrivateKey(),
    addressString: "0x" + tmpWallet.getAddress().toString("hex"),
    checksumAddressString: tmpWallet.getChecksumAddressString()
  };
}
