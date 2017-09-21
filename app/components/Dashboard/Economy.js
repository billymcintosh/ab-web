import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';


import { formatAbp, formatNtz, percent3FixedDec } from '../../utils/amountFormatter';

import WithLoading from '../WithLoading';
import List from '../List';

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
      <WithLoading
        isLoading={!babzBalance && !totalSupplyNTZ}
        loadingSize="14px"
        type="inline"
      >
        <FormattedMessage values={{ amount: percent3FixedDec(babzBalance / totalSupplyNTZ) }} {...messages.percentUnit} />
      </WithLoading>,
      <WithLoading
        isLoading={!pwrBalance && !totalSupplyABP}
        loadingSize="14px"
        type="inline"
      >
        <FormattedMessage values={{ amount: percent3FixedDec(pwrBalance / totalSupplyABP) }} {...messages.percentUnit} />
      </WithLoading>,
    ],
    [
      <FormattedMessage {...messages.economyListActive} />,
      <WithLoading
        isLoading={!totalSupplyNTZ}
        loadingSize="14px"
        type="inline"
      >
        <FormattedMessage values={{ amount: formatNtz(totalSupplyNTZ) }} {...messages.ntzUnit} />
      </WithLoading>,
      <WithLoading
        isLoading={!activeSupplyABP}
        loadingSize="14px"
        type="inline"
      >
        <FormattedMessage values={{ amount: formatAbp(activeSupplyABP) }} {...messages.abpUnit} />
      </WithLoading>,
    ],
    [
      <FormattedMessage {...messages.economyListTotal} />,
      <WithLoading
        isLoading={!totalSupplyNTZ}
        loadingSize="14px"
        type="inline"
      >
        <FormattedMessage values={{ amount: formatNtz(totalSupplyNTZ) }} {...messages.ntzUnit} />
      </WithLoading>,
      <WithLoading
        isLoading={!totalSupplyABP}
        loadingSize="14px"
        type="inline"
      >
        <FormattedMessage values={{ amount: formatAbp(totalSupplyABP) }} {...messages.abpUnit} />
      </WithLoading>,
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
