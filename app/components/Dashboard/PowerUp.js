import React from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import { formatAbp, ABP_DECIMALS } from '../../utils/amountFormatter';
import { round } from '../../utils';

import { NTZ } from '../../containers/Dashboard/actions';
import ExchangeDialog from '../../containers/ExchangeDialog';

import FormField from '../Form/FormField';
import Alert from '../Alert';
import BtnUpgrade from '../Dashboard/BtnUpgrade';

import { Bold, Description } from './styles';

const PowerUp = (props) => {
  const {
    messages,
    account,
    nutzBalance,
    handlePowerUp,
    totalSupplyABP,
    totalSupplyNTZ,
    activeSupplyABP,
  } = props;
  const calcABPAmount = (ntz) => {
    const ntzAmount = new BigNumber(ntz.toString());
    return totalSupplyABP.mul(ntzAmount.div(totalSupplyNTZ));
  };
  const calcNTZtoABP = (amount) => formatAbp(calcABPAmount(round(amount, 8)).mul(ABP_DECIMALS));
  return (
    <div>
      <Description>
        <FormattedHTMLMessage {...messages.powerUpDescr} />
        <Alert theme="info" style={{ textAlign: 'center' }}>
          <Bold><FormattedMessage {...messages.powerUpAvailable} /></Bold> ~{formatAbp(totalSupplyABP - activeSupplyABP)} ABP
        </Alert>
      </Description>
      {!account.isLocked ?
        <ExchangeDialog
          form="exchangeNTZtoABP"
          handleExchange={handlePowerUp}
          maxAmount={nutzBalance}
          label={<FormattedMessage {...messages.powerUpAmountLabel} />}
          hideAddress
          amountUnit={NTZ}
          placeholder="0"
          calcExpectedAmount={calcNTZtoABP}
          expectedAmountUnit="ABP"
          component={FormField}
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
  totalSupplyNTZ: PropTypes.object.isRequired,
  activeSupplyABP: PropTypes.object.isRequired,
};

export default PowerUp;
