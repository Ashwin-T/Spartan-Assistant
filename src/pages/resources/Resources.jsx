import "./resources.css";
import * as faqs from "../../data/Faq.json";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AiOutlineArrowDown } from "react-icons/ai";
const Resources = () => {
    const links = [
        {
            name: "Mental Health Services",
            link: "https://www.mentalhealth.gov/",
            description: "Mental Health Services is a free, online service that provides mental health information and services to people in need.",
            image: "images/metalHealthLogo.png",
        },
        {
            name: "Canvas",
            link: "https://mvla.instructure.com/",
            description: "Canvas is a web application that allows teachers to create and manage course content.",
            image: "images/canvasLogo.png",
        },
        {
            name: "Aeries",
            link: "https://mvla.asp.aeries.net/student/LoginParent.aspx?page=default.aspx",
            description: "Aeries is a school management and grading system for students and parents.",
            image: "images/aeriesLogo.png",
        },
        {
            name: "Mvhs.io",
            link: "https://mvhs.io",
            description: "Mvhs.io is a versitle app for MVHS staff and students.",
            image: "images/mvhsioLogo.png",
        },
        {
            name: "Periods.io",
            link: "https://periods.io",
            description: "Manage your time more effectively by tracking the remaining time in class",
            image: "images/periodsioLogo.png",
        }, 
        {
            name: "Google Classroom",
            link: "https://classroom.google.com",
            description: "Google Classroom is a free online course management tool for teachers and students.",
            image: "images/google-classroom-logo.png",
        }
    ];

    return (
        <>
            <div className='flexbox column helloWorld'>
                <div className='main-resources-container'>
                    <h1 className='main-resources'>Resources</h1>
                    <div className='right-triangle-title'></div>
                </div>

                <div className='flexbox resouces-container row'>
                    <div className='flexbox faq-container'>
                        <h3>FAQ</h3>
                        {faqs.faqs.map((item, index) => {
                            return (
                                <Accordion key = {index}>
                                    <AccordionSummary expandIcon={<AiOutlineArrowDown />} aria-controls='panel1a-content' id='panel1a-header'>
                                        <h3>{item.faq}</h3>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <p>{item.answer}</p>
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })}
                    </div>
                    <div className='link-container'>
                        <h3>Links</h3>
                        {links.map((link, index) => {
                            return (
                                <a key={index} className='flexbox importantLinks' href={link.link} target='_blank' rel='noopener noreferrer'>
                                    <img src={link.image} alt='logo for icon' />
                                    <h3>{link.name}</h3>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Resources;
