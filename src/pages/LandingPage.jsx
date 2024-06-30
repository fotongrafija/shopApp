import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { useAuth } from '../context/context'

const LandingPage = () => {


  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

//   if (isAuthenticated) {
//     return navigate('/products')
// }
  return (
    <div className='landing-page-container'>
        <img src={logo} alt="" />
        <h1>Welcome to Shop Page</h1>
        <p>Please go to Login</p>
        <p>For username type: <span>emilys</span></p>
        <p>For password type: <span>emilyspass</span></p>
    </div>
  )
}

export default LandingPage