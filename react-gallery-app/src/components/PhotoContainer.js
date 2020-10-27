// Import packages
import React from 'react';
import Photo from './Photo'
import NotFound from './NotFound'

// This function creates the PhotoContainer component
function PhotoContainer(props) {

    let photos;

    // Creates a Photo component for each picture.
    if(props.data !== undefined && props.data !== null) {
        photos = props.data.map(photo => {
            return <Photo key={photo.id}src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}/>
        });
    } else {
        photos = <NotFound />;
    }

    // Returns the component with the photos included.
    return(
        <div className="photo-container">
            <h2>{props.title}</h2>
            <ul>
                {photos}
            </ul>
        </div>
    );
}

export default PhotoContainer;