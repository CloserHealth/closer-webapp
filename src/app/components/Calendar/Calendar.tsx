import Actions from "./Partials/Actions";
import CalendarComponent from "./Partials/Calendar";

interface ICalendarProps {
  setDate: any;
  date: any;
  selectRange: boolean;
  setSelectRange: any;
  periodStartDate: any;
  periodEndDate: any;
  tileContent: any;
}

const CustomCalendar = (props: ICalendarProps) => {
  const { setDate, date, selectRange, setSelectRange, periodStartDate, periodEndDate, tileContent } = props;
  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <CalendarComponent
        setDate={setDate}
        date={date}
        selectRange={selectRange}
        periodStartDate={periodStartDate}
        periodEndDate={periodEndDate}
        tileContent={tileContent}
      />
      {/* <Actions
        setDate={setDate}
        date={date}
        selectRange={selectRange}
        setSelectRange={setSelectRange}
      /> */}
    </div>
  );
};

export default CustomCalendar;
