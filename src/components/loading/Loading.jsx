import ReactLoading from 'react-loading';
import './loading.css';

const Loading = () => {
    return ( 
        <div className="flexbox column center loading">
            <ReactLoading type='spin' color='#D7BE69' height={75} width={75} />
        </div>
     );
}
 
export default Loading;