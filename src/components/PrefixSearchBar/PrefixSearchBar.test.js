import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PrefixSearchBar from './PrefixSearchBar';

describe('PrefixSearchBar', () => {
    test('renders PrefixSearchBar with value and label', () => {
        render(<PrefixSearchBar 
            prefix='test value'
        />);
    
        const label = screen.getByText('Filter prefix:');
        const input = screen.getByDisplayValue('test value');
      
        expect(label).toBeInTheDocument();
        expect(input).toBeInTheDocument();
    });
  
    test('calls the setPrefix callback handler', async () => {
        const onChange = jest.fn();
  
        render(<PrefixSearchBar
            prefix=''
            setPrefix={onChange}
        />);
    
        const input = screen.getByRole('textbox'); 
        userEvent.type(input, 'JavaScript');
   
        expect(onChange).toHaveBeenCalledTimes('JavaScript'.length);
    });
  });