// @flow
import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import { ROUTES } from './routes-config';
import resolver from './utils/imports';

// PAGES
// import StakingPage from './containers/staking/StakingPage';
import LuxRedemptionPage from './containers/wallet/LuxRedemptionPage';
import NoWalletsPage from './containers/wallet/NoWalletsPage';
import LanguageSelectionPage from './containers/profile/LanguageSelectionPage';
import Settings from './containers/settings/Settings';
import GeneralSettingsPage from './containers/settings/categories/GeneralSettingsPage';
import SupportSettingsPage from './containers/settings/categories/SupportSettingsPage';
import TermsOfUseSettingsPage from './containers/settings/categories/TermsOfUseSettingsPage';
import TermsOfUsePage from './containers/profile/TermsOfUsePage';
import TermsOfUseForLuxgatePage from './containers/profile/TermsOfUseForLuxgatePage';
import SendLogsChoicePage from './containers/profile/SendLogsChoicePage';
import DisplaySettingsPage from './containers/settings/categories/DisplaySettingsPage';

// Dynamic container loading - resolver loads file relative to '/app/' directory
const LoadingPage = resolver('containers/LoadingPage');
const Wallet = resolver('containers/wallet/Wallet');
const WalletSummaryPage = resolver('containers/wallet/WalletSummaryPage');
const WalletSendPage = resolver('containers/wallet/WalletSendPage');
const WalletReceivePage = resolver('containers/wallet/WalletReceivePage');
const WalletTransactionsPage = resolver('containers/wallet/WalletTransactionsPage');
const WalletSettingsPage = resolver('containers/wallet/WalletSettingsPage');
const MasternodesPage = resolver('containers/wallet/MasternodesPage');
const MasternodesNetPage = resolver('containers/wallet/MasternodesNetPage');
const MyMasternodePage = resolver('containers/wallet/MyMasternodePage');
const LSRTokensPage = resolver('containers/wallet/LSRTokensPage');
const SmartContractsPage = resolver('containers/wallet/SmartContractsPage');
const CreateSmartContractPage = resolver('containers/wallet/CreateSmartContractPage');
const CallSmartContractPage = resolver('containers/wallet/CallSmartContractPage');
const SendtoSmartContractPage = resolver('containers/wallet/SendtoSmartContractPage');
const SolidityCompilerPage = resolver('containers/wallet/SolidityCompilerPage');
const UtilityPage = resolver('containers/wallet/UtilityPage');
const UtilityPosCalcPage = resolver('containers/wallet/UtilityPosCalcPage');
const UtilityStakingChartPage = resolver('containers/wallet/UtilityStakingChartPage');

export const Routes = (
  <div>
    <Route path={ROUTES.ROOT} component={LoadingPage} />
    <Route path={ROUTES.PROFILE.LANGUAGE_SELECTION} component={LanguageSelectionPage} />
    <Route path={ROUTES.PROFILE.TERMS_OF_USE} component={TermsOfUsePage} />
    <Route path={ROUTES.PROFILE.TERMS_OF_USE_FOR_LUXGATE} component={TermsOfUseForLuxgatePage} />
    <Route path={ROUTES.PROFILE.SEND_LOGS} component={SendLogsChoicePage} />
    {/* <Route path={ROUTES.STAKING} component={StakingPage} /> */}
    <Route path={ROUTES.LUX_REDEMPTION} component={LuxRedemptionPage} />
    <Route path={ROUTES.NO_WALLETS} component={NoWalletsPage} />
    <Route path={ROUTES.WALLETS.ROOT} component={Wallet}>
      <Route path={ROUTES.WALLETS.SUMMARY} component={WalletSummaryPage} />
      <Route path={ROUTES.WALLETS.TRANSACTIONS} component={WalletTransactionsPage} />
      <Route path={ROUTES.WALLETS.SEND} component={WalletSendPage} />
      <Route path={ROUTES.WALLETS.RECEIVE} component={WalletReceivePage} />
      <Route path={ROUTES.WALLETS.SETTINGS} component={WalletSettingsPage} />
      <Route path={ROUTES.WALLETS.UTILITIES.ROOT} component={UtilityPage}>
        <Route path={ROUTES.WALLETS.UTILITIES.POSCALCULATOR} component={UtilityPosCalcPage}/>
        <Route path={ROUTES.WALLETS.UTILITIES.STAKINGCHART} component={UtilityStakingChartPage}/>
      </Route>
      <Route path={ROUTES.WALLETS.MASTERNODES.ROOT} component={MasternodesPage}>
        <Route path={ROUTES.WALLETS.MASTERNODES.MASTERNODESNET} component={MasternodesNetPage}/>
        <Route path={ROUTES.WALLETS.MASTERNODES.MYMASTERNODE} component={MyMasternodePage}/>
      </Route>
      <Route path={ROUTES.WALLETS.LSRTOKENS} component={LSRTokensPage} />
      <Route path={ROUTES.WALLETS.SMARTCONTRACTS.ROOT} component={SmartContractsPage}>
        <Route path={ROUTES.WALLETS.SMARTCONTRACTS.CREATESMARTCONTRACT} component={CreateSmartContractPage}/>
        <Route path={ROUTES.WALLETS.SMARTCONTRACTS.CALLMARTCONTRACT} component={CallSmartContractPage}/>
        <Route path={ROUTES.WALLETS.SMARTCONTRACTS.SENDTOMARTCONTRACT} component={SendtoSmartContractPage}/>
        <Route path={ROUTES.WALLETS.SMARTCONTRACTS.SOLCOMPILER} component={SolidityCompilerPage}/>
      </Route>
    </Route>
    
    <Route path="/settings" component={Settings}>
      <IndexRedirect to="general" />
      <Route path="general" component={GeneralSettingsPage} />
      <Route path="terms-of-use" component={TermsOfUseSettingsPage} />
      <Route path="support" component={SupportSettingsPage} />
      <Route path="display" component={DisplaySettingsPage} />
    </Route>
  </div>
);
