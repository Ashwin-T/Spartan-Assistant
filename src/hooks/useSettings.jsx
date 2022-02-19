import {useNavigate} from 'react-router-dom';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useEffect } from 'react';

const useSettings = () => {
    let navigate = useNavigate();

    const auth = getAuth();

    useEffect(() => {

        const db = getFirestore();

        const checkData = async () => {
            const docRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                
            } else {
                // doc.data() will be undefined in this case
                navigate("/");
            }
        }

        checkData();
        
    }, [])

}

export default useSettings;