import { useState, useEffect } from 'react';

const Clients = () => {
    const [clients, setclients] = useState([]);

    const getClients = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: JSON.parse(localStorage.getItem('authToken')),
            },
        };

        const response = await fetch(`${process.env.REACT_APP_API_URL}/getclients`, requestOptions);
        const result = await response.json();

        if (result.clients) {
            console.log(result.clients);
            setclients(result.clients);
        }
    };

    useEffect(() => {
        getClients();
    }, []);

    return (
        <div>
            <ul>
                {clients.map((client) => {
                    return <li key={client.id}>{client.name}</li>;
                })}
            </ul>
        </div>
    );
};

export default Clients;
