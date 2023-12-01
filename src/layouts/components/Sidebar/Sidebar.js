import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import configs from '~/configs';
import * as Icons from '~/components/Icons';

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
        </aside>
    );
}

export default Sidebar;
