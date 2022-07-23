import React from "react";
import { useState, useEffect, Suspense } from "react";

import Navbar from "../components/navbar/Navbar";
import Loading from "../components/loading/Loading";
import Home from "./home/Home";
import AddToMobile from "../components/addToMobile/AddToMobile";

import {app} from "../tools/Firebase";

const StaticMap = React.lazy(() => import("./map/StaticMap"));
const Setting = React.lazy(() => import("./setting/Setting"));
const Resources = React.lazy(() => import("./resources/Resources"));
const NotFound = React.lazy(() => import( "./notFound/NotFound"));
const Version = React.lazy(() => import("./version/Version"));
const Map = React.lazy(() => import("./map/Map"));

import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "@firebase/auth";

import { Route, Routes } from "react-router-dom";

const db = getFirestore(app);
const auth = getAuth(app);

const AppRoutes = () => {
    const [dontRedirect, setDontRedirect] = useState(false);
    const [loading, setLoading] = useState(true);

    function isRunningStandalone() {
        return (window.matchMedia('(display-mode: standalone)').matches);
    }

    const [hasAdded, setHasAdded] = useState(!isRunningStandalone());
    
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
            <Suspense fallback={<Loading />}>
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
                        path='/static-map'
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
                    <Route 
                        exact
                        path='/version'
                        element={
                            <>
                                <Navbar />
                                <Version />
                            </>
                        }
                    />

                </Routes>

            </Suspense>

            <AddToMobile hasAdded = {hasAdded} setHasAdded = {setHasAdded} />

        </>
    );
};

export default AppRoutes;
