
import {MdOutlineIosShare} from 'react-icons/md';
import {BsThreeDotsVertical} from 'react-icons/bs';
import {ImCross} from 'react-icons/im';
import {motion} from 'framer-motion';
import './addToMobile.css';
const AddToMobile = ({setFunction}) => {

    const userAgent = window.navigator.userAgent

    const isAndroid = userAgent.indexOf('Android') > -1;
    const isIOS = userAgent.indexOf('iPhone') > -1;

    const handleAllowClick = () => {
        localStorage.setItem("hasAdded", "true");
        setFunction(true)
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
            <motion.div className="add-to-mobile"
                variants={variants}
                initial="initial"
                animate="final"
                exit="initial"
            >
                <div className="flexbox cancel-icon">
                    <ImCross size = {25} onClick={() => setFunction(true)}/>
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
                    <button onClick = {handleAllowClick} className="add-to-mobile-button">I added it!</button>
                </div>
            </motion.div >
        </> 
    );
}
 
export default AddToMobile;