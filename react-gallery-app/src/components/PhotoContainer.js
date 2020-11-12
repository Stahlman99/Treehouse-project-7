// Import packages
import React from 'react';
import Photo from './Photo'
import NoResults from './NoResults'

// This function creates the PhotoContainer component
function PhotoContainer(props) {

    let photos;

    // Creates a Photo component for each picture.
    if(props.data === undefined) {
        photos = <h1 className='not-found'>Loading...</h1>;
    }
    else if (props.data.length <= 0){
        photos = <NoResults />;
    } else {
        photos = props.data.map(photo => {
            return <Photo href={photo.url} key={photo.id} src={photo.src.landscape} alt={photo.photographer}/>;
        });
    }

    // Returns the component with the photos included.
    return(
        <div className="photo-container">
            <h2>{props.title}</h2>
            <ul>
                {photos}
            </ul>
            <a className='pexels' href="https://www.pexels.com">Photos provided by Pexels</a>
        </div>
    );
}

export default PhotoContainer;