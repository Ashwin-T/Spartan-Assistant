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

const Source = () => {
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
                            <Navbar navType={1} />
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
                                    <Setting init={true} />
                                )
                            ) : (
                                <>
                                    <Navbar navType={1} />
                                    <Home />
                                </>
                            )}
                        </>
                    }
                />
                <Route exact path='/map' element={<Map />} />
                <Route
                    exact
                    path='/staticmap'
                    element={
                        <>
                            <Navbar navType={1} />
                            <StaticMap />
                        </>
                    }
                />
                <Route
                    exact
                    path='/settings'
                    element={
                        <>
                            <Navbar navType={1} />
                            <Setting init={false} />
                        </>
                    }
                />
                <Route
                    exact
                    path='/resources'
                    element={
                        <>
                            <Navbar navType={1} />
                            <Resources />
                        </>
                    }
                />
            </Routes>
        </>
    );
};

export default Source;
