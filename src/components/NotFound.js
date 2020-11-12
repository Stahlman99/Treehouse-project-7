// Import packages
import React from 'react';

// Returns a user-friendly no results found message
function NotFound() {
    return (
        <li className="not-found">
            <h3>Page Not Found</h3>
            <p>The page you requested does not exist. Please try again.</p>
        </li>
    );
}

export default NotFound;