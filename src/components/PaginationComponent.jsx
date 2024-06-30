
import '../styles/pagination.css'
import {useAuth} from '../context/context'

// eslint-disable-next-line react/prop-types
export const PaginationComponent = ({ total, limit, skip, onChange }) => {
    
    const totalPages = Math.ceil(total / limit);

    const currentPage = Math.floor(skip / limit) + 1;

    const handleChange = (page) => {
        const itemtsToSkip = (page - 1) * limit;
        onChange?.(itemtsToSkip);
    }

    const { state } = useAuth()

    

  return (<>
    {!state?.isLoading &&
      <div className='pagination-wrapper'>
        <button className={'pagination-btn'} disabled={currentPage === 1} 
          onClick={() => handleChange(currentPage - 1)}>Prev</button>
        <p>{currentPage} / {totalPages}</p>
        <button className={'pagination-btn'} disabled={currentPage === totalPages} 
          onClick={() => handleChange(currentPage + 1)}>Next</button>
      </div>
    }
  </>)
}
