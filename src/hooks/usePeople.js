import { useEffect, useState } from 'react';
import personApiClient from '../common/personApiClient';

const usePeople = (baseUrl, path) => {
    const { updatePerson, deletePerson, createPerson } = personApiClient(baseUrl, path);

    const [people, setPeople] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { fetchPeople } = personApiClient(baseUrl, path);
            const fetchedPeople = await fetchPeople();
            setPeople(fetchedPeople);
        }
        fetchData();
    }, [baseUrl, path]);

    const onCreatePerson = async (name, surname) => 
    {
        const newPerson = await createPerson({name, surname});
        setPeople([...people, newPerson]);
    };

    const onDeletePerson = async (personId) => 
    {
        if (personId)
        {
            setPeople(people.filter(p => p.id !== personId));
            await deletePerson(personId);
        }
    };

    const onUpdatePerson = async (person) =>
    {
        if (person)
        {
            const index = people.findIndex(p => p.id === person.id);
            people.splice(index, 1, person);
            setPeople([...people]);
            await updatePerson(person);
        }
    };

    return {
        people,
        createPerson: onCreatePerson,
        deletePerson: onDeletePerson,
        updatePerson: onUpdatePerson
    };
};

export default usePeople;