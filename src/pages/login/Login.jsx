import './login.css';

import GoogleButton from 'react-google-button';
import useMobileState from '../../hooks/useMobileState';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {

    const provider = new GoogleAuthProvider();


    const auth = getAuth();

    const signIn = () => {
        signInWithPopup(auth, provider)
    }


    return (  
        <>
            <div className="flexbox column center">
                <div className="loginContainer flexbox center">

                    {
                        !useMobileState() &&
                        <div className="loginContent loginImage">
                            <div>Make timelapse of walking around school</div>
                        </div>
                    }   
                    <div className="loginContent loginLogin">
                        <img src = 'images/logo.png' alt = 'logo'/>
                        <GoogleButton onClick = {signIn}/>
                    </div>
                </div>
            </div> 
        </>
    );
}
 
export default Login;
