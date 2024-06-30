import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { FaSearch } from 'react-icons/fa'
import { debounce } from 'lodash'

import '../styles/searchBar.css'


// eslint-disable-next-line react/prop-types
const SearchBar = ({ handleSearch }) => {

  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  const savedInput = useMemo(() => {
    return input;
  }, [input]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const debouncedSearch = useCallback(debounce((text) => {
      handleSearch(text);
    }, 600), [handleSearch]
  );

  useEffect(() => {
    debouncedSearch(input);
  }, [input, debouncedSearch]);

  const handleChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);
  return (
    <div className='search-wrapper'>
        
        
        <FaSearch id='search-icon' size={20}/>
        <input ref={inputRef} value={savedInput} type="text" placeholder='Type your search...' onChange={handleChange}/>
    </div>
  )
}

export default SearchBar