import React from 'react';
import PropTypes from 'prop-types';

import List from '../List';

import { formatAbp, formatNtz, percent3FixedDec } from '../../utils/amountFormatter';

const Economy = (props) => {
  const {
    totalSupplyABP,
    totalSupplyNTZ,
    activeSupplyABP,
    pwrBalance,
    babzBalance,
  } = props;
  const ECONOMY_LIST = [
    ['Active', '~', formatAbp(activeSupplyABP)],
    ['Total', formatNtz(totalSupplyNTZ), formatAbp(totalSupplyABP)],
    ['Available', '~', formatAbp(totalSupplyABP - activeSupplyABP)],
    ['Your Balance', formatNtz(babzBalance), formatAbp(pwrBalance)],
    ['Economy %', percent3FixedDec(babzBalance / totalSupplyNTZ), percent3FixedDec(pwrBalance / totalSupplyABP)],
  ];
  const COL_STYLE = {
    0: { width: 80 },
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
  totalSupplyABP: PropTypes.object.isRequired,
  totalSupplyNTZ: PropTypes.object.isRequired,
  activeSupplyABP: PropTypes.object.isRequired,
  pwrBalance: PropTypes.object.isRequired,
  babzBalance: PropTypes.object.isRequired,
};

export default Economy;
