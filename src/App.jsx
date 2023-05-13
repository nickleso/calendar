import "./App.css";
import { useState } from "react";
import { nanoid } from "nanoid";
import {
  AiOutlineCloseCircle,
  AiOutlineDelete,
  AiOutlinePhone,
} from "react-icons/ai";

// import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
// plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

// bootstrap plugins
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

// locale
import deLocale from "@fullcalendar/core/locales/de";
import nlLocale from "@fullcalendar/core/locales/nl";

import { INITIAL_EVENTS } from "./utils/eventUtils";

// components
import { EventForm } from "./components/EventForm";
import { Header } from "./components/Header";
import { Modal } from "./components/Modal/Modal";

import styled from "styled-components";
import moment from "moment";

const Form = styled.form`
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 0rem;
  max-width: 500px;
  margin: 0 auto;
  background-color: white;
  border-radius: 0.25rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  margin-bottom: 12px;
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
  border: transparent;

  &:hover {
    background-color: #005fa3;
  }
`;

export const App = () => {
  const [language, setLanguage] = useState("en");
  const [currentEvents, setCurrentEvents] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleShowModal = () => {
    setShowAddModal(!showAddModal);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const title = form.elements.title.value;
    const description = form.elements.description.value;
    const phone = form.elements.phone.value;

    const newEvent = { ...formData, title, description, phone };

    let calendarApi = selectedEvent.view.calendar;
    calendarApi.addEvent(newEvent);
    calendarApi.unselect();

    setShowAddModal(!showAddModal);
    setFormData(null);
    setSelectedEvent(null);
    // form.reset();
  };

  const handleDateSelect = (selectInfo) => {
    setSelectedEvent(selectInfo);

    setFormData({
      id: nanoid(6),
      title: "",
      description: "",
      phone: "",
      start: moment(selectInfo.startStr).format("YYYY-MM-DD HH:mm:ss"),
      end: moment(selectInfo.endStr).format("YYYY-MM-DD HH:mm:ss"),
    });
    setShowAddModal(!showAddModal);
  };

  const handleEventContent = (arg) => {
    return (
      <>
        <b>{arg.timeText}</b>
        <p>{arg.event.title}</p>
        <a
          href={`tel:${arg.event.extendedProps.phone}`}
          style={{ color: "#000000" }}
        >
          <AiOutlinePhone />
          {arg.event.extendedProps.phone}
        </a>
        <AiOutlineDelete onClick={handleEventDelete} />
      </>
    );
  };

  const handleEventClick = ({ event }) => {
    console.log("click");
    setSelectedEvent(event);
    console.log(event);

    const { id, title, startStr, endStr, extendedProps } = event;

    setFormData({
      id,
      title,
      description: extendedProps.description,
      phone: extendedProps.phone,
      start: moment(startStr).format("YYYY-MM-DD HH:mm:ss"),
      end: moment(endStr).format("YYYY-MM-DD HH:mm:ss"),
    });
    setShowAddModal(!showAddModal);
  };

  const handleEventDelete = (clickInfo) => {
    console.log("click");
    console.log(clickInfo);
    // const conf = window.confirm(
    //   `Are you sure you want to delete the event '${clickInfo.event.title}'`
    // );

    // if (conf === true) {
    //   clickInfo.event.remove();
    // }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  // language select
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="App">
      <Header language={language} handleLanguageChange={handleLanguageChange} />

      <main className="demo-app">
        {/* <div className="demo-app-sidebar">
          <div className="demo-app-sidebar-section">
            <h2>All events: {currentEvents.length}</h2>
            <ul>{currentEvents.map(renderSidebarEvent)}</ul>
          </div>
        </div> */}

        <div className="demo-app-main">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
              bootstrap5Plugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth, timeGridWeek, timeGridDay, listMonth",
            }}
            initialView="timeGridWeek"
            slotDuration="00:15"
            editable={true}
            selectable={true}
            dayMaxEvents={true}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={handleEventContent}
            // eventDisplay="block"
            eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
            locales={[deLocale, nlLocale]}
            locale={language}
            themeSystem="bootstrap5"
            slotMinTime="08:00:00"
            slotMaxTime="19:00:00"
          />
        </div>

        {showAddModal && (
          <Modal onClose={handleShowModal}>
            <Form onSubmit={handleSubmit}>
              <AiOutlineCloseCircle
                onClick={handleShowModal}
                style={{ position: "absolute", right: "8px", top: "8px" }}
              />
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
            {/* <EventForm
              onClose={handleDateSelect}
              handleDateSelect={handleDateSelect}
            /> */}
          </Modal>
        )}
      </main>
    </div>
  );
};
