import LoginForm from '../components/LoginForm'
import {useEffect} from 'react';
import {useAuth} from "../context/context";
import {useNavigate} from "react-router-dom";
import LoadingSpinner from '../components/LoadingSpinner';

const LoginPage = () => {
    

    const navigate = useNavigate()
    
    const { state, isAuthenticated, token } = useAuth()

    useEffect(()=> {
        if(token){
            return navigate('/products')
        }
    }, [token, navigate])


    if(state.isLoading){
        return <LoadingSpinner />
    }
    return (
        <div>
            <LoginForm />
        </div>
    );
}

export default LoginPage