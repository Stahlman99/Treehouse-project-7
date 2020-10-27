// Import packages
import React from 'react';

// This function creates the Photo components
function Photo(props) {
    return (
        <li>
            <img src={props.src} alt=""/>
        </li>
    );
}

export default Photo;