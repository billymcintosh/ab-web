import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import { formatAbp } from '../../utils/amountFormatter';

import TransferDialog from '../../containers/TransferDialog';

import Alert from '../Alert';
import BtnUpgrade from '../Dashboard/BtnUpgrade';

import { Bold } from '../Dashboard/styles';

import { Description } from './styles';

const PowerUp = (props) => {
  const {
    messages,
    account,
    nutzBalance,
    handlePowerUp,
    totalSupplyABP,
    activeSupplyABP,
  } = props;
  return (
    <div>
      <Description>
        <FormattedHTMLMessage {...messages.powerUpDescr} />
        <Alert theme="info" style={{ textAlign: 'center' }}>
          <Bold><FormattedMessage {...messages.powerUpAvailable} /></Bold> ~{formatAbp(totalSupplyABP - activeSupplyABP)} ABP
        </Alert>
      </Description>
      {!account.isLocked ?
        <TransferDialog
          handleTransfer={handlePowerUp}
          maxAmount={nutzBalance}
          label={<FormattedMessage {...messages.powerUpAmountLabel} />}
          hideAddress
          amountUnit="NTZ"
          placeholder="0"
          {...props}
        />
        :
        <Alert theme="warning">
          <BtnUpgrade {...props} /> to Power Up.
        </Alert>
      }
    </div>
  );
};
PowerUp.propTypes = {
  account: PropTypes.object,
  nutzBalance: PropTypes.object,
  messages: PropTypes.object.isRequired,
  handlePowerUp: PropTypes.func,
  totalSupplyABP: PropTypes.object.isRequired,
  activeSupplyABP: PropTypes.object.isRequired,
};

export default PowerUp;
