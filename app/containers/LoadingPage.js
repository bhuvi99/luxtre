// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { defineMessages } from 'react-intl';
import CenteredLayout from '../components/layout/CenteredLayout';
import Loading from '../components/loading/Loading';
import type { StoresMap } from '../stores/index';

export const messages = defineMessages({
  loadingWalletData: {
    id: 'loading.screen.loadingWalletData',
    defaultMessage: '!!!Loading wallet data',
    description: 'Message "Loading wallet data" on the loading screen.'
  },
});

type Props = { stores: StoresMap };

@inject(['stores']) @observer
export default class LoadingPage extends Component<Props> {

  render() {
    const { stores } = this.props;
    const {
      isConnecting, isSyncing, syncPercentage, isLoadingWallets, connectState,
      hasBeenConnected, hasBlockSyncingStarted,
    } = stores.networkStatus;
    const { hasLoadedCurrentLocale, hasLoadedCurrentTheme } = stores.profile;
    return (
      <CenteredLayout>
        <Loading
          isSyncing={isSyncing}
          isConnecting={isConnecting}
          connectState={connectState}
          syncPercentage={syncPercentage}
          isLoadingDataForNextScreen={isLoadingWallets}
          loadingDataForNextScreenMessage={messages.loadingWalletData}
          hasBeenConnected={hasBeenConnected}
          hasBlockSyncingStarted={hasBlockSyncingStarted}
          hasLoadedCurrentLocale={hasLoadedCurrentLocale}
          hasLoadedCurrentTheme={hasLoadedCurrentTheme}
        />
      </CenteredLayout>
    );
  }

}
