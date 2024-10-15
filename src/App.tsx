import React from 'react';
import './App.css';
import UserGrid from './components/UserGrid';

function App() {
    return (
        <div className="App">
            <div className="App-test">
                <h1>Liste des 10 utilisateurs</h1>
                <UserGrid />
            </div>
        </div>
    );
}

export default App;
