import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

const blog = {
  title: 'test article',
  author: 'Tim',
  url: 'link.com',
  likes: 1,
  user: {
    id: 1,
  },
};

test('Blog component shows only article title and author initially', () => {
  const { container } = render(<Blog blog={blog} />);

  screen.getByText('test article');
  screen.getByText('By Tim');

  const div = container.querySelector('.moreInfo');
  expect(div).toHaveStyle('display: none');
});

test('clicking view button shows the url and likes', async () => {
  const { container } = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

  const div = container.querySelector('.moreInfo');
  expect(div).not.toHaveStyle('display: none');
});

test('clicking the like button twice calls appropriate event handler twice', async () => {
  const mockHandler = jest.fn();

  render(<Blog blog={blog} increaseLikes={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText('like');
  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
