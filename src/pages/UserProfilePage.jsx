
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom'
import '../styles/userProfile.css'
export const UserProfilePage = () => {

  const { userProfileId } = useParams();
  const [singleUser, setSingleUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


  useEffect(() => {
    async function getSingleUser() {
        try {
            setIsLoading(true);
            setIsError(false);
            const res = await fetch(`https://dummyjson.com/users/${userProfileId}`,);
            const data = await res.json();
            setSingleUser(data)
        } catch (e) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }
    setSingleUser(null);
    getSingleUser();
}, [userProfileId]);

if (isLoading) {
  return <LoadingSpinner />;
}

if (isError) {
  return <Link to={'/products'}><div>Error fetching user data</div></Link>
}

if (!singleUser) {
  return null;
}


  return (
    <div className='single-user-container'>

    <div className="main-info">
      <img src={singleUser.image} alt={`${singleUser.firstName} ${singleUser.lastName}`} />
          <h1>{singleUser.firstName} {singleUser.lastName}</h1>
    </div>
    <div className="additional-info">
          
      <table>
        <tbody>
          <tr>
            <td>Username:</td>
            <td>{singleUser.username}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{singleUser.email}</td>
          </tr>
          <tr>
            <td>Phone:</td>
            <td>{singleUser.phone}</td>
          </tr>
          <tr>
            <td>Gender:</td>
            <td>{singleUser.gender}</td>
          </tr>
          <tr>
            <td>Date of Birth:</td>
            <td>{singleUser.birthDate}</td>
          </tr>
          <tr>
            <td>Address:</td>
            <td>{`${singleUser.address.address}, ${singleUser.address.city}, ${singleUser.address.state}`}</td>
          </tr>
        </tbody>
      </table>

    </div>
      
      
    <Link to={'/products'}><button className='back-btn'>...back to all products</button></Link>
    </div>
  )
}


