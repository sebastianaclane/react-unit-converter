import { useState, useRef } from 'react'

function Form( {typeOfConverter} ) {
    let unitAmountRef = useRef('');
    let convertFromRef = useRef('');
    let convertToRef = useRef('');

    const lengthUnits = {
        millimeter: "Millimeter",
        centimeter: "Centimeter",
        meter: "Meter",
        kilometer: "Kilometer",
        inch: "Inch",
        foot: "Foot",
        yard: "Yard",
        mile: "Mile" 
    };

    const weightUnits = {
        milligram: "Milligram",
        gram: "Gram",
        kilogram: "Kilogram",
        ounce: "Ounce",
        pound: "Pound" 
    };

    const tempUnits = {
        celsius: "Celsius",
        fahrenheit: "Fahrenheit",
        kelvin: "Kelvin" 
    };

    let currentUnitOptions = {};
    if (typeOfConverter == 'length') {
        currentUnitOptions = lengthUnits;
    } else if (typeOfConverter == 'weight') {
        currentUnitOptions = weightUnits;
    } else if (typeOfConverter == 'temperature') {
        currentUnitOptions = tempUnits;
    }

    return (
        <form className="form grid gap-4">
            <label htmlFor="unitamount">Enter the <strong>{typeOfConverter}</strong> to convert</label>
            <input type="text" id="unitamount" name="unitamount" ref={unitAmountRef}/>
            <label htmlFor="convertfrom">Unit to Convert from</label>
            <select id="convertfrom" name="convertfrom" ref={convertFromRef}>
                <option value="millimeter">Millimeter</option>
                <option value="centimeter">Centimeter</option>
                <option value="meter">Meter</option>
                <option value="kilometer">Kilometer</option>
                <option value="inch">Inch</option>
                <option value="foot">Foot</option>
                <option value="yard">Yard</option>
                <option value="mile">Mile</option>
            </select>     
            <label htmlFor="convertto">Unit to Convert to</label>
            <select id="convertto" name="convertto" ref={convertToRef}>
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