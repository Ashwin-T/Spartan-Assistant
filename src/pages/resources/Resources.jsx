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
            name: 'G Classroom',
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
        {
            name: 'MVHS Website',
            link: 'https://mvhs.mvla.net',
            description: 'MVHS Offical Website',
            image: 'images/mvhslogo.png'
        }
    ]
    
    return(
        <>
        <div className="flexbox column center">
            <div className="flexbox column center container">
                <h1>Resources</h1>

                <div className="resources flexbox center">
                    {links.map((link, index) => {
                        return (
                            <a key = {index} className="flexbox center importantLinks" href={link.link} target="_blank" rel="noopener noreferrer">
                                <img src={link.image} alt={link.name} /> 
                                <h3>{link.name}</h3>
                            </a>
                        )
                    })}
                </div>
            </div>
        </div>
        </>
    )
}

export default Resources;