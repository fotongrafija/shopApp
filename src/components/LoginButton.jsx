
import { Link } from 'react-router-dom'

// This component renders a button that links to the login page
export const LoginButton = () => {
  return (
    <div>
        <Link to="/login">
            <button className="login-button">Login</button>
        </Link>
    </div>
  )
}
