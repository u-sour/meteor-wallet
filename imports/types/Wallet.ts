interface Wallet {
  amount: number;
  sourceWalletId: string;
  destinationContactId?: string;
  createdAt: Date;
}

export default Wallet;
