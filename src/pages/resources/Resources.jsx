import  './resources.css'

const Resources = () => {

    const links = [
        {
            name: 'Canvas',
            link: 'https://mvla.instructure.com/',
            description: 'Canvas is a web application that allows teachers to create and manage course content.',
            image: 'images/canvasLogo.png'
        },
        {
            name: 'Aeries',
            link: 'https://mvla.asp.aeries.net/student/LoginParent.aspx?page=default.aspx',
            description: 'Aeries is a school management and grading system for students and parents.',
            image: 'images/aeriesLogo.png'
        },
        {
            name: 'Google Classroom',
            link: 'https://classroom.google.com',
            description: 'Google Classroom is a free online course management tool for teachers and students.',
            image: 'images/google-classroom-logo.png'
        },
        {
            name: 'Periods.io',
            link: 'https://periods.io',
            description: 'Manage your time more effectively by tracking the remaining time in class',
            image: 'images/periodsioLogo.png'
        },
        {
            name: 'Mvhs.io',
            link: 'https://mvhs.io',
            description: 'Mvhs.io is a versitle app for MVHS staff and students.',
            image: 'images/mvhsioLogo.png'
        },

    ]
    
    return(
        <>
        <div className="flexbox column center">
            <div className="container center">
                <br/>
                <h1 className="titleResources">Resources</h1>

                <div className="flexbox row center">
                    <div className="flexbox faq-container">
                        
                    </div>
                    <div className="link-container">
                        <h3 style={{textAlign: 'center', width: 100+"%"}}>Links</h3>
                        {links.map((link, index) => {
                            return (
                                <a key = {index} className="flexbox importantLinks" href={link.link} target="_blank" rel="noopener noreferrer">
                                    <img src={link.image} alt = 'logo for icon' />
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