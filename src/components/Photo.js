// Import packages
import React from 'react';

// This function creates the Photo components
function Photo(props) {
    return (
        <li>
            <a target="_blank" rel="noreferrer" className='pexels' href={props.href}>
                <img src={props.src} alt={props.alt}/>
            </a>
        </li>
    );
}

//{`Photographer: ${props.photographerURL}`}

export default Photo;