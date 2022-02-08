import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import Login from "./pages/login/Login";
import Error from "./components/error/Error";
import Loading from "./components/loading/Loading";
import Source from "./pages/Source";
import app from "./tools/Firebase";
import { motion } from "framer-motion/dist/framer-motion";

const App = () => {
    const auth = getAuth(app);
    const [user, loading, error] = useAuthState(auth);
    auth.signOut();

    const [allow, setAllow] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("allow") === "true") {
            setAllow(true);
        } else {
            const timeout = setTimeout(() => {
                setAllow(true);
            }, 3000);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, []);

    //window.localStorage.clear(); // for testing

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
            {!loading ? (
                !error ? (
                    !allow ? (
                        <div className='onLoad flexbox column center'>
                            <motion.img src={"images/logo.png"} alt='logo' variants={imgVariants} initial='hidden' animate='visible' />
                        </div>
                    ) : user ? (
                        <Source />
                    ) : (
                        <Login />
                    )
                ) : (
                    <Error />
                )
            ) : (
                <Loading />
            )}
        </>
    );
};

export default App;
