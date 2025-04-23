import { useState } from "react"
import { useEffect } from "react"

function People()
{

    const [people, setPeople]= useState([])

    const getPeople = async () =>
    {
        const response= await fetch('https://jsonplaceholder.typicode.com/users')
        const result = await response.json()

        setPeople(result)
    }

    useEffect(()=>
    {
        getPeople()
    },[])

    return <div class="py-6">
        <h2>Des gens fictifs qui viennent d'une API:</h2>
        <ul class="list-inside list-disc py-6 grid grid-flow-col grid-rows-4 gap-4">
            { people.map((person)=>
            {
                return <li class="py-2" key={person.id}>{person.name}</li>
            })}
        </ul>
    </div>
}

export default People