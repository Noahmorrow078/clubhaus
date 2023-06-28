import { useState, useEffect } from 'react';
import Item from './Item';
import slugify from "react-slugify";
import DownArrow from "../components/DownArrow";
import { createClient } from 'contentful';
import { FreeMode, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";


function getRandomRotation() {
    return Math.random() * 15 - 5; // Generates a random number between -5 and 5
  }

let isMobile = window.innerWidth <= 821; // Set the threshold for mobile devices
let leftValue = isMobile ? 320 : 360;
  

let client = createClient({
    space: 'yk9odzegnojt',
    accessToken: 'Qo-cqV0zm7ZQzXFN8BuuWmwLo4yvW23cctCiBDLnYgU'
});

export default function ProjectSlider(props) {
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
                     <Swiper modules={[Navigation, FreeMode]} 
                     spaceBetween={20}  
                     navigation 
                     slidesPerView={1.3}  
                     centeredSlides={false}  
                     initialSlide={0} 
                     freeMode={true}
                     breakpoints={{  
                            980: {slidesPerView: 4},
                            825: {slidesPerView: 3}, 
                            768: {slidesPerView: 2},

                        }
                        }
                        style={{paddingTop:'65px'}}>



                        {              
                        projectData?.slice(0,6).map(({ sys, fields }, index) => {
                            const delay = (projectData.length - index) * baseDelay;
                            
                            return (
                            <SwiperSlide
                                key={`${index}_${fields.title}`}
                                style={{
                                width:'320px !important',
                                zIndex: projectData.length - index < 0 ? projectData.length - index : 0,
                                animationDelay: `${delay}s`,
                                rotate: `${getRandomRotation()}deg`,
                                translate:`-${320 * index}px`,
                                position:'relative'
                                }}
                            >
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
                            </SwiperSlide>
                            );
                        })
                        }
                    </Swiper> 
                    <a href="/projects" className="btn2 center">View All Projects</a>

                </div>
            </div> 
        </div>
    )
}
