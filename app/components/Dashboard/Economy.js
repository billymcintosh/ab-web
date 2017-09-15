import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import List from '../List';

import { formatAbp, formatNtz, percent3FixedDec } from '../../utils/amountFormatter';

const Economy = (props) => {
  const {
    totalSupplyABP,
    totalSupplyNTZ,
    activeSupplyABP,
    pwrBalance,
    babzBalance,
    messages,
  } = props;
  const ECONOMY_LIST = [
    [
      <FormattedMessage {...messages.economyListOwnership} />,
      <FormattedMessage values={{ amount: percent3FixedDec(babzBalance / totalSupplyNTZ) }} {...messages.percentUnit} />,
      <FormattedMessage values={{ amount: percent3FixedDec(pwrBalance / totalSupplyABP) }} {...messages.percentUnit} />,
    ],
    [
      <FormattedMessage {...messages.economyListActive} />,
      <FormattedMessage values={{ amount: formatNtz(totalSupplyNTZ) }} {...messages.ntzUnit} />,
      <FormattedMessage values={{ amount: formatAbp(activeSupplyABP) }} {...messages.abpUnit} />,
    ],
    [
      <FormattedMessage {...messages.economyListTotal} />,
      <FormattedMessage values={{ amount: formatNtz(totalSupplyNTZ) }} {...messages.ntzUnit} />,
      <FormattedMessage values={{ amount: formatAbp(totalSupplyABP) }} {...messages.abpUnit} />,
    ],
  ];
  const COL_STYLE = {
    0: { width: 120 },
    1: { textAlign: 'left', width: 10, whiteSpace: 'nowrap' },
    2: { textAlign: 'left', width: 10, whiteSpace: 'nowrap' },
  };
  return (
    <div>
      <List
        items={ECONOMY_LIST}
        headers={['', 'Nutz', 'Power']}
        columnsStyle={COL_STYLE}
      />
    </div>
  );
};
Economy.propTypes = {
  totalSupplyABP: PropTypes.object,
  totalSupplyNTZ: PropTypes.object,
  activeSupplyABP: PropTypes.object,
  pwrBalance: PropTypes.object,
  babzBalance: PropTypes.object,
  messages: PropTypes.object,
};

export default Economy;
