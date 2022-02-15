import "./login.css";   
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
                        <img src='images/logo.png' alt = 'logo with words'></img>
                    </span>
                </div>
            </div>
            <div className='main-container-google'>
                <div className='button-container'>
                    <button className='google-button' onClick={signIn}>
                        <img src='images/googleLogo.svg' alt = 'google logo'></img>
                        <span>Log in with Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
