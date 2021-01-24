import { render, screen, act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PeopleForm from "./PeopleForm";

jest.mock('../../common/personApiClient', () => {
    const mockData = [{
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
        }
    ];  

    const fetchPeople = async () => Promise.resolve([...mockData]);
    const updatePerson = async (person) => Promise.resolve(person);
    const deletePerson = async (person) => Promise.resolve(person);
    const createPerson = async (person) => Promise.resolve({id: '4a', ...person});

    return () => {
        return {
            fetchPeople,
            updatePerson,
            deletePerson,
            createPerson
        }
    };     
});

afterEach(cleanup);

describe('PeopleForm', () => {
    test('renders a list with people, and nothing is selected', async () => {
        render(<PeopleForm />);

        const nameInput = screen.getByLabelText("Name:", { selector: 'input' });
        const surnameInput = screen.getByLabelText("Surname:", { selector: 'input' });
        const prefixInput = screen.getByLabelText("Filter prefix:", { selector: 'input' });

        const createButton = screen.getByText('Create');
        const deleteButton = screen.getByText('Delete');
        const updateButton = screen.getByText('Update');

        const list = screen.getByRole('listbox');
        const options = await screen.findAllByRole('option');

        expect(list).toBeInTheDocument();
        options.forEach(o => expect(o).toBeInTheDocument());
        expect(options.length).toBe(3);

        expect(nameInput.value).toBe('');
        expect(surnameInput.value).toBe('');
        expect(prefixInput.value).toBe('');

        expect(createButton).toHaveAttribute('disabled');
        expect(deleteButton).toHaveAttribute('disabled');
        expect(updateButton).toHaveAttribute('disabled');
    });

    test('user types name and surname and creates a new person', async () => {    
        render(<PeopleForm />);

        const nameInput = screen.getByLabelText("Name:", { selector: 'input' });
        const surnameInput = screen.getByLabelText("Surname:", { selector: 'input' });
        const createButton = screen.getByText('Create');

        await act(async () => {
            await userEvent.type(nameInput, 'J', {delay: 10});          
            await userEvent.type(surnameInput, 'S', {delay: 10});
        });

        await act(async () => {
            await userEvent.click(createButton);
        });

        const option = await screen.findByText('S, J');

        expect(option).toBeInTheDocument();
        expect(nameInput.value).toBe('');
        expect(surnameInput.value).toBe('');
    });

    test('user selects a person', async () => {     
        render(<PeopleForm />);

        const list = screen.getByRole('listbox');
        const option = await screen.findByText('Gates, Bill');

        const nameInput = screen.getByLabelText("Name:", { selector: 'input' });
        const surnameInput = screen.getByLabelText("Surname:", { selector: 'input' });

        await act(async () => {
            await userEvent.selectOptions(list, option);
        });

        expect(nameInput.value).toBe('Bill');
        expect(surnameInput.value).toBe('Gates');
    });

    test('user selects a person and delete', async () => {     
        render(<PeopleForm />);

        const list = screen.getByRole('listbox');
        const option = await screen.findByText('Gates, Bill');
        const deleteButton = screen.getByText('Delete');

        await act(async () => {
            await userEvent.selectOptions(list, option);
            await userEvent.click(deleteButton);
        });

        const deleted = screen.queryByText('Gates, Bill');
        expect(deleted).toBeNull() 
    });

    test('user selects a person and updates', async () => {     
        render(<PeopleForm />);

        const list = screen.getByRole('listbox');
        const option = await screen.findByText('Gates, Bill');
        const updateButton = screen.getByText('Update');
        const nameInput = screen.getByLabelText("Name:", { selector: 'input' });
        const surnameInput = screen.getByLabelText("Surname:", { selector: 'input' });

        await act(async () => {
            await userEvent.selectOptions(list, option);
        });

        await act(async () => {
            await userEvent.type(nameInput, 'T');
        });

        await act(async () => {
            await userEvent.type(surnameInput, 'J');
        });

        await act(async () => {
            await userEvent.click(updateButton);
        });

        const updated = await screen.findByText('GatesJ, BillT');
        expect(updated).toBeInTheDocument();
    });

    test('user types in the prefix bar', async () => {     
        render(<PeopleForm />);

        const prefixInput = screen.getByLabelText("Filter prefix:", { selector: 'input' });
        const nameInput = screen.getByLabelText("Name:", { selector: 'input' });
        const surnameInput = screen.getByLabelText("Surname:", { selector: 'input' });

        await act(async () => {
            await userEvent.type(prefixInput, 'a');
        });

        const options = screen.queryAllByRole('option');

        expect(options.length).toBe(0);
        expect(nameInput.value).toBe('');
        expect(surnameInput.value).toBe('');
    });
});