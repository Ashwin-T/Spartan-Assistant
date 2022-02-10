import './error.css';

const Error = ({message}) => {

    const errorVariants = {
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
            <motion.div className="error-container flexbox column center"
                variants={errorVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1>{message}</motion.h1>
            </motion.div>
        </>
     );
}
 
export default Error;