import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { createNew } from "../reducers/blogsReducer";

const CreatePost = ({ createPostRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const handleCreate = async (e) => {
    e.preventDefault();
    const req = { title, author, url };

    createPostRef.current.toggleVisibility();
    dispatch(createNew(req));
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h2>Create New</h2>

      <Form onSubmit={handleCreate}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Form.Label>Author:</Form.Label>
          <Form.Control
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
          <Button variant="primary" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default CreatePost;
