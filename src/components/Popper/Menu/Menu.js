import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import { Wrapper as PoperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import styles from './Menu.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);
const emtyFunction = () => {};
function Menu({ children, items = [], hideOnClick = false, onChange = emtyFunction }) {
    const [menuHistory, setMenuHistory] = useState([{ data: items }]);
    const currentMenu = menuHistory[menuHistory.length - 1];

    const renderItems = () => {
        return currentMenu.data.map((item, index) => {
            const isParent = !!item?.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setMenuHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleRenderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PoperWrapper className={cx('menu-container')}>
                {menuHistory.length > 1 && (
                    <Header
                        title={currentMenu.title}
                        onBack={() => setMenuHistory((prev) => prev.slice(0, menuHistory.length - 1))}
                    />
                )}
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PoperWrapper>
        </div>
    );

    const handleBackMenu = () => setMenuHistory((prev) => prev.slice(0, 1));

    return (
        <Tippy
            delay={[0, 700]}
            interactive
            hideOnClick={hideOnClick}
            placement="bottom-end"
            render={handleRenderResult}
            onHide={handleBackMenu}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array.isRequired,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
