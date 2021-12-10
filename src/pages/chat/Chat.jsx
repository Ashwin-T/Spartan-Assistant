import FreshmenChat from './freshChat/FreshmenChat'
import Loading from '../../components/loading/Loading'
import { useState } from 'react'

const Chat = () => {

    const [loading, setLoading] = useState(false)
    const [isUserFreshmen, setIsUserFreshmen] = useState(true)

    return(
        <>
            {loading ? <Loading />: isUserFreshmen ? <FreshmenChat /> : null}
            
        </>
    )
}

export default Chat;