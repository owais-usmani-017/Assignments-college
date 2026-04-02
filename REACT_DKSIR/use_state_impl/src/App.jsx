import { useState , useEffect} from 'react'

function App() {
  const [count, setCount] = useState(0)
  const increasecount = () => {    
    setCount(count + 1)
    console.log(count)
  }

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <>
    <button onClick={increasecount} >Increase</button>
    <p>Count: {count}</p>
    
    </>
  )
}

export default App
