import './style.css'
import App from './App.jsx'
import { createRoot } from 'react-dom/client'


const yes ="-"
const root = createRoot(document.querySelector('#root'))

root.render(
    <>
    <App clickersCount={3}>
        <h1 className="titre">
            {/* {efsefsefefsfesfsfef} */}
            Hello {yes} React
        </h1>
        
        <h2 className='yes-paragraph'>
            Trop cool react super j'adore de malade
        </h2>
    </App>
    </>
)