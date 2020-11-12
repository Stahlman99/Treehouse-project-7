// Import packages
import React from 'react';

// Returns a user-friendly no results found message
function NoResults() {
    return (
        <li className="not-found">
            <h3>No Results Found</h3>
            <p>There are no results for this search. Please try again.</p>
        </li>
    );
}

export default NoResults;