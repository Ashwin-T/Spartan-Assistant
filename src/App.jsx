import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import Login from "./pages/login/Login";
import Loading from "./components/loading/Loading";
import AppRoutes from "./pages/Routes";
import {app} from "./tools/Firebase";
import { motion } from "framer-motion/dist/framer-motion";

const App = () => {
    const auth = getAuth(app);
    const [user, loading, error] = useAuthState(auth);
    const [allow, setAllow] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("showReloadIcon") === "true") {
            setAllow(true);
        } else {
            const timeout = setTimeout(() => {
                setAllow(true);
                localStorage.setItem("showReloadIcon", "true");
            }, 3000);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, []);

    const imgVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            transition: {
                duration: 0.5,
            },
            opacity: 1,
        },
    };

    return (
        <>
          {!loading ? !error ? !allow ? 
    
            <div className= 'onLoad flexbox column center'>
              <motion.img 
              src={'images/logo.png'} alt="logo"
              variants={imgVariants}
              initial="hidden"
              animate="visible"
              />
            </div> 
    
            : user ? <AppRoutes/> : <Login />: <p>I'll be honest, something broke and we can't tell what. Try a hard refresh; hopefull that will work</p> : <Loading />}
        </>
      );
    };

export default App;
