import {
  init,
  AUTH_PROVIDER,
  CHAIN,
  THEME,
  WALLET_PROVIDER,
  SUPPORTED_ETHEREUM_NETWORKS,
  signIn,
  signOut,
} from "@ramper/ethereum";

init({
  appId: "woasnzlpmt",
  appName: "EVM Test App",
  authProviders: [
    AUTH_PROVIDER.GOOGLE,
    AUTH_PROVIDER.FACEBOOK,
    AUTH_PROVIDER.TWITTER,
    AUTH_PROVIDER.APPLE,
    AUTH_PROVIDER.EMAIL,
  ],
  walletProviders: [WALLET_PROVIDER.METAMASK],
  network: SUPPORTED_ETHEREUM_NETWORKS.MATICMUM,
  theme: THEME.DARK,
});

export { signIn, signOut };
