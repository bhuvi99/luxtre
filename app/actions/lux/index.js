// @flow
import WalletsActions from './wallets-actions';
import LuxRedemptionActions from './lux-redemption-actions';
import TransactionsActions from './transactions-actions';
import NodeUpdateActions from './node-update-actions';
import WalletSettingsActions from './wallet-settings-actions';
import AddressesActions from './addresses-actions';
import MasternodesActions from './masternodes-actions';
import LsrTokensActions from './lsrtokens-actions';
import ContractsActions from './contracts-actions';
import ConsoleActions from './dconsole-actions';

export type LuxActionsMap = {
  wallets: WalletsActions,
  luxRedemption: LuxRedemptionActions,
  transactions: TransactionsActions,
  nodeUpdate: NodeUpdateActions,
  walletSettings: WalletSettingsActions,
  addresses: AddressesActions,
  masternodes: MasternodesActions,
  lsrtokens: LsrTokensActions,
  contracts: ContractsActions,
  dconsole: ConsoleActions
};

const luxActionsMap: LuxActionsMap = {
  wallets: new WalletsActions(),
  luxRedemption: new LuxRedemptionActions(),
  transactions: new TransactionsActions(),
  nodeUpdate: new NodeUpdateActions(),
  walletSettings: new WalletSettingsActions(),
  addresses: new AddressesActions(),
  masternodes: new MasternodesActions(),
  lsrtokens: new LsrTokensActions(),
  contracts: new ContractsActions(),
  dconsole: new ConsoleActions()
};

export default luxActionsMap;
