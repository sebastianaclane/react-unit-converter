import { useState, useRef } from 'react'
// millimeter, centimeter, meter, kilometer, inch, foot, yard, mile.
//         <form className="form grid gap-4" onSubmit={convertUnit}>
// <label for="unitamount">Enter the {unit} to convert</label><br/>

function Form( {typeOfConverter} ) {
    let convertFromRef = useRef('millimeter');
    let convertToRef = useRef('millimeter');

    return (
        <form className="form grid gap-4">
            <label for="unitamount">Enter the {typeOfConverter} to convert</label>
            <input type="text" id="unitamount" name="unitamount"/>
            <label for="convertfrom">Unit to Convert from</label>
            <select name="convertfrom" ref={convertFromRef}>
                <option value="millimeter">Millimeter</option>
                <option value="centimeter">Centimeter</option>
                <option value="meter">Meter</option>
                <option value="kilometer">Kilometer</option>
                <option value="inch">Inch</option>
                <option value="foot">Foot</option>
                <option value="yard">Yard</option>
                <option value="mile">Mile</option>
            </select>     
            <label for="convertto">Unit to Convert to</label>
            <select name="convertto" ref={convertToRef}>
                <option value="millimeter">Millimeter</option>
                <option value="centimeter">Centimeter</option>
                <option value="meter">Meter</option>
                <option value="kilometer">Kilometer</option>
                <option value="inch">Inch</option>
                <option value="foot">Foot</option>
                <option value="yard">Yard</option>
                <option value="mile">Mile</option>    
            </select>
            <button type="submit">Convert</button>
        </form>
    );
}

export default Form;