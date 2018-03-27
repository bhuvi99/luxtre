// @flow
import React, { Component } from 'react';
import SvgInline from 'react-svg-inline';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';
import classnames from 'classnames';
import Button from 'react-polymorph/lib/components/Button';
import SimpleButtonSkin from 'react-polymorph/lib/skins/simple/raw/ButtonSkin';
import styles from './NodeUpdateNotification.scss';
import arrowIcon from '../../assets/images/arrow.inline.svg';

const messages = defineMessages({
  acceptLabel: {
    id: 'luxcoin.node.update.notification.accept.button.label',
    defaultMessage: '!!!Update and restart',
    description: 'Label "Update and restart" on the Luxcoin node update notification.'
  },
  denyLabel: {
    id: 'luxcoin.node.update.notification.postpone.button.label',
    defaultMessage: '!!!Postpone until restart',
    description: 'Label "Postpone until restart" on the Luxcoin node update notification.'
  },
  titleWithVersion: {
    id: 'luxcoin.node.update.notification.titleWithVersion',
    defaultMessage: '!!!Luxcoin-Core update v{version} is available',
    description: 'Luxcoin-Core update notification with version.'
  },
  titleWithoutVersion: {
    id: 'luxcoin.node.update.notification.titleWithoutVersion',
    defaultMessage: '!!!Luxcoin-Core update is available',
    description: 'Luxcoin-Core update notification without version.'
  },
  updateMessage: {
    id: 'luxcoin.node.update.notification.message',
    defaultMessage: '!!!Luxcore and Luxcoin node update is available. Would you like to install the update?',
    description: 'Message shown when there is a Luxcore and Luxcoin node update available.'
  },
});

type Props = {
  version: ?string,
  message?: string, // TODO: make this required after it is implemented on the backend
  onAccept: Function,
  onPostpone: Function,
  onToggleExpanded: Function,
  isExpanded: boolean,
};

@observer
export default class NodeUpdateNotification extends Component<Props> {

  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const { intl } = this.context;
    const { version, message, onAccept, onPostpone, onToggleExpanded, isExpanded } = this.props;
    const arrowClasses = classnames([
      isExpanded ? styles.arrow : styles.arrowCollapsed
    ]);
    const title = version ?
      intl.formatMessage(messages.titleWithVersion, { version }) :
      intl.formatMessage(messages.titleWithoutVersion);

    return (
      <div className={styles.component}>
        <div className={styles.titleBar}>
          <div className={styles.title}>{title}</div>
          <button
            onClick={onToggleExpanded}
            className={styles.toggleButton}
          >
            <SvgInline svg={arrowIcon} className={arrowClasses} />
          </button>
        </div>
        {isExpanded && (
          message ? (
            // eslint-disable-next-line react/no-danger
            <div className={styles.message} dangerouslySetInnerHTML={{ __html: message }} />
          ) : (
            <div className={styles.message}>
              {intl.formatMessage(messages.updateMessage)}
            </div>
          )
        )}
        {isExpanded && (
          <div className={styles.actions}>

            <Button
              className={styles.acceptButton}
              label={intl.formatMessage(messages.acceptLabel)}
              onClick={onAccept}
              skin={<SimpleButtonSkin />}
            />

            <Button
              className={styles.denyButton}
              label={intl.formatMessage(messages.denyLabel)}
              onClick={onPostpone}
              skin={<SimpleButtonSkin />}
            />

          </div>
        )}

      </div>
    );
  }
}
