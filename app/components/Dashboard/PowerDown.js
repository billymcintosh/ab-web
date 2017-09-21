import React from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import { formatNum, ABP_DECIMALS } from '../../utils/amountFormatter';
import ExchangeDialog from '../../containers/ExchangeDialog';
import { ABP, NTZ } from '../../containers/Dashboard/actions';

import FormField from '../Form/FormField';
import Alert from '../Alert';

import { Description } from './styles';

const PowerDown = (props) => {
  const {
    messages,
    totalSupplyABP,
    totalSupplyNTZ,
    pwrBalance,
    handlePowerDown,
  } = props;
  const calcABPtoNTZ = (amount) => {
    const abpAmount = new BigNumber(amount);
    const ntzAmount = totalSupplyNTZ.mul(abpAmount.div(totalSupplyABP));
    return formatNum(ntzAmount, 0);
  };
  return (
    <div>
      <Description>
        <FormattedHTMLMessage {...messages.powerDownDescr} />
        <Alert theme="info">
          <FormattedMessage values={{ min: totalSupplyABP.div(10000).div(ABP_DECIMALS).ceil().toNumber() }} {...messages.powerDownMin} />
        </Alert>
      </Description>
      {pwrBalance && pwrBalance.equals(0) ?
        <Alert theme="warning">
          <FormattedMessage {...messages.powerDownPrereq} />
        </Alert>
        :
        <ExchangeDialog
          form="exchangeABPtoNTZ"
          handleExchange={handlePowerDown}
          maxAmount={pwrBalance.div(ABP_DECIMALS)}
          minAmount={totalSupplyABP.div(10000).div(ABP_DECIMALS).ceil()}
          hideAddress
          label={<FormattedMessage {...messages.powerDownAmountLabel} />}
          calcExpectedAmount={calcABPtoNTZ}
          expectedAmountUnit={NTZ}
          amountUnit={ABP}
          placeholder="0.00"
          component={FormField}
          {...props}
        />
      }
    </div>
  );
};
PowerDown.propTypes = {
  messages: PropTypes.object.isRequired,
  totalSupplyABP: PropTypes.object.isRequired,
  totalSupplyNTZ: PropTypes.object.isRequired,
  handlePowerDown: PropTypes.func.isRequired,
  pwrBalance: PropTypes.object,
};

export default PowerDown;
