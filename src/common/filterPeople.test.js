import filterPeople from "./filterPeople";

describe('filterPeople', () => {
    test('filters (case insensitive) people array according provided prefix', () => {
        const people = [{
                id: '1a',
                name: "Bill",
                surname: "Gates"
            },{
                id: '2a',
                name: "Elon",
                surname: "Musk"
            },{
                id: '3a',
                name: "Steve",
                surname: "Jobs"
            },
            {
                id: '4a',
                name: "Steve",
                surname: "jobs"
            }
        ];  

        const prefix ='j';

        const filtered = filterPeople(prefix, people);

        expect(filtered).toHaveLength(2);
        expect(filtered[0].id).toBe('3a');
        expect(filtered[1].id).toBe('4a');
    });
});