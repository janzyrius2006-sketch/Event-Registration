import { useState } from 'react'
import './App.css'

const initialEvents = [
  {
    id: 'EVT-001',
    title: 'Designing for the in-between',
    date: '2026-10-08',
    location: 'North Hall, Brooklyn',
    capacity: 120,
    registered: 86,
  },
  {
    id: 'EVT-002',
    title: 'The independent makers market',
    date: '2026-10-15',
    location: 'Foundry House, Queens',
    capacity: 200,
    registered: 143,
  },
  {
    id: 'EVT-003',
    title: 'Small rooms, big ideas',
    date: '2026-10-22',
    location: 'The Greenpoint Room',
    capacity: 64,
    registered: 64,
  },
  {
    id: 'EVT-004',
    title: 'Sunday supper club',
    date: '2026-11-01',
    location: 'Juniper Kitchen, Brooklyn',
    capacity: 32,
    registered: 19,
  },
]

const blankEvent = { title: '', date: '', location: '', capacity: '' }

function formatDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function App() {
  const [events, setEvents] = useState(initialEvents)
  const [formOpen, setFormOpen] = useState(false)
  const [formValues, setFormValues] = useState(blankEvent)
  const [query, setQuery] = useState('')

  const totalRegistered = events.reduce((total, event) => total + event.registered, 0)
  const totalCapacity = events.reduce((total, event) => total + event.capacity, 0)
  const openSeats = totalCapacity - totalRegistered
  const filteredEvents = events.filter((event) =>
    `${event.title} ${event.location}`.toLowerCase().includes(query.toLowerCase()),
  )

  function registerForEvent(id) {
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === id && event.registered < event.capacity
          ? { ...event, registered: event.registered + 1 }
          : event,
      ),
    )
  }

  function createEvent(event) {
    event.preventDefault()
    const nextId = `EVT-${String(Date.now()).slice(-6)}`
    setEvents((currentEvents) => [
      ...currentEvents,
      {
        id: nextId,
        title: formValues.title.trim(),
        date: formValues.date,
        location: formValues.location.trim(),
        capacity: Number(formValues.capacity),
        registered: 0,
      },
    ])
    setFormValues(blankEvent)
    setFormOpen(false)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="Gather home">
          <span className="wordmark-mark" aria-hidden="true">g</span>
          <span>gather<span className="wordmark-period">.</span></span>
        </a>
        <div className="topbar-right">
          <span className="workspace-label"><span className="status-dot" /> Brooklyn events</span>
          <span className="avatar" aria-label="Account: Alex Morgan">AM</span>
        </div>
      </header>

      <section className="intro" id="home">
        <img
          className="intro-image"
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1800&q=85"
          alt="Guests gathering beneath string lights at an evening event"
        />
        <div className="intro-shade" />
        <div>
          <p className="eyebrow">YOUR EVENT DESK <span>/</span> FALL 2026</p>
          <h1>Make room<br />for a good time.</h1>
          <p className="intro-copy">Good plans start with getting everyone in the same place.</p>
        </div>
        <span className="intro-index">01 <i /> 04</span>
      </section>

      <section className="overview" aria-label="Event overview">
        <div className="overview-heading">
          <div>
            <p className="eyebrow">THE BIG PICTURE</p>
            <h2>Coming together</h2>
          </div>
          <button className="primary-button" type="button" onClick={() => setFormOpen(!formOpen)}>
            <span aria-hidden="true">{formOpen ? '−' : '+'}</span>
            {formOpen ? 'Close form' : 'Create event'}
          </button>
        </div>
        <div className="stat-grid">
          <div className="stat-item"><span className="stat-label">ON THE CALENDAR</span><strong>{events.length.toString().padStart(2, '0')}</strong><span className="stat-note">events scheduled</span></div>
          <div className="stat-item"><span className="stat-label">PEOPLE JOINING</span><strong>{totalRegistered.toLocaleString()}</strong><span className="stat-note">registered guests</span></div>
          <div className="stat-item"><span className="stat-label">ROOM TO GROW</span><strong>{openSeats.toLocaleString()}</strong><span className="stat-note">seats still open</span></div>
        </div>
      </section>

      {formOpen && (
        <section className="event-form-section" aria-labelledby="form-title">
          <div className="form-heading">
            <div><p className="eyebrow">ADD TO THE CALENDAR</p><h2 id="form-title">Start with the details.</h2></div>
          </div>
          <form className="event-form" onSubmit={createEvent}>
            <label className="field field-title">Event title<input required maxLength="80" placeholder="What are we getting together for?" value={formValues.title} onChange={(event) => setFormValues({ ...formValues, title: event.target.value })} /></label>
            <label className="field">Date<input required type="date" min="2026-09-26" value={formValues.date} onChange={(event) => setFormValues({ ...formValues, date: event.target.value })} /></label>
            <label className="field">Location<input required maxLength="100" placeholder="Venue and neighborhood" value={formValues.location} onChange={(event) => setFormValues({ ...formValues, location: event.target.value })} /></label>
            <label className="field">Capacity<input required type="number" min="1" max="10000" placeholder="e.g. 80" value={formValues.capacity} onChange={(event) => setFormValues({ ...formValues, capacity: event.target.value })} /></label>
            <button className="primary-button form-submit" type="submit">Add event <span aria-hidden="true">↗</span></button>
          </form>
        </section>
      )}

      <section className="event-section" aria-labelledby="events-title">
        <div className="event-heading">
          <div><p className="eyebrow">SAVE YOUR SPOT</p><h2 id="events-title">The guest list</h2></div>
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input type="search" placeholder="Find an event" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search events" />
          </label>
        </div>
        <div className="event-list" role="list">
          {filteredEvents.map((event) => {
            const full = event.registered >= event.capacity
            const fill = Math.min((event.registered / event.capacity) * 100, 100)
            return (
              <article className="event-row" key={event.id} role="listitem">
                <div className="event-date"><span>{formatDate(event.date).split(' ')[0]}</span><strong>{new Date(`${event.date}T12:00:00`).getDate()}</strong></div>
                <div className="event-main">
                  <span className="event-id">{event.id}</span>
                  <h3>{event.title}</h3>
                  <p>{event.location}</p>
                </div>
                <div className="event-capacity">
                  <div className="capacity-copy"><span>{event.registered} / {event.capacity} registered</span><span>{full ? 'FULL' : `${event.capacity - event.registered} LEFT`}</span></div>
                  <div className="capacity-track" role="progressbar" aria-label={`${event.title} registrations`} aria-valuenow={event.registered} aria-valuemin="0" aria-valuemax={event.capacity}><span style={{ width: `${fill}%` }} /></div>
                </div>
                <button className={`register-button${full ? ' is-full' : ''}`} type="button" disabled={full} onClick={() => registerForEvent(event.id)}>{full ? 'At capacity' : 'Register'}{!full && <span aria-hidden="true">↗</span>}</button>
              </article>
            )
          })}
          {filteredEvents.length === 0 && <p className="empty-state">No events found. Try another title or location.</p>}
        </div>
      </section>
      <footer className="footer"><span>GATHER AROUND.</span><span>GOOD THINGS HAPPEN IN PERSON.</span></footer>
    </main>
  )
}

export default App
