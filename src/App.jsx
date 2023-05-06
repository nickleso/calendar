import "./App.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { nanoid } from "nanoid";

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
import { getNewEvent } from "./redux/events/eventsSelectors";

export const App = () => {
  // const dispatch = useDispatch();
  const [language, setLanguage] = useState("en");
  const [currentEvents, setCurrentEvents] = useState([]);
  const newEwent = useSelector(getNewEvent);

  const [showAddModal, setShowAddModal] = useState(false);

  console.log(currentEvents);

  const handleShowModal = () => {
    setShowAddModal(!showAddModal);
  };

  const handleDateSelect = (selectInfo) => {
    setShowAddModal(!showAddModal);

    console.log(newEwent);

    const addNewEvent = async () => {
      try {
        const event = await newEwent;
        console.log(event);

        let calendarApi = selectInfo.view.calendar;
        calendarApi.unselect(); // clear date selection
        calendarApi.addEvent(event);
      } catch (error) {
        console.log(error);
      }
    };

    addNewEvent();

    // let title = prompt("Please enter a new title for your event");
    // let calendarApi = selectInfo.view.calendar;

    // calendarApi.unselect(); // clear date selection

    // calendarApi.addEvent(newEvent);

    // if ("title") {
    //   calendarApi.addEvent({
    //     id: nanoid(),
    //     title: "",
    //     description: "",
    //     phone: "",
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   });
    // }
  };

  const handleEventClick = (clickInfo) => {
    const conf = window.confirm(
      `Are you sure you want to delete the event '${clickInfo.event.title}'`
    );

    if (conf === true) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  // language select
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  // const renderSidebarEvent = (event) => {
  //   return (
  //     <li key={event.id}>
  //       <b>
  //         {formatDate(event.start, {
  //           year: "numeric",
  //           month: "short",
  //           day: "numeric",
  //         })}
  //       </b>
  //       <i>{event.title}</i>
  //     </li>
  //   );
  // };

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
          />
        </div>

        {showAddModal && (
          <Modal onClose={handleShowModal}>
            <EventForm
              onClose={handleDateSelect}
              handleDateSelect={handleDateSelect}
            />
          </Modal>
        )}
      </main>
    </div>
  );
};
