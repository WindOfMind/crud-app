import { useEffect, useState } from 'react';
import PrefixSearchBar from '../PrefixSearchBar/PrefixSearchBar';
import InputField from '../InputField/InputField';
import PeopleList from '../PeopleList/PeopleList';
import usePeople from '../../hooks/usePeople';

function PeopleForm() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [selectedPersonId, setSelectedPersonId] = useState('');
    const [surnamePrefix, setSurnamePrefix] = useState('');

    const { people, createPerson, deletePerson, updatePerson } = usePeople();

    const resetSelected = () => {
        setName('');
        setSurname('');
        setSelectedPersonId('');
    };

    useEffect(() => {
        if (selectedPersonId)
        {
            const person = people.find(p => p.id === selectedPersonId);
            if (person)
            {
                setName(person.name);
                setSurname(person.surname);
            }
        }
    }, [selectedPersonId, people]);

    useEffect(() => resetSelected(), [surnamePrefix, people]);

    const onCreate = async () => 
    {
        createPerson(name, surname);
    };

    const onDelete = async () => 
    {
        if (selectedPersonId)
        {
            deletePerson(selectedPersonId);
        }
    };

    const onUpdate = async () =>
    {
        if (selectedPersonId && name && surname)
        {
            updatePerson({id: selectedPersonId, name, surname});
        }
    };

    const filterPeople = (surnamePrefix) => 
        people.filter((person) => !surnamePrefix || person.surname.toLowerCase().startsWith(surnamePrefix.toLowerCase()));
 
    return (
        <div className="container mt-4" style={{ "maxWidth": "800px" }}>
            <PrefixSearchBar
                prefix={surnamePrefix}
                setPrefix={setSurnamePrefix}
                width="50%"
            />

            <div className="field">
                <div className="columns">
                    <div className="column">
                        <PeopleList
                            people={filterPeople(surnamePrefix)}
                            onSelect={setSelectedPersonId}
                        />
                    </div>

                    <div className="column">
                        <InputField
                            id="name"
                            value={name}
                            onChange={setName}
                            labelText={'Name:'}
                        />
                        <InputField
                            id="surname"
                            value={surname}
                            onChange={setSurname}
                            labelText={'Surname:'}
                        />
                    </div>
                </div>
            </div>
            
            <div className="field is-grouped">
                <p className="control">
                    <button className="button is-light" onClick={onCreate} disabled={!name || !surname}>
                        Create
                    </button>
                </p>
                <p className="control">
                    <button className="button is-light" onClick={onUpdate} disabled={!selectedPersonId}>
                        Update
                    </button>
                </p>
                <p className="control">
                    <button className="button is-light" onClick={onDelete} disabled={!selectedPersonId}>
                        Delete
                    </button>
                </p>
            </div>
        </div>
    ); 
}

export default PeopleForm;