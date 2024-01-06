import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import configs from '~/configs';

import * as Icons from '~/components/Icons';
import Menu, { MenuItem } from './Menu';
import images from '~/assets/images';
import SuggestedAccounts from '~/components/SuggestedAccounts';

const cx = classNames.bind(styles);
function Sidebar() {
  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem
          title="For you"
          to={configs.routes.home}
          icon={<Icons.HomeIcon />}
          iconActive={<Icons.HomeActiveIcon />}
        />
        <MenuItem
          title="Following"
          to={configs.routes.following}
          icon={<Icons.UserGroupIcon />}
          iconActive={<Icons.UserGroupActiveIcon />}
        />
        <MenuItem
          title="Live"
          to={configs.routes.live}
          icon={<Icons.LiveIcon />}
          iconActive={<Icons.LiveActiveIcon />}
        />
      </Menu>
      <SuggestedAccounts label="Suggested Accounts" />
      {/* <SuggestedAccounts label="Following Accounts" /> */}
      <footer className={cx('footer')}>
        <a className={cx('effect-link')} href="!#" target="_blank" rel="noopener noreferrer">
          <img
            className={cx('effect-img')}
            src="https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/webapp/main/webapp-desktop/045b2fc7c278b9a30dd0.png"
            alt="Create effects"
          />
          <div className={cx('effect-content')}>
            <img className={cx('icon')} src={images.tiktokEffectHouse} alt="tiktokEffectHouse" />
            <span>Create effects</span>
          </div>
        </a>

        <div className={cx('link-group')}>
          <a href="/">About</a>
          <a href="/">Newroom</a>
          <a href="/">Contact</a>
          <a href="/">Careers</a>
        </div>
        <div className={cx('link-group')}>
          <a href="/">TikTok for Good</a>
          <a href="/">Advertise</a>
          <a href="/">TikTok LIVE Creator Networks</a>
          <a href="/">Developers</a>
          <a href="/">Transparency</a>
          <a href="/">TikTok Rewards</a>
          <a href="/">TikTok Embeds</a>
        </div>
        <div className={cx('link-group')}>
          <a href="/">Help</a>
          <a href="/">Safety</a>
          <a href="/">Terms</a>
          <a href="/">Privacy</a>
          <a href="/">Creator Portal</a>
          <a href="/">Community Guidelines</a>
        </div>

        <div className={cx('privacy')}>
          <span>© 2024 TikTok</span>
        </div>
      </footer>
    </aside>
  );
}

export default Sidebar;
