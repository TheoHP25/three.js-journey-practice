import { useMemo, useState } from 'react';
import Clicker from './Clicker.jsx';
import People from './People.jsx';

function App({ clickersCount, children }) {
    const [hasClicker, setHasClicker] = useState(true);
    const [count, setCount] = useState(0);

    const cliqueurBouton = () => {
        setHasClicker(!hasClicker);
    };

    const increment = () => {
        setCount(count + 1);
    };

    const colors = useMemo(() => {
        const colors = [];
        for (let i = 0; i < clickersCount; i++) {
            colors.push(`hsl(${Math.random() * 360}deg, 100%, 75%)`);
        }
        return colors;
    }, [clickersCount]);

    return (
        <div className="relative h-screen w-screen overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
            <div className="relative  text-3xl font-medium flex flex-col items-center py-6 p-7 h-full">
                {children}
                <h1 className="py-6">Total de clics: {count}</h1>

                <button
                    onClick={cliqueurBouton}
                    className="bg-blue-400 hover:bg-blue-600 p-2 rounded-2xl border-2"
                >
                    {hasClicker ? 'Cacher' : 'Montrer'}
                </button>
                {hasClicker && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                        {[...Array(clickersCount)].map((_, index) => {
                            return (
                                <Clicker
                                    key={index}
                                    increment={increment}
                                    keyName={`count${index}`}
                                    color={colors[index]}
                                />
                            );
                        })}
                    </div>
                )}
                <People />
            </div>
        </div>
    );
}

export default App;
