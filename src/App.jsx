import './App.css';
import './Mobile.css';
import Fullpage  from './Fullpage';
import React from 'react';
import ContactFixed from './home/ContactFixed'
import { BrowserRouter } from 'react-router-dom' // <=V5 not compatible with V6


const App = () => {
    const [showResults, setShowResults] = React.useState(false)
    const showContact = () => setShowResults(true)
    const hideContact = () => setShowResults(false)



    
  return (
    <BrowserRouter>
  <div className="wrapper">
        <Fullpage onClick={showContact} /> 
    { showResults ? <ContactFixed onClick={hideContact}/> : null }
  </div>
  </BrowserRouter>
  )
};


export default App;