// @flow
import LoginInfoActions from './logininfo-actions';
import SettingInfoActions from './settinginfo-actions';
import CoinInfoActions from './coininfo-actions';
import MarketInfoActions from './marketinfo-actions';
import TransactionsActions from './transactions-actions';
import LoggerActions from './logger-actions';

export type LuxgateActionsMap = {
  loginInfo: LoginInfoActions,
  settingInfo: SettingInfoActions,
  coinInfo: CoinInfoActions,
  marketInfo: MarketInfoActions,
  transactions: TransactionsActions,
  logger: LoggerActions
};

const luxgateActionsMap: LuxgateActionsMap = {
  loginInfo: new LoginInfoActions(),
  settingInfo: new SettingInfoActions(),
  coinInfo: new CoinInfoActions(),
  marketInfo: new MarketInfoActions(),
  transactions: new TransactionsActions(),
  logger: new LoggerActions()
};

export default luxgateActionsMap;
