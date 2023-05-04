import "./App.css";
import { useState } from "react";

import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
// plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// bootstrap plugins
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

// locale
import deLocale from "@fullcalendar/core/locales/de";
import nlLocale from "@fullcalendar/core/locales/nl";

import { INITIAL_EVENTS, createEventId } from "./utils/eventUtils";
import { LANGUAGES } from "./utils/languageOptions";

function App() {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [language, setLanguage] = useState("en");

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
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

  const renderSidebarEvent = (event) => {
    return (
      <li key={event.id}>
        <b>
          {formatDate(event.start, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </b>
        <i>{event.title}</i>
      </li>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="select-container">
          <select
            name="languageSelect"
            value={language}
            onChange={handleLanguageChange}
          >
            {LANGUAGES.map(({ label, value }) => (
              <option key={label} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <b>Termin</b>
      </header>

      <main className="demo-app">
        <div className="demo-app-sidebar">
          <div className="demo-app-sidebar-section">
            <h2>All events: {currentEvents.length}</h2>
            <ul>{currentEvents.map(renderSidebarEvent)}</ul>
          </div>
        </div>
        <div className="demo-app-main">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
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
      </main>
    </div>
  );
}

export default App;
