
import React from 'react';

export default React.memo(function Item(props) {

  
    return (

     <div id={props.id} style={{
         animationDelay:`.${props.theIndex}s`,
         opacity:'0'
     }}
     className="project_item"
     >

         
        
        <a href={props.link}></a>
        { props.paused ? <img src=''/> :   
        
        <div className="image" style={{
            backgroundImage: `url(${props.img})`,
        }}>
        </div>  }



        <div className="title">

            <h3>{props.title}</h3>
        </div>

      
        
    </div>
    
    )
}
)