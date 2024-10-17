import React, { useState } from 'react';

interface UserProps {
    user: {
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
    };
}

const UserCard: React.FC<UserProps> = ({ user }) => {
    const [showMore, setShowMore] = useState(false);

    const toggleExtraInfo = () => {
        setShowMore(!showMore);
    };

    return (
        <div className="user-card">
            <img src={user.picture.medium} alt={`Photo de ${user.name.first}`} />
            <h3>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h3>
            <p>Email: {user.email}</p>
            <button onClick={toggleExtraInfo}>{showMore ? '-' : '+'}</button>

            {showMore && (
                <div className="extra-info">
                    <p>Adresse:
                        {user.location.street.number}
                        {user.location.street.name},
                        {user.location.city},
                        {user.location.country}
                    </p>
                    <p>Téléphone: {user.phone}</p>
                    <p>Cellulaire: {user.cell}</p>
                </div>
            )}
        </div>
    );
};

export default UserCard;
