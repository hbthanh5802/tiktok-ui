import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import images from '~/assets/images';
import Image from '~/components/Image';
import Button from '~/components/Button';
import * as Icons from '~/components/Icons';

const cx = classNames.bind(styles);

function Profile() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <header className={cx('info')}>
          <div className={cx('info-container')}>
            <Image className={cx('avatar')} src={images.avatar} alt="avatar" />
            <div className={cx('name')}>
              <h3 className={cx('nickname')}>Nickname</h3>
              <h4 className={cx('fullname')}>Fullname</h4>
              <div className={cx('info-btn-group')}>
                <Button className={cx('message-btn')} outline>
                  Messages
                </Button>
                <span className={cx('followed-icon')}>
                  <Icons.FollowedIcon />
                </span>
              </div>
            </div>
            <div className={cx('action-btn-group')}>
              <span className={cx('share-icon')}>
                <Icons.ShareOulineIcon />
              </span>
              <span className={cx('more-icon')}>
                <Icons.MoreIcon />
              </span>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Profile;
