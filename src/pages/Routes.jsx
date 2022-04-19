import React from "react";
import { useState, useEffect } from "react";

import Navbar from "../components/navbar/Navbar";
import Loading from "../components/loading/Loading";
import Home from "./home/Home";
import Map from "./map/Map";
import StaticMap from "./map/StaticMap";
import Setting from "./setting/Setting";
import Resources from "./resources/Resources";
import NotFound from "./notFound/NotFound";

import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "@firebase/auth";

import { Route, Routes } from "react-router-dom";

const db = getFirestore();
const auth = getAuth();

const AppRoutes = () => {
    const [dontRedirect, setDontRedirect] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        const checkData = async () => {
            if (auth.currentUser == null) {
                return;
            }
            const docRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                localStorage.setItem("periods", JSON.stringify([...docSnap.data().periods]));
                setDontRedirect(true);
            } else {
                // doc.data() will be undefined in this case
                localStorage.setItem("hasAdded", "false");
                setDontRedirect(false);
            }
            setLoading(false);
        };

        checkData();
        
    }, []);

    return (
        <>
            <Routes>
                <Route
                    path='*'
                    element={
                        <>
                            <Navbar />
                            <NotFound />
                        </>
                    }
                />
                <Route
                    index
                    exact path='/'
                    element={
                        <>
                            {!dontRedirect ? (
                                loading ? (
                                    <Loading />
                                ) : (
                                    <Setting init={true} setDontRedirect = {setDontRedirect}/>
                                )
                            ) : (
                                <>
                                    <Navbar />
                                    <Home />
                                </>
                            )}
                        </>
                    }
                />
                <Route exact path='/map' element={
                    <>
                        <Map />
                    </>
                } />
                <Route
                    exact
                    path='/staticmap'
                    element={
                        <>
                            <Navbar />
                            <StaticMap />
                        </>
                    }
                />
                <Route
                    exact
                    path='/settings'
                    element={
                        <>
                            <Setting init={false} />
                        </>
                    }
                />
                <Route
                    exact
                    path='/resources'
                    element={
                        <>
                            <Navbar />
                            <Resources />
                        </>
                    }
                />
            </Routes>
        </>
    );
};

export default AppRoutes;
