import "./login.css";

import GoogleButton from "react-google-button";
import useMobileState from "../../hooks/useMobileState";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {
    const provider = new GoogleAuthProvider();

    const auth = getAuth();

    const signIn = () => {
        signInWithPopup(auth, provider);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100vh" }}>
            <div className='login-title-container'>
                <div className='banana'>
                    <h1>Welcome to </h1>
                    <span>
                        <img src='images/logo.png'></img>
                    </span>
                </div>
            </div>
            <div className='main-container-google'>
                <div class='button-container'>
                    <h2>To use, please</h2>
                    <button className='google-button' onClick={signIn}>
                        <img src='images/googleLogo.svg'></img>
                        <span>Log in with Google</span>
                    </button>
                </div>
            </div>
        </div>
    );

    // return (
    //     <>
    //         <div className="flexbox column center">
    //             <div className="loginContainer flexbox center">

    //                 {
    //                     !useMobileState() &&
    //                     <div className="loginContent loginImage">
    //                         <div>Make timelapse of walking around school</div>
    //                         <div>(Slideshows, videos, etc.)</div>
    //                     </div>
    //                 }
    //                 <div className="loginContent loginLogin">
    //                     <img src = 'images/logo.png' alt = 'logo'/>
    //                     <GoogleButton onClick = {signIn}/>
    //                 </div>
    //             </div>
    //         </div>
    //     </>
    // );
};

export default Login;
