import { useState } from 'react'

function Menu() { 
    return (
        <ul className="menu text-center grid md:grid-cols-3 gap-4">
            <li><a className="active" data-unit-category="length">Length</a></li>
            <li><a data-unit-category="weight">Weight</a></li>
            <li><a data-unit-category="temperature">Temperature</a></li>
        </ul>
    );
}

export default Menu;