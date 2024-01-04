import classNames from 'classnames/bind';
import styles from './AccountPreview..module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import images from '~/assets/images';

const cx = classNames.bind(styles);
function AccountPreview() {
  return (
    <div className={cx('wrapper')}>
      <header className={cx('header')}>
        <img className={cx('avatar')} src={images.avatar} alt="avatar" />
        <Button className={cx('follow-btn')} primary>
          Follow
        </Button>
      </header>
      <section className={cx('body')}>
        <p className={cx('name')}>
          <strong>Account Name</strong>
          <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />
        </p>
        <p className={cx('nickname')}>Account Name</p>
      </section>
      <footer className={cx('footer')}>
        <p className={cx('data')}>
          <strong className={cx('number')}>12.9M</strong>
          <span className="content">Followers</span>
          <strong className={cx('number')}>3.3B</strong>
          <span className="content">Likes</span>
        </p>
      </footer>
    </div>
  );
}

export default AccountPreview;
