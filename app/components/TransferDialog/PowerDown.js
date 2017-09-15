import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import { ABP_DECIMALS } from '../../utils/amountFormatter';
import TransferDialog from '../../containers/TransferDialog';

import Economy from '../Dashboard/Economy';

import Alert from '../Alert';

import { Description } from './styles';

const PowerDown = (props) => {
  const {
    messages,
    totalSupplyABP,
    pwrBalance,
    handlePowerDown,
  } = props;
  return (
    <div>
      <Description>
        <FormattedHTMLMessage
          {...messages.powerDownDescr}
          values={{
            min: totalSupplyABP.div(10000).div(ABP_DECIMALS).ceil().toNumber(),
          }}
        />
        <Economy {...props} />
      </Description>
      {pwrBalance && pwrBalance.equals(0) ?
        <Alert theme="warning">
          <FormattedMessage {...messages.powerDownPrereq} />
        </Alert>
        :
        <TransferDialog
          handleTransfer={handlePowerDown}
          maxAmount={pwrBalance.div(ABP_DECIMALS)}
          minAmount={totalSupplyABP.div(10000).div(ABP_DECIMALS).ceil()}
          hideAddress
          label={<FormattedMessage {...messages.powerDownAmountLabel} />}
          amountUnit="ABP"
          placeholder="0.00"
          {...props}
        />
      }
    </div>
  );
};
PowerDown.propTypes = {
  messages: PropTypes.object.isRequired,
  totalSupplyABP: PropTypes.object.isRequired,
  handlePowerDown: PropTypes.func.isRequired,
  pwrBalance: PropTypes.object,
};

export default PowerDown;
