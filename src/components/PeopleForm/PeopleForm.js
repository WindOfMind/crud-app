import { useEffect, useState } from 'react';
import personApiClient from '../../common/personApiClient';
import PrefixSearchBar from '../PrefixSearchBar/PrefixSearchBar';
import InputField from '../InputField/InputField';
import PeopleList from '../PeopleList/PeopleList';

function PeopleForm() {

    const {fetchPeople, updatePerson, deletePerson, createPerson} = personApiClient();

    const [people, setPeople] = useState([]);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [selectedPersonId, setSelectedPersonId] = useState();
    const [surnamePrefix, setSurnamePrefix] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const fetchedPeople = await fetchPeople();
            setPeople(fetchedPeople);
        }
        fetchData();
    }, []);

    const setSelectedPerson = (id) =>
    {
        if (id) {
            setSelectedPersonId(id);
            const { name, surname } = people.find(p => p.id === id);
            setName(name);
            setSurname(surname);
        }
    }

    const onCreate = async () => 
    {
        const newPerson = await createPerson({name, surname});
        setPeople([...people, newPerson]);

        setName("");
        setSurname("");
    };

    const onDelete = async () => 
    {
        if (selectedPersonId)
        {
            setPeople(people.filter(p => p.id !== selectedPersonId));
            await deletePerson(selectedPersonId);
            setName("");
            setSurname("");
        }
    };

    const onUpdate = async () =>
    {
        if (selectedPersonId && name && surname)
        {
            const index = people.findIndex(p => p.id === selectedPersonId);
            const updated = {id: selectedPersonId, name, surname};
            people.splice(index, 1, updated);
            setPeople([...people]);
            await updatePerson(updated);
        }
    };

    const onSearch = (prefix) =>
    {
        setSurnamePrefix(prefix);
        setName("");
        setSurname("");
    }

    const filterPeople = (surnamePrefix) => 
        people.filter((person) => !surnamePrefix || person.surname.toLowerCase().startsWith(surnamePrefix));
 
    return (
        <div className="container mt-4" style={{ "maxWidth": "800px" }}>
            <PrefixSearchBar
                prefix={surnamePrefix}
                setPrefix={onSearch}
                width="50%"
            />

            <div className="field">
                <div className="columns">
                    <div className="column">
                        <PeopleList
                            people={filterPeople(surnamePrefix)}
                            onSelect={setSelectedPerson}
                        />
                    </div>

                    <div className="column">
                        <InputField
                            value={name}
                            onChange={setName}
                            labelText={'Name:'}
                        />
                        <InputField
                            value={surname}
                            onChange={setSurname}
                            labelText={'Surname:'}
                        />
                    </div>
                </div>
            </div>
            
            <div className="field is-grouped">
                <p className="control">
                    <button className="button is-light" onClick={onCreate}>
                        Create
                    </button>
                </p>
                <p className="control">
                    <button className="button is-light" onClick={onUpdate}>
                        Update
                    </button>
                </p>
                <p className="control">
                    <button className="button is-light" onClick={onDelete}>
                        Delete
                    </button>
                </p>
            </div>

        </div>
    ); 
}

export default PeopleForm;