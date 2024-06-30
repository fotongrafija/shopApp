import { useEffect, useState } from 'react';
import {useParams, Link } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/singleProduct.css'

export const SingleProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function getItem() {
            try {
                setIsLoading(true);
                setIsError(false);
                const res = await fetch(`https://dummyjson.com/products/${productId}`,);
                const data = await res.json();
                setProduct(data)
            } catch (e) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        setProduct(null);
        getItem();
    }, [productId]);

    if (isLoading) {
      return <LoadingSpinner />;
    }

    return (
      <div className="single-product-wrapper">
        <h1>{product?.title}</h1>
        <div className="image-wrapper">
          {product?.images?.[0] ? <img src={product?.images?.[0]} /> : null}
        </div>
        <div className="product-info-wrapper">
          <p>{product?.description}</p>
          <p><b>Price: {product?.price} USD</b></p>
          <p>Rating: {product?.rating}</p>
          
          <p>Brand: {product?.brand}</p>
          <p>Category: {product?.category}</p>
          <Link to={'/products'}><button className='back-btn'>...back to all products</button></Link>
        </div>
          
        </div>
    );
}
