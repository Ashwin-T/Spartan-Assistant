import './notFound.css';
const NotFound = () => {
    return (
        <>
            <div className="notFound">
                <div className='title'>
                    <img src = 'images/logoNav.png' alt = 'logo'/>
                    <h1>404</h1>
                </div>
                <div className='words'>
                    <h3>Woah there, this page doesn't exist</h3>
                    <p>Click here to navigate back</p>
                </div>
            </div>
        </>
      );
}
 
export default NotFound;