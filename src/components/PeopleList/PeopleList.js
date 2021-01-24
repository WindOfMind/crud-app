const PeopleList = ({people, onSelect}) => {
    return (
        <div className="select is-multiple" style={{ "width": "100%" }}>
            <select 
                className="px-0 py-0" 
                size="5" 
                style={{ "height": "200px", "width": "100%" }}
                onClick={(e) => onSelect(e.target.value)}
                onChange={(e) => onSelect(e.target.value)}
            >
                {people
                    .map((person) => (<option className="px-2 py-2" value={person.id} key={person.id}>{person.surname}, {person.name}</option>)) 
                }
            </select>
        </div>
    );
};

export default PeopleList;