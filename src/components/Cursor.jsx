import React, { useState, useEffect } from 'react';


const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [click, setClick] = useState(false);
  const [linkHover, setLinkHover] = useState(false);
  
  useEffect(() => {

    const track=document.querySelector('.menu')//To access the div with class slide track
    console.log(track);

    const addEventListeners = () => {
      document.addEventListener('mousemove', mMove);
      document.addEventListener('mouseenter', mEnter);
      document.addEventListener('mouseleave', mLeave);
      document.addEventListener('mousedown', mDown);
      document.addEventListener('mouseup', mUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', mMove);
      document.removeEventListener('mouseenter', mEnter);
      document.removeEventListener('mouseleave', mLeave);
      document.removeEventListener('mousedown', mDown);
      document.removeEventListener('mouseup', mUp);

    };

    const mDown = () => {
      setClick(true);
    };

    const mUp = () => {
      setClick(false);
    };
    
    const mMove = (el) => {
      setPosition({ x: el.clientX, y: el.clientY });
    };

    const mLeave = () => {
      setHidden(true);
    };

    const mEnter = () => {
      setHidden(false);
    };
    
    const addLinkEvents = () => {
      document.querySelectorAll('a').forEach((el) => {
        el.addEventListener('mouseover', () => setLinkHover(true));
        el.addEventListener('mouseout', () => setLinkHover(false));
      });

    };

    addEventListeners();
    addLinkEvents();
    return () => removeEventListeners();
  }, []);


  return (
    <div
      className={
        'cursor ' +
        (hidden ? 'c--hidden ' : ' ') + 
        (click ? 'c--click ' : ' ') +
        (linkHover ? 'c--hover ' : ' ')
      }
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default Cursor;