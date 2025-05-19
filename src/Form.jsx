import { useState, useRef } from 'react'

function Form( {typeOfConverter, convertedValue, setConvertedValue, conversionInfo, setConversionInfo} ) {
    let unitAmountRef = useRef('');
    let fromUnitRef = useRef('');
    let toUnitRef = useRef('');

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

    function handleConversion(event) {
        // 1. Stop the form from submitting
        event.preventDefault();
        console.log("form submitted!");
        console.log(unitAmountRef.current.value);
        console.log(fromUnitRef.current.value);
        console.log(toUnitRef.current.value);
        // 2. Store a test value for convertedValue into state
        setConvertedValue(60);
    }
    
    function handleReset() {
        setConvertedValue(null);
    }

    // if form hasn't been submitted and there is no convertedValue, return form below
    if (convertedValue == null) {
        return (
            <form className="form grid gap-4" onSubmit={handleConversion}>
                <label htmlFor="unitamount">Enter the <strong>{typeOfConverter}</strong> to convert</label>
                <input type="text" id="unitamount" name="unitamount" ref={unitAmountRef}/>
                <label htmlFor="fromunit">Unit to Convert from</label>
                <select id="fromunit" name="fromunit" ref={fromUnitRef}>
                    {renderUnitOptions()}
                </select>
                <label htmlFor="tounit">Unit to Convert to</label>
                <select id="tounit" name="tounit" ref={toUnitRef}>
                    {renderUnitOptions()}
                </select>
                <button type="submit">Convert</button>
            </form>
        );
    } else {
        // form has been submitted and there is a convertedValue, return result and a reset button
        return <>
                <p>Result of your calculation</p>
                <p>{convertedValue}</p>
                <button type="reset" onClick={handleReset}>Reset</button>
               </> 
    }
}

export default Form;