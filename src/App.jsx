import { useState } from 'react'
import Menu from './Menu';
import Form from './Form';

function App() {
  const [typeOfConverter, setTypeOfConverter] = useState("length");
  const [convertedValue, setConvertedValue] = useState(null);
  const [conversionInfo, setConversionInfo] = useState(null);
  
  return (
    <>
      <h1>React Unit Converter</h1>
      <Menu setTypeOfConverter={setTypeOfConverter} />
      <Form 
        typeOfConverter={typeOfConverter}
        convertedValue={convertedValue}
        setConvertedValue={setConvertedValue}
        conversionInfo={conversionInfo}
        setConversionInfo={setConversionInfo}
      />
    </>
  )
}

export default App;
