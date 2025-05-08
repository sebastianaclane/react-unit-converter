import { useState } from 'react'

function Menu() { 
    let defaultLinkSelected = ['length', 'active'];

    return (
        <ul className="menu text-center grid md:grid-cols-3 gap-4">
            <li><a className={defaultLinkSelected.join(' ')} data-unit-category="length">Length</a></li>
            <li><a className="weight" data-unit-category="weight">Weight</a></li>
            <li><a className="temperature" data-unit-category="temperature">Temperature</a></li>
        </ul>
    );
}

export default Menu;