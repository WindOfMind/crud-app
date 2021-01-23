const personApiClient = (baseUrl, path) => {
    const uuid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          let r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8)
          return v.toString(16)
        })
    };
    
    const mockData = [{
            id: uuid(),
            name: "Bill",
            surname: "Gates"
        },{
            id: uuid(),
            name: "Elon",
            surname: "Musk"
        },{
            id: uuid(),
            name: "Steve",
            surname: "Jobs"
        }
    ];
    
    const fetchPeople = () => {
        return Promise.resolve(mockData);
    };
    
    const updatePerson = (person) => {
        
        if (person) {
            const index = mockData.findIndex(p => p.id === person.id);
            if (index >= 0) {
                mockData.splice(index, 1, person);
            }
        }
    
        return Promise.resolve(person);
    };
    
    const deletePerson = (personId) => {
        if (personId) {
            const index = mockData.findIndex(p => p.id === personId);
            if (index >= 0) {
                return Promise.resolve(mockData.splice(index, 1));
            }
        }

        return Promise.resolve();
    };
    
    const createPerson = (person) => {
        const newPerson = {
            ...person,
            id: uuid()
        };
        mockData.push(newPerson);
    
        return Promise.resolve(newPerson);
    };

    return {
        fetchPeople,
        updatePerson,
        deletePerson,
        createPerson
    }
};

export default personApiClient;