import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreatePost from "./CreatePost";

test("Creating a new post calls the submit handler with the correct user input", async () => {
  const user = userEvent.setup();
  const mockCreate = jest.fn();

  render(<CreatePost createNew={mockCreate} />);

  const createButton = screen.getByText("create");
  const formInputs = screen.getAllByRole("textbox");

  await user.type(formInputs[0], "test title");
  await user.type(formInputs[1], "test author");
  await user.type(formInputs[2], "test url");
  await user.click(createButton);

  expect(mockCreate.mock.calls).toHaveLength(1);
  expect(mockCreate.mock.calls[0][0].title).toBe("test title");
  expect(mockCreate.mock.calls[0][0].author).toBe("test author");
  expect(mockCreate.mock.calls[0][0].url).toBe("test url");
});
