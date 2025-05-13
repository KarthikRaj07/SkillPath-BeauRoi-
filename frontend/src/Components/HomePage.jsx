import React, { useState } from 'react';
import UserInput from './UserInput';
import ResultPage from './ResultPage';

export const HomePage = () => {
    const [result, setResult] = useState(null);

    const handleUserInputSubmit = (data) => {
        setResult(data);
    };

    return (
        <div>
            {!result ? (
                <UserInput onSubmit={handleUserInputSubmit} />
            ) : (
                <ResultPage data={result} />
            )}
        </div>
    );
};
