import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AccountItem from './AccountItem';
import styles from './SuggestedAccount.module.scss';
import * as userServices from '~/services/userServices';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label }) {
  const [suggestedUserResult, setSuggestedUserResult] = useState([]);

  const setParams = function (page, except = '-1', per_page = '5') {
    page = Math.floor(Math.random() * 6) + 5;
    return {
      page,
      except,
      per_page,
    };
  };

  async function fetchAPI() {
    const exceptUsers = suggestedUserResult.reduce((total, curUser) => {
      return total + ',' + curUser.id;
    }, '-1');
    const params = setParams(1, exceptUsers, 6);
    const result = await userServices.suggestedUser(params.page, params.except, params.per_page);
    setSuggestedUserResult((prev) => [...prev, ...result]);
  }

  useEffect(() => {
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSeeMore = () => {
    fetchAPI();
  };

  return (
    <div className={cx('wrapper')}>
      <p className={cx('label')}>{label}</p>
      {suggestedUserResult.map((suggestedUser) => (
        <AccountItem key={suggestedUser.id} data={suggestedUser} />
      ))}
      <button className={cx('more-btn')} onClick={handleSeeMore}>
        <p>See more</p>
      </button>
    </div>
  );
}

SuggestedAccounts.propTypes = {
  label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
