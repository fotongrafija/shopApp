
import '../styles/loginForm.css' 
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/context' 
import { useNavigate } from 'react-router-dom'
const LoginForm = () => {

// FORM ANIMATION CODE  <START>
    const [focusedUser, setFocusedUser] = useState(false);
    const [validUser, setValidUser] = useState(false);
    
    const [focusedPassword, setFocusedPassword] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    
    const handleFocusUser = () => {
      setFocusedUser(true);
    };
  
    const handleFocusPassword = () => {
      setFocusedPassword(true);
    };
    const handleBlurUser = (e) => {
      setFocusedUser(false);
      setValidUser(e.target.value.trim() !== '');
    };

    const handleBlurPassword = (e) => {
      setFocusedPassword(false);
      setValidPassword(e.target.value.trim() !== '');
    };
// FORM ANIMATION CODE  <END>

const { login, token} = useAuth()

const navigate = useNavigate()

// react-hook-form
const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()



const onSubmit = async (data) => {
  await login(data.username, data.password)
  navigate('/products')
  reset() // Reset the form after submission
}

return (
<div className="login-box">
  <h2>Login</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="user-box">
        <input
              {...register('username', { required: true })}
              type="text"
              onFocus={handleFocusUser}
              onBlur={handleBlurUser}
            />
          {errors.username?.type === 'required' && <span className="error-message">Username is required</span>}
        <label
            className={`${focusedUser || validUser ? 'focused-user' : ''}`}
              style={{
                top: focusedUser || validUser ? '-20px' : '0',
                fontSize: focusedUser || validUser ? '12px' : '16px',
                color: focusedUser || validUser ? '#03e9f4' : '#fff',
                    }}
          >Username</label>
      </div>
      <div className="user-box">
        <input
              {...register('password', { required: 'Password is required', minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long'
              } })}
              type="password"
              onFocus={handleFocusPassword}
              onBlur={handleBlurPassword}
            />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        <label
            className={`${focusedPassword || validPassword ? 'focused-password' : ''}`}
              style={{
                top: focusedPassword || validPassword ? '-20px' : '0',
                fontSize: focusedPassword || validPassword ? '12px' : '16px',
                color: focusedPassword || validPassword ? '#03e9f4' : '#fff',
                    }}
          >Password</label>
      </div>
      <button disabled={isSubmitting} className='login-form-btn' type='submit' >{isSubmitting ? 'Loading...' : 'Login'}</button>
    </form>
</div>
  
)
}

export default LoginForm