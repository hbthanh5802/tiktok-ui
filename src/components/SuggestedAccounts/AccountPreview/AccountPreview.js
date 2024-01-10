import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './AccountPreview..module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';

const cx = classNames.bind(styles);
function AccountPreview({ data }) {
  return (
    <div className={cx('wrapper')}>
      <header className={cx('header')}>
        <Image className={cx('avatar')} src={data.avatar} alt="avatar" />
        <Button className={cx('follow-btn')} primary>
          Follow
        </Button>
      </header>
      <section className={cx('body')}>
        <p className={cx('name')}>
          <strong>{data.first_name + ' ' + data.last_name}</strong>
          {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />}
        </p>
        <p className={cx('nickname')}>{data.nickname}</p>
      </section>
      <footer className={cx('footer')}>
        <p className={cx('data')}>
          <strong className={cx('number')}>{data.followers_count}</strong>
          <span className="content">Followers</span>
          <strong className={cx('number')}>{data.likes_count}</strong>
          <span className="content">Likes</span>
        </p>
      </footer>
    </div>
  );
}

AccountPreview.protoTypes = {
  data: PropTypes.object.isRequired,
};

export default AccountPreview;
