import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import TransferDialog from '../../containers/TransferDialog';

import Alert from '../Alert';
import BtnUpgrade from '../Dashboard/BtnUpgrade';

import { Description } from './styles';

const PowerUp = (props) => {
  const {
    messages,
    account,
    nutzBalance,
    handlePowerUp,
  } = props;
  return (
    <div>
      <Description>
        <FormattedHTMLMessage {...messages.powerUpDescr} />
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
};

export default PowerUp;
