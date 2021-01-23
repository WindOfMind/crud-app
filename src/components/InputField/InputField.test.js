import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputField from './InputField';

describe('InputField', () => {
  test('renders InputField with value and label', () => {
    render(<InputField 
        value='test value'
        labelText={'Label:'}
      />);
  
    const label = screen.getByText('Label:');
    const input = screen.getByDisplayValue('test value');
    
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test('calls the onChange callback handler', async () => {
    const onChange = jest.fn();

    render(<InputField 
        value=''
        labelText={'Label:'}
        onChange={onChange}
      />);
  
    const input = screen.getByRole('textbox'); 
    await userEvent.type(input, 'JavaScript');
 
    expect(onChange).toHaveBeenCalledTimes('JavaScript'.length);
  });
});

