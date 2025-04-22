import { useMemo, useState } from 'react'
import Clicker from './Clicker.jsx'
import People from './People.jsx'

function App({clickersCount,children})
{
    const [ hasClicker, setHasClicker] = useState(true)
    const [count, setCount]= useState(0)

    const cliqueurBouton = () =>
        {
            setHasClicker(!hasClicker)
        }

    const increment = () =>
    {
        setCount(count+1)
    }
    
    // const colors =[]
    
    // for (let i = 0; i< clickersCount; i++)
    //     colors.push(`hsl(${ Math.random() * 360 }deg, 100%, 75%)`)

    const colors =useMemo(()=>
    {
        const colors =[]
    
        for (let i = 0; i< clickersCount; i++)
            colors.push(`hsl(${ Math.random() * 360 }deg, 100%, 75%)`)
        return colors
    }, [clickersCount])
    return <>
        
    {children}

    <h1>Total count:{count}</h1>
    
    <button onClick={cliqueurBouton}>{hasClicker ? "Cacher" : "Montrer"}</button>
    { hasClicker && <>
    {[...Array(clickersCount)].map((value, index)=>{
        return <Clicker 
        key={ index}
        increment={increment} 
        keyName={`count${index}`} 
        color={colors[index]}
        />
    })}
    {/*<Clicker increment={increment} keyName="count A" />
     <Clicker increment={increment} keyName="count B" />
    <Clicker increment={increment} keyName="count C" /> */}</>}
    
        <People></People>
    </>

    

}

export default App