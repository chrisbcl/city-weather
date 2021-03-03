import { useState, ChangeEvent, KeyboardEvent } from 'react';
import classes from './SearchBar.module.css';

interface SearchBarProps {
    /** Placeholder for the input */
    placeholder?: string;
    /** Callback to be executed when the user triggers the search */
    onSearch: (input: string) => void;
    /** Indicates if the loading animation on the search bar is active */
    isLoading?: boolean;
    /** Error message to be displayed if the search term returned an error */
    errorMessage: string | null;
}

/**
 * Displays a search bar that executes a callback with the input written when
 * the user press down the Enter key or clicks on the search icon button
 */
const SearchBar = ({ onSearch, placeholder, isLoading = false, errorMessage }: SearchBarProps) => {
    const [searchInput, setSearchInput] = useState('');

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') {
            return;
        }
        onSearch(searchInput);
    };

    const onSearchIconClick = () => {
        onSearch(searchInput);
    };

    return (
        <div className={classes.SearchBar}>
            <div className={`ui icon input ${isLoading ? 'loading' : ''}`}>
                <input
                    data-testid='search-bar-input'
                    type='text'
                    placeholder={placeholder}
                    value={searchInput}
                    onChange={onInputChange}
                    onKeyDown={onInputKeyDown}
                />
                <i
                    data-testid='search-bar-button'
                    className='search circular link icon'
                    onClick={onSearchIconClick}
                ></i>
            </div>
            {errorMessage && <p className={classes.Error}>{errorMessage}</p>}
        </div>
    );
};

export default SearchBar;
