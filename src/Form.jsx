import { useState, useRef, useEffect } from 'react'

function Form( {typeOfConverter} ) {
    const [convertedValue, setConvertedValue] = useState(null);
    const [conversionInfo, setConversionInfo] = useState(null);
    const [formErrorMessage, setFormErrorMessage] = useState("");
    
    let unitAmountRef = useRef('');
    let fromUnitRef = useRef('');
    let toUnitRef = useRef('');

    // Clear result and error messages when typeOfConverter state changes
    useEffect(() => {
        handleReset();
    }, [typeOfConverter]);

    function validateInput() {
        const rawValue = unitAmountRef.current.value.trim();
        
        // Empty space error
        if (rawValue === "") {
            setFormErrorMessage("");
            return false;
        }

        // Please remove any non number characters error
        const validNumberRegex = /^-?\d*\.?\d*$/;
        if (!validNumberRegex.test(rawValue)) {
            setFormErrorMessage("Please remove non-number characters");
            return false;
        }

        const parsedValue = parseFloat(rawValue);

        // Not a number error
        if (isNaN(parsedValue)) {
            setFormErrorMessage("That is not a number, please enter a number");
            return false;
        }

        // Not a positive number for length and weight converters error
        if (parsedValue <= 0 && typeOfConverter !== "temperature") {
            setFormErrorMessage("Please enter a number greater than 0.");
            return false;
        }

        // Input has been validated
        setFormErrorMessage("");
        return true;
    }

    function handleConversion(event) {
        // Stop the form from submitting
        event.preventDefault();

        // Validation: Prevent form submission unless unitAmount input is valid
        if (!validateInput()) return;

        const unitAmount = parseFloat(unitAmountRef.current.value);
        let fromUnit = fromUnitRef.current.value;
        let toUnit = toUnitRef.current.value;

        let newConvertedValue;

        switch(typeOfConverter) {
            case "length": 
                newConvertedValue = convertLength(unitAmount, fromUnit, toUnit);
                break;
            case "weight":
                newConvertedValue = convertWeight(unitAmount, fromUnit, toUnit);
                break;
            case "temperature":
                newConvertedValue = convertTemperature(unitAmount, fromUnit, toUnit);
                break;
            default: 
                newConvertedValue = convertLength(unitAmount, fromUnit, toUnit);
                break;
        }
        // Round the newConvertedValue to 5 decimal places
        newConvertedValue = parseFloat(newConvertedValue.toFixed(5));

        // Set new converted value to state
        setConvertedValue(newConvertedValue);

        // Display proper temperature symbols
        if (typeOfConverter === "temperature") {
            fromUnit = convertToTempSymbol(fromUnit);
            toUnit = convertToTempSymbol(toUnit);
        }

        // Store input info for later display
        setConversionInfo({unitAmount, fromUnit, toUnit});
    }

    // Convert temperature letter into the correct symbol
    function convertToTempSymbol(tempLetter) {
        if (tempLetter === "c") {
            return "°C";
        } else if (tempLetter === "f") {
            return "°F";
        } else if (tempLetter === "k") {
            return "K";
        }
    }


    function convertLength(value, fromUnit, toUnit) {
        const lengthFactors = {
            mm: 0.001,
            cm: 0.01,
            m: 1,
            km: 1000,
            in: 0.0254,
            ft: 0.3048,
            yd: 0.9144,
            mi: 1609.3445
        };

        const fromFactor = lengthFactors[fromUnit];
        const toFactor = lengthFactors[toUnit];

        const valueInMeters = value * fromFactor;
        const result = valueInMeters / toFactor;

        return result;
    }

    function convertWeight(value, fromUnit, toUnit) {
        const weightFactors = {
            mg: 0.001,
            g: 1,
            kg: 1000,
            oz: 28.3495,
            lb: 453.592
        };

        const fromFactor = weightFactors[fromUnit];
        const toFactor = weightFactors[toUnit];

        const valueInGrams = value * fromFactor;
        const result = valueInGrams / toFactor;

        return result;
    }

    function convertTemperature(value, fromUnit, toUnit) {
        let valueInCelsius;

        // Note: "c" is celsius, "f" is fahrenheit, "k" is kelvin

        // Convert from any unit to Celsius
        switch(fromUnit) {
            case "c": 
                valueInCelsius = value;
                break;
            case "f":
                valueInCelsius = (value - 32) * (5 / 9);
                break;
            case "k":
                valueInCelsius = value - 273.15;
                break;
        }

        // Convert from Celsius to the target unit
        let result;
        switch(toUnit) {
            case "c": 
                result = valueInCelsius;
                break;
            case "f":
                result = (valueInCelsius * 9 / 5) + 32;
                break;
            case "k":
                result = valueInCelsius + 273.15;
                break;
        }

        return result;
    }

    const lengthUnits = {
        mm: "Millimeter",
        cm: "Centimeter",
        m: "Meter",
        km: "Kilometer",
        in: "Inch",
        ft: "Foot",
        yd: "Yard",
        mi: "Mile" 
    };

    const weightUnits = {
        mg: "Milligram",
        g: "Gram",
        kg: "Kilogram",
        oz: "Ounce",
        lb: "Pound" 
    };

    const tempUnits = {
        c: "Celsius",
        f: "Fahrenheit",
        k: "Kelvin" 
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

    function handleReset() {
        setConvertedValue(null);
        setConversionInfo(null);
        setFormErrorMessage("");
        // clear input field
        if (unitAmountRef.current) {
            unitAmountRef.current.value = "";
        }
    }

    // if form hasn't been submitted and there is no convertedValue, return form below
    if (convertedValue == null) {
        return (
            <form className="form grid gap-4" onSubmit={handleConversion}>
                <label htmlFor="unitamount" className="font-medium">
                    Enter the <span className="text-[#dd64ff]"><strong>{typeOfConverter}</strong></span> to convert
                </label>
                <input 
                    type="text"
                    id="unitamount"
                    name="unitamount"
                    ref={unitAmountRef}
                    inputMode="decimal"
                    onInput={validateInput}
                    className={`rounded-md border px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrorMessage !== "" ? "border-red-500" : "border-white"
                    }`}
                />
                { formErrorMessage !== "" && <p className="text-red-600 text-sm">{formErrorMessage}</p> }                
                <label htmlFor="fromunit" className="font-medium">Unit to Convert from</label>
                <select 
                    id="fromunit" 
                    name="fromunit"
                    ref={fromUnitRef}
                    className="rounded-md border border-white px-4 py-2 bg-[#242424] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {renderUnitOptions()}
                </select>
                <label htmlFor="tounit" className="font-medium">Unit to Convert to</label>
                <select
                    id="tounit"
                    name="tounit"
                    ref={toUnitRef}
                    className="rounded-md border border-white px-4 py-2 bg-[#242424] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {renderUnitOptions()}
                </select>
                <button 
                    type="submit"
                    disabled={formErrorMessage !== ""}
                    className={`mt-4 rounded-md border px-4 py-3 text-sm font-semibold transition ${
                    formErrorMessage !== ""
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed border-red-600"
                        : "bg-[#1a1a1a] text-white hover:border-blue-400 border-white"
                    }`}
                >
                    Convert
                </button>
            </form>
        );
    } else {
        // form has been submitted and there is a convertedValue, return result and a reset button
        return <>
                <h3>Result of your calculation</h3>
                <br/>
                <p className="text-[#dd64ff]"><strong>{conversionInfo.unitAmount} {conversionInfo.fromUnit} = {convertedValue} {conversionInfo.toUnit}</strong></p>
                <br/>
                <button
                    type="reset" 
                    onClick={handleReset}
                    className="mt-4 rounded-md border px-6 py-3 text-sm font-semibold transition bg-[#1a1a1a] text-white hover:border-blue-400 border-white"
                >
                    Reset
                </button>
               </> 
    }
}

export default Form;