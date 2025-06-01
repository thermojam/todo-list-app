import React from 'react';
import styles from './SearchSortBar.module.css';

export const SearchSortBar = ({search, setSearch, sortAsc, toggleSort}) => {
    return (
        <div className={styles.bar}>
            <input
                className={styles.search}
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button className={styles.sort} onClick={toggleSort}>
                {sortAsc ? '🔼' : '🔽'}
            </button>
        </div>
    );
};
