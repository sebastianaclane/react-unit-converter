import { useState } from 'react'
import Menu from './Menu';
import Form from './Form';

function App() {
  const [typeOfConverter, setTypeOfConverter] = useState("length");
  
  return (
    <>
      <h1>React Unit Converter</h1>
      <Menu setTypeOfConverter={setTypeOfConverter} />
      <Form 
        typeOfConverter={typeOfConverter}
      />
    </>
  )
}

export default App;
