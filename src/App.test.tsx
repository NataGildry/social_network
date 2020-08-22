import React from 'react';
import { render } from '@testing-library/react';
import MainApp from './App';
import App from './App';
import ReactDOM from 'react-dom';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

it ('render without crashing', () => {
const div = document.createElement('div');
ReactDOM.render(<MainApp/>, div);
ReactDOM.unmountComponentAtNode(div);
});
