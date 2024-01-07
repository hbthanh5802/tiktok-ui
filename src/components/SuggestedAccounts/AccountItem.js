import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import PropTypes from 'prop-types';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from './AccountPreview';
import styles from './SuggestedAccount.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
  const renderPreview = (attrs) => {
    return (
      <div tabIndex="-1" {...attrs}>
        <PopperWrapper>
          <div className={cx('preview')}>
            <AccountPreview data={data} />
          </div>
        </PopperWrapper>
      </div>
    );
  };
  return (
    <HeadlessTippy
      delay={[800, 0]}
      appendTo={document.body}
      offset={[-20, 0]}
      interactive
      placement="bottom"
      render={renderPreview}
    >
      <Link to={`/profile/${data.nickname}`} className={cx('account-item')}>
        <Image className={cx('avatar')} src={data.avatar} alt="avatar" />
        <div className={cx('info')}>
          <p className={cx('name')}>
            <strong>{data.first_name + ' ' + data.last_name}</strong>
            {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />}
          </p>
          <p className={cx('nickname')}>{data.nickname}</p>
        </div>
      </Link>
    </HeadlessTippy>
  );
}

AccountItem.protoTypes = {
  data: PropTypes.object.isRequired,
};

export default AccountItem;
