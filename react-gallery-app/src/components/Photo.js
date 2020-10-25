import React from 'react';

function Photo(props) {
    return (
        <li>
            <img src={props.src} alt=""/>
        </li>
    );
}

export default Photo;