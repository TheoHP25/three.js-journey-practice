import { useRef,useState,useEffect } from "react"
function Clicker({color,increment, keyName})
{
    const [count, setCount] = useState(parseInt(localStorage.getItem(keyName) ??0))
    const buttonReference = useRef()
    useEffect(()=> 
        {
            buttonReference.current.style.backgroundColor ='papayawhip'
            buttonReference.current.style.color='black'

            return ()=>
            {
                localStorage.removeItem(keyName,count)
            }
        },[])

    useEffect(()=>
    {
        localStorage.setItem(keyName,count)
    }, [ count ])

    const clicBouton = () =>
    {
        setCount(count+1)
        increment()
    }

    return <div style={{color:color}}>
    <h1>Clic clic: { count }</h1>
    <button ref={ buttonReference } onClick={clicBouton}>Clic</button>
    </div>
}

export default Clicker