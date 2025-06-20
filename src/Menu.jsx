import { useState } from 'react'

function Menu( {setTypeOfConverter} ) { 
    function handleMenuClick (event) {
        // Stop the link from changing the page
        event.preventDefault();
        
        let previousConverterLink = document.querySelector('.menu .active');
        let nextConverterLink = event.currentTarget;
        // Change to a different converter if previous converter and next converter aren't the same
        if (previousConverterLink != nextConverterLink) {
            previousConverterLink.classList.remove("active", "animate-pulse");
            nextConverterLink.classList.add("active", "animate-pulse");
            // Change state to a different type of converter
            setTypeOfConverter(nextConverterLink.dataset.unitCategory);
        }
    }

    return (
        <ul className="menu text-center grid md:grid-cols-3 gap-4">
            <li><a className="active animate-pulse" data-unit-category="length" onClick={handleMenuClick}><strong>Length</strong></a></li>
            <li><a data-unit-category="weight" onClick={handleMenuClick}><strong>Weight</strong></a></li>
            <li><a data-unit-category="temperature" onClick={handleMenuClick}><strong>Temperature</strong></a></li>
        </ul>
    );
}

export default Menu;