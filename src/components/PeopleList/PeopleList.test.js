import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PeopleList from './PeopleList';

describe('PeopleList', () => {
    test('renders PeopleList', () => {
        const people = [
            {
                id: 1,
                name: 'name1',
                surname: 'surname1'
            },
            {
                id: 2,
                name: 'name2',
                surname: 'surname2'
            },
            {
                id: 3,
                name: 'name3',
                surname: 'surname3'
            }
        ];
      
        render(<PeopleList
            people={people}
        />);
    
        const list = screen.getByRole('listbox');
        const options = screen.getAllByRole('option');

        expect(list).toBeInTheDocument();
        options.forEach(o => expect(o).toBeInTheDocument());
        expect(options.length).toBe(3);
    });

    test('renders options with surname, name', () => {
        const people = [
            {
                id: 1,
                name: 'name1',
                surname: 'surname1'
            }
        ];
      
        render(<PeopleList
            people={people}
        />);
    
        const option = screen.getByText('surname1, name1');

        expect(option).toBeInTheDocument();
    });

    test('calls the onSelect callback handler', () => {
        const onSelect = jest.fn();

        const people = [
            {
                id: 1,
                name: 'name1',
                surname: 'surname1'
            },
            {
                id: 2,
                name: 'name2',
                surname: 'surname2'
            },
            {
                id: 3,
                name: 'name3',
                surname: 'surname3'
            }
        ];
      
        render(<PeopleList
            people={people}
            onSelect={onSelect}
        />);
        const list = screen.getByRole('listbox');
        userEvent.selectOptions(list, '1');

        expect(onSelect).toHaveBeenCalledTimes(2);
    });
  });