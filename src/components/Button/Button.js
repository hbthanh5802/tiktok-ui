import Proptypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
import { IconContext } from 'react-icons';

const cx = classNames.bind(styles);

function Button({
    to,
    primary = false,
    outline = false,
    small = false,
    large = false,
    textOnly = false,
    disabled = false,
    rounded = false,
    href,
    leftIcon,
    className,
    rightIcon,
    onClick,
    children,
    ...passProps
}) {
    let Component = 'button';
    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        small,
        large,
        textOnly,
        disabled,
        rounded,
    });

    let props = {
        onClick,
        ...passProps,
    };

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (typeof props[key] === 'function' && key.startsWith('on')) {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Component = Link;
    } else if (href) {
        props.href = href;
        Component = 'a';
    }

    return (
        <Component className={classes} {...props}>
            <IconContext.Provider value={{ className: cx('react-icons') }}>
                {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
                <span className={cx('title')}>{children}</span>
                {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
            </IconContext.Provider>
        </Component>
    );
}

Button.propTypes = {
    to: Proptypes.string,
    primary: Proptypes.bool,
    outline: Proptypes.bool,
    small: Proptypes.bool,
    large: Proptypes.bool,
    textOnly: Proptypes.bool,
    disabled: Proptypes.bool,
    rounded: Proptypes.bool,
    href: Proptypes.string,
    className: Proptypes.string,
    onClick: Proptypes.func,
    leftIcon: Proptypes.node,
    rightIcon: Proptypes.node,
    children: Proptypes.node.isRequired,
};

export default Button;
