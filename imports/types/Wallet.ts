interface Wallet {
  amount: number;
  sourceWalletId: string;
  destinationWalletId?: string;
  createdAt: Date;
}

export default Wallet;
