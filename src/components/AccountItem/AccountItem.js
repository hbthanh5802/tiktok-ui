import classNames from 'classnames/bind';
import Proptypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './AccountItem.module.scss';
import Image from '~/components/Image';
import * as userServices from '~/services/userServices';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
  const navigate = useNavigate();

  const handleAccountItemClick = async (nickname) => {
    try {
      const result = await userServices.getUser(nickname);
      navigate(`/profile/${data.nickname}`, {
        state: {
          user: result,
        },
      });
    } catch (error) {}
  };

  return (
    <div className={cx('wrapper')} onClick={() => handleAccountItemClick(data.nickname)}>
      <Image className={cx('avatar')} src={data.avatar} alt="Avatar" />
      <div className={cx('info')}>
        <h4 className={cx('name')}>
          <span>{data.full_name}</span>
          {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
        </h4>
        <p className={cx('username')}>{data.nickname}</p>
      </div>
    </div>
  );
}

AccountItem.propTypes = {
  data: Proptypes.object.isRequired,
};

export default AccountItem;
