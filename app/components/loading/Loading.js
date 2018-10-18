// @flow
import React, { Component } from 'react';
import SvgInline from 'react-svg-inline';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';
import classNames from 'classnames';
import LoadingSpinner from '../widgets/LoadingSpinner';
import luxcoreLogo from '../../assets/images/luxcore-logo-loading-grey.inline.svg';
import styles from './Loading.scss';
import type { ReactIntlMessage } from '../../types/i18nTypes';
import environment from '../../environment';
import CON_STATE from "../../utils/ConnectState"

const messages = defineMessages({
  connecting: {
    id: 'loading.screen.connectingToNetworkMessage',
    defaultMessage: '!!!Connecting to network',
    description: 'Message "Connecting to network" on the loading screen.'
  },
  waitingForSyncToStart: {
    id: 'loading.screen.waitingForSyncToStart',
    defaultMessage: '!!!Connected - waiting for block syncing to start',
    description: 'Message "Connected - waiting for block syncing to start" on the loading screen.'
  },
  reconnecting: {
    id: 'loading.screen.reconnectingToNetworkMessage',
    defaultMessage: '!!!Network connection lost - reconnecting',
    description: 'Message "Network connection lost - reconnecting" on the loading screen.'
  },
  syncing: {
    id: 'loading.screen.syncingBlocksMessage',
    defaultMessage: '!!!Syncing blocks',
    description: 'Message "Syncing blocks" on the loading screen.'
  },
  loadingBlockIndex: {
    id: 'loading.screen.loadingBlockIndex',
    defaultMessage: '!!!Loading block index',
    description: 'Message "Loading block index" on the loading screen.'
  },
  verifyingBlocks: {
    id: 'loading.screen.verifyingBlock',
    defaultMessage: '!!!Verify blocks',
    description: 'Message "Verifying blocks" on the loading screen.'
  },
  rescanning: {
    id: 'loading.screen.rescanning',
    defaultMessage: '!!!Rescanning',
    description: 'Message "Rescanning" on the loading screen.'
  },
});

type Props = {
  currencyIcon: string,
  currencyIconWhite: string,
  isConnecting: boolean,
  hasBeenConnected: boolean,
  hasBlockSyncingStarted: boolean,
  isSyncing: boolean,
  syncPercentage: number,
  isLoadingDataForNextScreen: boolean,
  loadingDataForNextScreenMessage: ReactIntlMessage,
  hasLoadedCurrentLocale: boolean,
  hasLoadedCurrentTheme: boolean,
  connectState: number
};

@observer
export default class Loading extends Component<Props> {

  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const { intl } = this.context;
    const {
      isConnecting, isSyncing, syncPercentage, connectState,
      isLoadingDataForNextScreen, loadingDataForNextScreenMessage, hasBeenConnected,
      hasBlockSyncingStarted, hasLoadedCurrentLocale, hasLoadedCurrentTheme,
    } = this.props;
    const componentStyles = classNames([
      styles.component,
      hasLoadedCurrentTheme ? null : styles['is-loading-theme'],
      isConnecting ? styles['is-connecting'] : null,
      isSyncing ? styles['is-syncing'] : null,
    ]);
    const luxcoreLogoStyles = classNames([
      styles.luxcoreLogo,
      isConnecting ? styles.connectingLogo : styles.syncingLogo,
    ]);

    const connectingMessage = hasBeenConnected ? messages.reconnecting : messages.connecting;

    return (
      <div className={componentStyles}>
        { isConnecting ? (null) : ( <SvgInline svg={luxcoreLogo} className={luxcoreLogoStyles} /> )}
        {hasLoadedCurrentLocale && (
          <div>
            <div className={styles.connecting}>
              {isConnecting && !hasBlockSyncingStarted && connectState == CON_STATE.CONNECTING && (
                  <h1 className={styles.headline}>
                    {intl.formatMessage(connectingMessage)}
                  </h1>
              )}
              {isConnecting && !hasBlockSyncingStarted && connectState == CON_STATE.LOADINGBLOCK && (
                <h1 className={styles.headline}>
                  {intl.formatMessage(messages.loadingBlockIndex)}
                </h1>
              )}
              {isConnecting && !hasBlockSyncingStarted && connectState == CON_STATE.VERIFYBLOCK && (
                <h1 className={styles.headline}>
                  {intl.formatMessage(messages.verifyingBlocks)}
                </h1>
              )}
              {isConnecting && !hasBlockSyncingStarted && connectState == CON_STATE.RESCANNING && (
                <h1 className={styles.headline}>
                  {intl.formatMessage(messages.rescanning)}
                </h1>
              )}
              {isConnecting && hasBlockSyncingStarted && (
                <h1 className={styles.headline}>
                  {intl.formatMessage(messages.waitingForSyncToStart)}
                </h1>
              )}
            </div>

            {isSyncing && (
              <div className={styles.syncing}>
                <h1 className={styles.headline}>
                  {intl.formatMessage(messages.syncing)} {syncPercentage.toFixed(2)}%
                </h1>
              </div>
            )}
            {!isSyncing && !isConnecting && isLoadingDataForNextScreen && (
              <div className={styles.syncing}>
                <h1 className={styles.headline}>
                  {intl.formatMessage(loadingDataForNextScreenMessage)}
                </h1>
                <LoadingSpinner />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
