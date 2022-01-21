import  './resources.css'

const Resources = () => {

    const links = [
        {
            name: 'Canvas',
            link: 'https://mvla.instructure.com/',
        },
        {
            name: 'Aeries',
            link: 'https://mvla.asp.aeries.net/student/LoginParent.aspx?page=default.aspx',
        },
        {
            name: 'Google Classroom',
            link: 'https://classroom.google.com',
        }
    ]
    
    return(
        <>
        <div className="flexbox column center">
            <div className="flexbox column container">
                <h1>Resources</h1>

                <div className="flexbox row center">
                    <div className="flexbox faq-container">
                        
                    </div>
                    <div className="flexbox link-container">
                        <h3 style={{textAlign: 'center', width: 100+"%"}}>Links</h3>
                        {links.map((link, index) => {
                            return (
                                <a key = {index} className="flexbox align-items-right importantLinks" href={link.link} target="_blank" rel="noopener noreferrer">
                                    <h3>{link.name}</h3>
                                </a>
                            )
                        })}
                    </div>
                    
                </div>
                
            </div>
        </div>
        </>
    )
}

export default Resources;