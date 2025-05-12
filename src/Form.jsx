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

    // Select the current unit set based on the typeOfConverter prop
    function selectCurrentUnitSet() {
        switch(typeOfConverter) {
            case "length": return lengthUnits;
            case "weight": return weightUnits;
            case "temperature": return tempUnits;
            default: return lengthUnits;
        }
    }

    function renderUnitOptions() {
        const units = selectCurrentUnitSet();
        return Object.entries(units).map(([value, label]) => (
            <option key={value} value={value}>
                {label}
            </option>
        ));
    }

    return (
        <form className="form grid gap-4">
            <label htmlFor="unitamount">Enter the <strong>{typeOfConverter}</strong> to convert</label>
            <input type="text" id="unitamount" name="unitamount" ref={unitAmountRef}/>
            <label htmlFor="convertfrom">Unit to Convert from</label>
            <select id="convertfrom" name="convertfrom" ref={convertFromRef}>
                {renderUnitOptions()}
            </select>
            <label htmlFor="convertto">Unit to Convert to</label>
            <select id="convertto" name="convertto" ref={convertToRef}>
                {renderUnitOptions()}
            </select>
            <button type="submit">Convert</button>
        </form>
    );
}

export default Form;