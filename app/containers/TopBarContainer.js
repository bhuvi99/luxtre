// @flow
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import TopBar from '../components/layout/TopBar';
import ConsoleWindowIcon from '../components/widgets/ConsoleWindowIcon';
import NodeSyncStatusIcon from '../components/widgets/NodeSyncStatusIcon';
import WalletLockStatusIcon from '../components/widgets/WalletLockStatusIcon';
import LuxgateToopbarIcons from '../components/widgets/LuxgateToopbarIcons';
import WalletStakingStatusIcon from '../components/widgets/WalletStakingStatusIcon';
import WalletTestEnvironmentLabel from '../components/widgets/WalletTestEnvironmentLabel';
import type { InjectedProps } from '../types/injectedPropsType';
import environment from '../environment';

type Props = InjectedProps;

@inject('stores', 'actions') @observer
export default class TopBarContainer extends Component<Props> {

  static defaultProps = { actions: null, stores: null };

  render() {
    const { actions, stores } = this.props;
    const { sidebar, app, networkStatus, luxgate } = stores;
    const { uiDialogs, uiNotifications } = stores;
    const isMainnet = environment.isMainnet();
    const isLuxApi = environment.isLuxApi();
    const activeWallet = stores[environment.API].wallets.active;
    const {isShowingLuxtre} = sidebar;
    const { isLogined } = luxgate.loginInfo;
    const pageTitle = stores[environment.API].wallets.pageTitle;
    const testnetLabel = (
      isLuxApi && !isMainnet ? <WalletTestEnvironmentLabel /> : null
    );

    return (
      <TopBar
        onSwitchLuxgate={actions.sidebar.switchLuxgate.trigger}
        isShowingLuxtre={isShowingLuxtre}
        pageTitle={pageTitle}
        isDialogOpen={uiDialogs.isOpen}
      >
        {isShowingLuxtre && activeWallet && activeWallet.hasPassword == true ? 
          <WalletLockStatusIcon
            isLocked={activeWallet.isLocked}
          />
          : null
        }
        {isShowingLuxtre ? 
          <WalletStakingStatusIcon
            isStaking={activeWallet.isStaking}
          />
          : null
        }
        {isShowingLuxtre ?
          <NodeSyncStatusIcon
            networkStatus={networkStatus}
            isMainnet={isMainnet}
          />
          :null
        }
        {isShowingLuxtre ?
          <ConsoleWindowIcon
            openDialogAction={actions.dialogs.open.trigger}
          />
          :null
        }
        {!isShowingLuxtre ?
          <LuxgateToopbarIcons
            isLogined={isLogined}
            addLog={(content:string, type:string) =>{
              const logData = {
                content: content,
                type: type
              };
              actions.luxgate.logger.addLog.trigger(logData);
            }}
            onLogout={() => {
              actions.luxgate.loginInfo.logoutAccount.trigger();
            }}
            openDialogAction={actions.dialogs.open.trigger}  
          />
          : null
        }
      </TopBar>
    );
  }

}
