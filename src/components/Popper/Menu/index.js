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
function Menu({ children, items = [], onChange = emtyFunction }) {
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

    return (
        <Tippy
            delay={[0, 700]}
            interactive
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PoperWrapper className={cx('menu-container')}>
                        {menuHistory.length > 1 && (
                            <Header
                                title="Languages"
                                onBack={() => setMenuHistory((prev) => prev.slice(0, menuHistory.length - 1))}
                            />
                        )}
                        {renderItems()}
                    </PoperWrapper>
                </div>
            )}
            onHide={() => setMenuHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
