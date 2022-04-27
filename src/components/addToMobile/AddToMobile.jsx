
import {MdOutlineIosShare} from 'react-icons/md';
import {BsThreeDotsVertical} from 'react-icons/bs';
import {ImCross} from 'react-icons/im';
import {motion} from 'framer-motion';
import './addToMobile.css';
import {useState} from 'react';

const AddToMobile = () => {

    const userAgent = window.navigator.userAgent
    const [hasAdded, setHasAdded] = useState(!isRunningStandalone());
    const isAndroid = userAgent.indexOf('Android') > -1;
    const isIOS = userAgent.indexOf('iPhone') > -1;

    const handleAllowClick = () => {
        setHasAdded(false);
    }

    function isRunningStandalone() {
        return (window.matchMedia('(display-mode: standalone)').matches);
    }


    const variants = {
        initial : {
            y: '-100vh',
        },
        final: {
            y: '0',
            transition:{ 
                ease: 'easeIn',
                duration: 3,
            }
        },
        

    }
    return ( 
        <>
            {hasAdded ? <motion.div className="add-to-mobile"
                variants={variants}
                initial="initial"
                animate="final"
                exit="initial"
            >
                <div className="flexbox cancel-icon">
                    <ImCross size = {20} onClick={handleAllowClick}/>
                </div>
                <div className='flexbox column center'>
                    <img src = 'images/logoNav.png' alt = 'mobile logo'/>
                    <p>
                        To add this web app to the home screen tap
                    </p>

                    {
                        isIOS && 
                        <MdOutlineIosShare style = {{color: 'dodgerblue', margin: '0'}} size = {25}/>

                    }
                    {
                        isAndroid &&
                        <BsThreeDotsVertical size = {25}/>
                    }
                    <p>
                        and then press <span style = {{fontWeight: 'bold'}}>Add to Home Screen</span>
                    </p>
                </div>
            </motion.div >
            : 
                <>

                </>
            }
        </> 
    );
}
 
export default AddToMobile;