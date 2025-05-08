import { useState } from 'react'
import Menu from './Menu';
import Form from './Form';

function App() {
  const [typeOfConverter, setTypeOfConverter] = useState("length");

  const changeTypeOfConverter = selectedConverter => {
    setTypeOfConverter(selectedConverter);
  }
  
  return (
    <>
      <h1>React Unit Converter</h1>
      <Menu changeTypeOfConverter={changeTypeOfConverter} />
      <Form />
    </>
  )
}

export default App;
