import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

const useSettings = () => {
    let navigate = useNavigate();

    useEffect(() => {

        const checkData = async () => {
            if (localStorage.getItem("gradYear") == null || localStorage.getItem("periods") == null) {
                navigate("/");
            }
        }

        checkData();
        
    }, [])

}

export default useSettings;