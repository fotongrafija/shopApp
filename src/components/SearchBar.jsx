import { useState, useEffect, useCallback } from 'react'
import { FaSearch } from 'react-icons/fa'
import { debounce } from 'lodash'

import '../styles/searchBar.css'


// eslint-disable-next-line react/prop-types
const SearchBar = ({ onChange }) => {

  const [input, setInput] = useState('');
  

  

 

  const debouncedSearch = useCallback(debounce((text) => {
      onChange(text);
    }, 1000), [onChange]
  );

  useEffect(() => {
    debouncedSearch?.(input);
  }, [input]);

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  return (
    <div className='search-wrapper'>
        
        
        <FaSearch id='search-icon' size={20}/>
        <input value={input} type="text" placeholder='Type your search...' onChange={handleChange}/>
    </div>
  )
}

export default SearchBar