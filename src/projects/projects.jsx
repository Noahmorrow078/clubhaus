import { useState, useEffect } from 'react';
import Item from './Item';
import slugify from "react-slugify";
import DownArrow from "../components/DownArrow";
import { createClient } from 'contentful';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";


function getRandomRotation() {
    return Math.random() * 15 - 5; // Generates a random number between -5 and 5
  }

  

const client = createClient({
    space: 'yk9odzegnojt',
    accessToken: 'Qo-cqV0zm7ZQzXFN8BuuWmwLo4yvW23cctCiBDLnYgU'
});

export default function Projects(props) {
    const [projectData, setProjectData] = useState([]);

    useEffect(() => {
        client.getEntries({
            content_type: 'projects'
        })
        .then(response => setProjectData(response.items))
        .catch(console.error);
    }, []);

    const maxDelay = 1; // Maximum delay in seconds
    const baseDelay = maxDelay / projectData.length;

    return (
        <div className="project_section">
            <div className="project_wrapper container">
                <div className="project_content">
                    <div className="project_title"><h3>RECENT PROJECTS</h3></div>
                     



                        {              
                        projectData?.slice(0,6).map(({ sys, fields }, index) => {
                            const delay = (projectData.length - index) * baseDelay;
                            
                            return (
                
                                <Item
                                title={fields.title}
                                tags={fields.tags}
                                logo={fields.logo.fields.file.url}
                                sub={fields.subtitle}
                                img={fields.image.fields.file.url}
                                categories={fields.categories}
                                link={fields.link}
                                slug={slugify(fields.title)}
                                id={sys.id}
                                theIndex={index}
                                paused={props.paused}
                                key={index}
                                projectClick={props.projectClick}
                                totalIndex={projectData.length}
                                />
                  
                            );
                        })
                        }
                 
                </div>
                <div className="project_text"></div>
            </div> 
            <DownArrow handleClick={props.arrowClick}/>
        </div>
    )
}