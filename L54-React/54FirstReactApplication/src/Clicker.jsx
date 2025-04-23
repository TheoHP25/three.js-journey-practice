import { useRef,useState,useEffect } from "react"
function Clicker({color,increment, keyName})
{
    const [count, setCount] = useState(parseInt(localStorage.getItem(keyName) ??0))
    const buttonReference = useRef()
    useEffect(()=> 
        {
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

    return <div class="rounded-2xl border-2 p-2 bg-blue-950"  style={{color:color}}>
        <button ref={ buttonReference } onClick={clicBouton} class="rounded-md border-2 border-grey-400 bg-blue-400 hover:bg-blue-600 p-1 px-2">Clic</button>
        <h1>Clic clic: { count }</h1>
    </div>
}

export default Clicker