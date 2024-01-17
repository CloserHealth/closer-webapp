import { motion } from "framer-motion";
import Calendar from "react-calendar";

interface CalendarProps {
  setDate: any;
  date: any;
  selectRange: any;
   periodStartDate: any;
  periodEndDate: any;
  tileContent: any;
}
const CalendarComponent = (props: CalendarProps) => {
  const { setDate, date, selectRange, periodStartDate, periodEndDate, tileContent } = props;
  
  return (
      <Calendar onChange={setDate} value={date} selectRange={selectRange} tileContent={tileContent} />
  );
};

export default CalendarComponent;
