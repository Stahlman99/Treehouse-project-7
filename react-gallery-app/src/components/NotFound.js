// Import packages
import React from 'react';

// Returns a user-friendly no results found message
function NotFound() {
    return (
        <li className="not-found">
            <h3>No Results Found</h3>
            <p>There are no results for this page. Please try again.</p>
        </li>
    );
}

export default NotFound;