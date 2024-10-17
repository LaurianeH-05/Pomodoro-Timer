import React, { useState } from 'react';

const Settings = () => {
    const [workTime, setWorkTime] = useState(25); // Default value
    const [breakTime, setBreakTime] = useState(5); // Default value
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate input values
        if (workTime < 0 || breakTime < 0) {
            setError('Work time and break time must be non-negative.');
            return;
        }

        setError(''); // Clear any previous errors

        // Send valid data to the backend
        const response = await fetch('http://localhost:5000/api/timer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ workTime, breakTime }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.message);
        } else {
            const errorData = await response.json();
            setError(errorData.error);
        }
    };

    return (
        <div>
            <h2>Settings</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Work Time (minutes):
                        <input
                            type="number"
                            value={workTime}
                            onChange={(e) => setWorkTime(Number(e.target.value))}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Break Time (minutes):
                        <input
                            type="number"
                            value={breakTime}
                            onChange={(e) => setBreakTime(Number(e.target.value))}
                        />
                    </label>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Save Settings</button>
            </form>
        </div>
    );
};

export default Settings;
