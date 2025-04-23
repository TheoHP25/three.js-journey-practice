import './style.css'
import App from './App.jsx'
import { createRoot } from 'react-dom/client'


const yes ="-"
const root = createRoot(document.querySelector('#root'))

root.render(
    <div class="rounded-2xl border-3">
    <App clickersCount={8}>
        <div class="rounded-2xl border-2 p-2 bg-blue-100 ">
            <h1 class="titre">
                {/* {efsefsefefsfesfsfef} */}
                Hello {yes} React
            </h1>

            <h2 class='yes-paragraph'>
                Trop cool react super j'adore
            </h2>
            </div>
    </App>
    </div>
)