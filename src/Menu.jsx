import { useState } from 'react'

function Menu( {changeTypeOfConverter} ) { 
    function handleMenuClick (event) {
        // 1. Stop the link from changing page
        event.preventDefault();

        let previousConverterLink = document.querySelector('.menu .active');
        let nextConverterLink = event.currentTarget;

        // 2. Change to a different converter if previous converter and next converter aren't the same
        if (previousConverterLink != nextConverterLink) {
            // 3. Remove "active" class from previous link
            previousConverterLink.classList.remove("active");
            // 4. Add "active" class to new selected link
            nextConverterLink.classList.add("active");
            // 5. Change state to a different type of converter
            changeTypeOfConverter(nextConverterLink.dataset.unitCategory);
        }
    }

    return (
        <ul className="menu text-center grid md:grid-cols-3 gap-4">
            <li><a className="active" data-unit-category="length" onClick={handleMenuClick}>Length</a></li>
            <li><a data-unit-category="weight" onClick={handleMenuClick}>Weight</a></li>
            <li><a data-unit-category="temperature" onClick={handleMenuClick}>Temperature</a></li>
        </ul>
    );
}

export default Menu;