import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './Profile.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { SmallVideo } from '~/components/Video';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import * as Icons from '~/components/Icons';

const cx = classNames.bind(styles);
// HeadlessTippy.setDefaultProps({ animation: true });

const shareList = [
  {
    icon: <Icons.EmbedIcon />,
    title: 'Embed',
    link: '/',
  },
  {
    icon: <Icons.FacebookIcon />,
    title: 'Share to Facebook',
    link: '/',
  },
  {
    icon: <Icons.WhatsAppIcon />,
    title: 'Share to WhatsApp',
    link: '/',
  },
  {
    icon: <Icons.TwitterIcon />,
    title: 'Share to Twitter',
    link: '/',
  },
  {
    icon: <Icons.LinkIcon />,
    title: 'Copy Link',
    link: '/',
  },
  {
    icon: <Icons.LinkedinIcon />,
    title: 'Share to LinkedIn',
    link: '/',
  },
  {
    icon: <Icons.TelegramIcon />,
    title: 'Share to Telegram',
    link: '/',
  },
  {
    icon: <Icons.EmailIcon />,
    title: 'Share to Email',
    link: '/',
  },
  {
    icon: <Icons.LineIcon />,
    title: 'Share to Line',
    link: '/',
  },
  {
    icon: <Icons.PinterestIcon />,
    title: 'Share to Pinterest',
    link: '/',
  },
];

const moreList = [
  {
    icon: <Icons.ReportIcon />,
    title: 'Report',
    link: '/',
  },
  {
    icon: <Icons.BlockIcon />,
    title: 'Block',
    link: '/',
  },
];
function Profile() {
  const location = useLocation();
  const userData = location.state?.user || {};
  const { videos } = userData;

  const [currentType, setCurrentType] = useState('videos');
  const tabActived = useRef(null);
  const tabLine = useRef(null);

  const renderShareList = function (attrs) {
    return (
      <div tabIndex="-1" {...attrs}>
        <PopperWrapper>
          <div className={cx('list-wrapper')}>
            {shareList.map((item, index) => {
              return (
                <Link key={index} to={item.link} className={cx('list-item')}>
                  <span className={cx('list-icon')}>{item.icon}</span>
                  <span className={cx('list-title')}>{item.title}</span>
                </Link>
              );
            })}
          </div>
        </PopperWrapper>
      </div>
    );
  };

  const renderMoreList = function (attrs) {
    return (
      <div tabIndex="-1" {...attrs}>
        <PopperWrapper>
          <div className={cx('list-wrapper', 'more-list')}>
            {moreList.map((item, index) => {
              return (
                <Link key={index} to={item.link} className={cx('list-item')}>
                  <span className={cx('list-icon')}>{item.icon}</span>
                  <span className={cx('list-title')}>{item.title}</span>
                </Link>
              );
            })}
          </div>
        </PopperWrapper>
      </div>
    );
  };

  const handleTabClick = function (e, type) {
    tabActived.current = e.currentTarget;
    setCurrentType(type);
  };

  const resetTabLine = function (width, left) {
    tabLine.current.style.width = width + 'px';
    tabLine.current.style.left = left + 'px';
  };

  useEffect(() => {
    const currentTabActived = tabActived.current;

    if (currentTabActived) {
      const tabWidth = currentTabActived.offsetWidth;
      const tabLeft = currentTabActived.offsetLeft;
      resetTabLine(tabWidth, tabLeft);
    }
  }, [currentType]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <header className={cx('info')}>
          <div className={cx('info-container')}>
            <Image className={cx('avatar')} src={userData && userData.avatar} alt="avatar" />
            <div className={cx('name')}>
              <h3 className={cx('nickname')}>
                <strong>{userData.nickname}</strong>
                {userData.tick && <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />}
              </h3>
              <h4 className={cx('fullname')}>{userData.first_name + ' ' + userData.last_name}</h4>
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
              <HeadlessTippy
                appendTo={document.body}
                interactive
                placement="bottom-end"
                delay={[0, 200]}
                render={renderShareList}
              >
                <span className={cx('share-icon')}>
                  <Icons.ShareOulineIcon />
                </span>
              </HeadlessTippy>
              <HeadlessTippy
                appendTo={document.body}
                interactive
                placement="bottom-end"
                delay={[0, 200]}
                render={renderMoreList}
              >
                <span className={cx('more-icon')}>
                  <Icons.MoreIcon />
                </span>
              </HeadlessTippy>
            </div>
          </div>
          <div className={cx('info-container', 'analystic')}>
            <strong>{userData.followings_count}</strong>
            <span>Following</span>
            <strong>{userData.followers_count}</strong>
            <span>Followers</span>
            <strong>{userData.likes_count}</strong>
            <span>Likes</span>
          </div>
          <div className={cx('info-container', 'bio')}>
            <p>{userData.bio}</p>
          </div>
        </header>
        <div className={cx('tabs')}>
          <header className={cx('tab-header')}>
            <div ref={tabLine} className={cx('tab-line')}></div>
            <div
              ref={tabActived}
              className={cx('tab-item', { active: currentType === 'videos' })}
              onClick={(e) => handleTabClick(e, 'videos')}
            >
              <span className={cx('tab-title')}>Videos</span>
            </div>
            <div
              className={cx('tab-item', { active: currentType === 'liked-videos' })}
              onClick={(e) => handleTabClick(e, 'liked-videos')}
            >
              <span className={cx('tab-icon')}>
                <Icons.LockIcon />
              </span>
              <span className={cx('tab-title')}>Liked</span>
            </div>
          </header>
          <div className={cx('tab-result')}>
            {currentType === 'videos' && (
              <div className={cx('result-list')}>
                {videos.map((video) => {
                  return <SmallVideo key={video.id} data={video} />;
                })}
              </div>
            )}
            {currentType === 'liked-videos' && (
              <div className={cx('lock-container')}>
                <div className={cx('lock-icon')}>
                  <Icons.LockOutlineIcon />
                </div>
                <p className={cx('lock-title')}>This user's liked videos are private</p>
                <p className={cx('lock-content')}>Videos liked by {userData.nickname} are currently hidden</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
