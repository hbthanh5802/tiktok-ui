import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon, iconActive }) {
    const renderMenu = (activeItem = false) => (
        <>
            {activeItem ? iconActive || icon : icon}
            <span className={cx('title')}>{title}</span>
        </>
    );

    const handleActiveClass = (isActive) => {
        return cx('menu-item', { active: isActive });
    };
    return (
        <NavLink className={(someNav) => handleActiveClass(someNav.isActive)} to={to}>
            {({ isActive }) => renderMenu(isActive)}
        </NavLink>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
};

export default MenuItem;
