/**
 * Search component for filtering restaurants by keyword
 * @returns {JSX.Element} The rendered search bar component
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    /**
     * Handles search form submission
     * @param {React.FormEvent} e - Form submission event
     */
    const searchHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()) {
            navigate(`/eats/stores/search/${keyword}`);
        }
        else {
            navigate("/");
        }
    };

    /**
     * Clears current search input and navigates home
     */
    const clearSearchHandler = () => {
        setKeyword("");
        navigate("/");
    };

    return (
        <form onSubmit={searchHandler} className="w-100 d-flex justify-content-center">
            <div className="input-group position-relative mt-0">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Search your Favorite Restaurant here..."
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                />
                {keyword && (
                    <div className="clear-search-container position-absolute d-flex align-items-center">
                        <button
                            type="button"
                            className="enter-btn btn d-flex align-items-center justify-content-center mr-1"
                            title="Press Enter to Search"
                            onClick={searchHandler}
                        >
                            <span className="enter-text mr-1">Enter</span>
                            <i className="fa fa-level-down fa-rotate-90" aria-hidden="true"></i>
                        </button>
                        <button
                            type="button"
                            id="clear_btn"
                            className="btn d-flex align-items-center justify-content-center"
                            title="Clear Search"
                            onClick={clearSearchHandler}
                        >
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                )}
                <div className="input-group-append">
                    <button id="search_btn" className="btn" type="submit" title="Search">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Search;
