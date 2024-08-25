import React, { useState } from 'react';
import './App.css';

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(input);
            const res = await fetch('https://your-backend-url.vercel.app/bfhl', { // Update this line
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: parsedInput.data })
            });
            if (!res.ok) {
                throw new Error(`Server error: ${res.statusText}`);
            }
            const data = await res.json();
            console.log('Response data:', data);
            setResponse(data);
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred: ' + error.message);
        }
    };

    const renderFilteredResponse = () => {
        if (!response) return null;
        const { numbers, alphabets, highest_lowercase_alphabet } = response;
        let result = [];
        if (selectedFilters.includes('Numbers')) result.push(`Numbers: ${numbers.join(',')}`);
        if (selectedFilters.includes('Alphabets')) result.push(`Alphabets: ${alphabets.join(',')}`);
        if (selectedFilters.includes('Highest lowercase alphabet')) result.push(`Highest Lowercase Alphabet: ${highest_lowercase_alphabet.join(',')}`);
        return result.join(' | ');
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>BFHL Project</h1>
                <p>By Tirumanisetti Pavan from VIT</p>
            </header>
            <main>
                <div className="input-section">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder='Enter JSON e.g. { "data": ["M", "1", "334", "4", "B", "Z", "a"] }'
                    />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                {response && (
                    <div className="response-section">
                        <label className="filter-label">Multi Filter</label>
                        <select
                            multiple
                            className="filter-select"
                            onChange={e => setSelectedFilters([...e.target.selectedOptions].map(option => option.value))}
                        >
                            <option value="Numbers">Numbers</option>
                            <option value="Alphabets">Alphabets</option>
                            <option value="Highest lowercase alphabet">Highest Lowercase Alphabet</option>
                        </select>
                        <div className="filtered-response">
                            Filtered Response: {renderFilteredResponse()}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
