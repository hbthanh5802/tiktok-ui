// import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faEarthAsia,
    faKeyboard,
    faCoins,
    faChartLine,
    faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faCircleQuestion, faPaperPlane, faUser, faMessage } from '@fortawesome/free-regular-svg-icons';
import { BsCloudArrowUp } from 'react-icons/bs';
import { GoGear } from 'react-icons/go';
// Tippy
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import Search from '~/components/Search';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];
function Header() {
    const currentUser = true;

    // Handle logic
    const handleOnChangeMenu = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
                break;
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@hbthanh5802',
        },
        {
            icon: <FontAwesomeIcon icon={faBookmark} />,
            title: 'Favourites',
            to: '/@hbthanh5802',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coins',
        },
        {
            icon: <FontAwesomeIcon icon={faChartLine} />,
            title: 'View analystics',
            to: '/analystics',
        },
        {
            icon: <GoGear />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faArrowRightToBracket} />,
            title: 'Logout',
            to: '/logout',
            separate: true,
        },
    ];

    return (
        <h2 className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="Logo Tiktok" />
                </div>

                <Search />

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy content="Upload video" placement="bottom" animation="shift-away">
                                <button className={cx('action-btn')}>
                                    <BsCloudArrowUp />
                                </button>
                            </Tippy>
                            <Tippy content="Message" placement="bottom" animation="shift-away">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </button>
                            </Tippy>
                            <Tippy content="Inbox" placement="bottom" animation="shift-away">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faMessage} />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button textOnly>Upload</Button>
                            <Button primary>Login</Button>
                        </>
                    )}

                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleOnChangeMenu}>
                        {currentUser ? (
                            <Image
                                className={cx('avatar')}
                                src={images.avatar}
                                alt="Avatar"
                                fallBack="https://raw.githubusercontent.com/react-icons/react-icons/master/react-icons.svg"
                            />
                        ) : (
                            <>
                                <button className={cx('menu-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            </>
                        )}
                    </Menu>
                </div>
            </div>
        </h2>
    );
}

export default Header;
