import { nanoid } from "nanoid";
import { useState } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { createNewEvent } from "../redux/events/eventsOperations";

const Form = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
  background-color: white;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background-color: #0077cc;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #005fa3;
  }
`;

export const EventForm = ({ onClose, handleDateSelect }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: nanoid(6),
    title: "",
    description: "",
    phone: "",
    start: "",
    end: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.elements.title.value;
    const description = form.elements.description.value;
    const phone = form.elements.phone.value;
    const start = form.elements.start.value;
    const end = form.elements.description.end;

    const newEvent = {
      id: nanoid(6),
      title,
      description,
      phone,
      start,
      end,
    };

    console.log(newEvent);
    dispatch(createNewEvent(newEvent));
    // handleDateSelect(newEvent);
    form.reset();
    onClose();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="title">Title:</Label>
      <Input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />

      <Label htmlFor="description">Description:</Label>
      <TextArea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      ></TextArea>

      <Label htmlFor="phone">Phone:</Label>
      <Input
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <Label htmlFor="start">Event start:</Label>
      <Input
        type="datetime-local"
        id="start"
        name="start"
        value={formData.start}
        onChange={handleChange}
      />

      <Label htmlFor="end">Event end:</Label>
      <Input
        type="datetime-local"
        id="end"
        name="end"
        value={formData.end}
        onChange={handleChange}
      />

      <Button type="submit">Create event</Button>
    </Form>
  );
};
