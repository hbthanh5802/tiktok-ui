import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
import { IconContext } from 'react-icons';

const cx = classNames.bind(styles);

function Button({
    to,
    onClick,
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

export default Button;
