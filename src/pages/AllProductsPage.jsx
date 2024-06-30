import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import  SearchBar  from '../components/SearchBar'
import { PaginationComponent } from '../components/PaginationComponent';
import { FaArrowUpWideShort } from "react-icons/fa6";
import { FaArrowDownWideShort } from "react-icons/fa6";
import LoadingSpinner from '../components/LoadingSpinner';

// This page will show all products
export const AllProductsPage = () => {

  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [skipProducts, setSkipProducts] = useState(0);

  const [searchQuery, setSearchQuery] = useState('')

  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState(null)

  const handleSearch = (value) => {
    // search functionality
    setSkipProducts(null)
    setSearchQuery(value)
  };

    useEffect(() => {
      async function getProducts() {
        let url = searchQuery ? 'https://dummyjson.com/products/search' : 'https://dummyjson.com/products'
        const params = new URLSearchParams()
          if (searchQuery) params.append('q', searchQuery.toString())
          if (skipProducts) params.append('skip', skipProducts.toString())

          if (sortBy) params.append('sortBy', sortBy.toString())
          if (sortOrder) params.append('order', sortOrder.toString())
              
        const queryString = params.toString()
          if (queryString) url += `?${queryString}`
            try {
            setIsLoading(true);
            setIsError(false);
            const res = await fetch(url);
            const data = await res.json();
            setData(data);
          } catch (e) {
            setIsError(true);
          } finally {
            setIsLoading(false);
          }
        }
        getProducts();
    }, [skipProducts, sortBy, sortOrder, searchQuery]);
  
  function handleProductClick(productId) {
    navigate(`/products/${productId}`)
  }

  const handleChangeProducts = (number) => {
    setSkipProducts(number);
  };

  const handleChangeSort = (e) => {
    setSortBy(e.target.value)
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

    return (
        <div className='products-page'>

        {/* this is sort order component */}
          <span className='order-wrapper'>sort by 
              <select onChange={handleChangeSort}>
                  <option value="" >-</option>
                  <option value="price">Price</option>
                  <option value="title">Title</option>
              </select> 
              <button className={'order-btn'} 
                onClick={() => setSortOrder('desc')}><FaArrowDownWideShort id='arrowUp'/></button>
              <button className={'order-btn'} 
                onClick={() => setSortOrder('asc')}><FaArrowUpWideShort id='arrowDown'/></button>
          </span>
        {/* here ends sort order component */}

        <SearchBar onChange={handleSearch}/>
        
        <div className={'products-wrapper'}>
          {data?.products?.map((product) =>
            <div className={'products-item'} onClick={() => handleProductClick(product.id)} key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <p>{product.title}</p>
              <span>{product.price} $</span>
          </div>)}
        </div>
        <PaginationComponent 
          total={data?.total}
          limit={30}
          skip={data?.skip}
          onChange={handleChangeProducts}/>
        </div>
    );
}
