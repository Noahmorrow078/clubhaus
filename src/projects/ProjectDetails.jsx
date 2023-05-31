import { createClient } from 'contentful'
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom/dist';
import ReactFullpage from '@fullpage/react-fullpage';
import MainMenu from '../home/MainMenu';
import "./project.scss"
import Item from './Item';

const client = createClient({
    space: 'yk9odzegnojt',
    accessToken: 'Qo-cqV0zm7ZQzXFN8BuuWmwLo4yvW23cctCiBDLnYgU'
});



const ProjectDetails = () => {

const {id} = useParams();
console.log(id)

    const [singleprojectData, setSingleProjectData] = useState({});

    useEffect(() => {
      client.getEntries({
        'sys.id': id
    }).then(response => setSingleProjectData(response))
        .catch(console.error);
    }, [id]);

  const project = singleprojectData.items && singleprojectData.items[0].fields; // Add conditional check
  const sections = project?.sections || [];

  console.log(project);
  console.log(sections);

  return (

      <div class="project-details mt-5 pt-5">
        <div className="container-sm">
        <div className="row align-items-center">
        </div>
        {project?.title}
        {project?.text}
        <img  src={project?.image.fields.file.url}/>

        {
        sections?.map((item) => (
          <div key={item.sys.id + item.fields.title} className="row section">
              <div
                className={`col ${
                  item.fields.media.length === 1 && !item.fields.title && !item.fields.text
                    ? 'col-12 singleImage'
                    : item.fields.media.length > 1
                    ? 'col-12 multiple-images'
                    : 'col-12 col-md-5'
                }`}
              >
                {item.fields.media.map((mediaItem) => (
                  <img key={mediaItem.id} src={`${mediaItem.fields.file.url}`} />
                ))}
              </div>

            <div  className={`col ${item.fields.media.length > 1 ? 'col-12' : 'col-12 col-md-7'}`}>
                <h3>{item.fields.title}</h3>
                <p>{item.fields.text}</p>
            </div>
          </div>
        ))
      }

        </div>
      </div>

   
  )
}

export default ProjectDetails