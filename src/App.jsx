import React from 'react';
import { getAuth } from "firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth';

import Login from './pages/login/Login';
import Error from './components/error/Error';
import Loading from './components/loading/Loading';
import Source from './components/Source';

import app from './tools/Firebase'

const App = () =>{

  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
      {!loading ? !error ? user ? <Source/> : <Login />: <Error /> : <Loading />}
    </>
  );
}

export default App;
