import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from './AccountPreview';
import styles from './SuggestedAccount.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function AccountItem() {
  const renderPreview = (attrs) => {
    return (
      <div tabIndex="-1" {...attrs}>
        <PopperWrapper>
          <div className={cx('preview')}>
            <AccountPreview />
          </div>
        </PopperWrapper>
      </div>
    );
  };
  return (
    <div>
      <HeadlessTippy delay={[800, 0]} offset={[-20, 0]} interactive placement="bottom" render={renderPreview}>
        <div className={cx('account-item')}>
          <img className={cx('avatar')} src={images.avatar} alt="avatar" />
          <div className={cx('info')}>
            <p className={cx('name')}>
              <strong>Account Name</strong>
              <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />
            </p>
            <p className={cx('nickname')}>Account Name</p>
          </div>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default AccountItem;
