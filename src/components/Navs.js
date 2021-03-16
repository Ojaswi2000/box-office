import React from 'react';
import {Link} from 'react-router-dom';

const Navs = () => {
    
    return (
        <div>
            <ul>
                <li>
                    <Link to="/starred">
                        Go to the starred page
                    </Link> 
                </li>
            </ul>
        </div>
    )
}

export default Navs
