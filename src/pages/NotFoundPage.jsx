
import { Link } from 'react-router-dom'

// This is a React component that renders a 404 Not Found page
export const NotFoundPage = () => {
  return (
    <div className='not-found-page'>
        <h1>404 Not Found</h1>
        <br /><br />
        <Link to="/products"><button className='not-found-btn'>Go back</button></Link>
    </div>
  )
}
