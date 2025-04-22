import { useState } from 'react'
import ResultPage from './Components/ResultPage'
import UserInput from './Components/UserInput'


function App() {
  const [formData, setFormData] = useState(null); 
  
  return (
    <>

  
  
   <div>
    {formData ? (
        <ResultPage data={formData} />
      ) : (
        <UserInput onSubmit={setFormData} />
      )}
    </div>
     
    </>
  )
}

export default App
