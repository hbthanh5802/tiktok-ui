import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// Tippy
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';

// personal
import * as searchServices from '~/services/searchServices';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import styles from './Search.module.scss';
import { useDebounce } from '~/components/Hooks';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    const searchInput = useRef();

    const debouncedSearchValue = useDebounce(searchValue, 600);

    const handleClearSearch = () => {
        setSearchValue('');
        setSearchResult([]);
        searchInput.current.focus();
    };

    const handleChangeSearchValue = (e) => {
        const regex = /^\s| {2}/;
        const inputValue = e.target.value;
        if (!regex.test(inputValue)) {
            setSearchValue(inputValue);
        }
    };

    const handleClickOutside = () => {
        setShowResult(false);
    };

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResult([]);
            return;
        }
        setLoading(true);

        // call api
        const fethAPI = async () => {
            const result = await searchServices.search(searchValue);
            setSearchResult(result);
            setLoading(false);
        };
        fethAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchValue]);

    return (
        // Using a wrapper <div> or <span> tag around the reference element
        // solves this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleClickOutside}
            >
                <div className={cx('search')}>
                    <input
                        ref={searchInput}
                        type="text"
                        placeholder="Search account and videos..."
                        spellCheck={false}
                        value={searchValue}
                        onChange={handleChangeSearchValue}
                        onFocus={() => setShowResult(true)}
                    />

                    {searchValue && !loading && (
                        <button className={cx('clear-btn')} onClick={handleClearSearch}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />}

                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
