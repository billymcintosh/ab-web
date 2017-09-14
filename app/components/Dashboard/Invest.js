import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { POWERUP, POWERDOWN } from '../../containers/Dashboard/actions';
import messages from '../../containers/Dashboard/messages';

import Tabs from './Tabs';
import PanesRoot from './PanesRoot';
import PowerUp from '../TransferDialog/PowerUp';
import PowerDown from '../TransferDialog/PowerDown';

import { Pane, Section } from './styles';

const TABS = [
  {
    name: POWERUP,
    title: <FormattedMessage {...messages.powerUpTitle} />,
    icon: 'fa fa-arrow-up',
  },
  {
    name: POWERDOWN,
    title: <FormattedMessage {...messages.powerDownTitle} />,
    icon: 'fa fa-arrow-down',
  },
];

const PANES = {
  [POWERUP]: PowerUp,
  [POWERDOWN]: PowerDown,
};

const Invest = (props) => {
  const { account, setInvestType, investType } = props;
  const disabledTabs = account.isLocked ? [POWERDOWN] : [];
  return (
    <Pane name="dashboard-invest" >
      <Section>
        <Tabs
          tabs={TABS}
          activeTab={investType}
          setActiveTab={setInvestType}
          disabledTabs={disabledTabs}
        />
        <PanesRoot
          panes={PANES}
          paneType={investType}
          paneProps={{
            ...props,
          }}
        />
      </Section>
    </Pane>
  );
};
Invest.propTypes = {
  account: PropTypes.object.isRequired,
  investType: PropTypes.oneOf([POWERUP, POWERDOWN]).isRequired,
  setInvestType: PropTypes.func.isRequired,
};
export default Invest;
