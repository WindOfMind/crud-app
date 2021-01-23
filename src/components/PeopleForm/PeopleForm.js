import { useState } from 'react';
import PrefixSearchBar from '../PrefixSearchBar/PrefixSearchBar';
import InputField from '../InputField/InputField';
import PeopleList from '../PeopleList/PeopleList';
import usePeople from '../../hooks/usePeople';

function PeopleForm() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [selectedPersonId, setSelectedPersonId] = useState();
    const [surnamePrefix, setSurnamePrefix] = useState('');

    const { people, createPerson, deletePerson, updatePerson } = usePeople();

    const resetSelected = () => {
        setName("");
        setSurname("");
        setSelectedPersonId();
    };

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
        createPerson(name, surname);
        resetSelected();
    };

    const onDelete = async () => 
    {
        if (selectedPersonId)
        {
            deletePerson(selectedPersonId);
            resetSelected();
        }
    };

    const onUpdate = async () =>
    {
        if (selectedPersonId && name && surname)
        {
            updatePerson({id: selectedPersonId, name, surname});
        }
    };

    const onSearch = (prefix) =>
    {
        setSurnamePrefix(prefix);
        resetSelected();
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