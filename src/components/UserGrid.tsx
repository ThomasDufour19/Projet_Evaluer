import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard';

interface User {
    name: {
        title: string;
        first: string;
        last: string;
    };
    email: string;
    picture: {
        medium: string;
    };
    location: {
        street: {
            number: number;
            name: string;
        };
        city: string;
        country: string;
    };
    phone: string;
    cell: string;
}

const UserGrid: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get('https://randomuser.me/api/?results=10')
            .then((response) => {
                setUsers(response.data.results);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des utilisateurs:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Chargement...</p>;
    }

    return (
        <div className="user-grid">
            {users.map((user, index) => (
                <UserCard key={index} user={user} />
            ))}
        </div>
    );
};

export default UserGrid;
