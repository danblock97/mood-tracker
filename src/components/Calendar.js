import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MoodCalendar = ({ events }) => (
  <div className="p-4 bg-white shadow-md rounded-lg mt-8">
    <h2 className="text-2xl mb-4">Mood Calendar</h2>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
);

export default MoodCalendar;
