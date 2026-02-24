import {useState} from "react";
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import {DateRangePicker, type Range, type RangeKeyDict} from "react-date-range";

type Props = {
    onDateChange: (start: Date | null, end: Date | null) => void
    onFilterChange: (start: Date | null, end: Date | null) => void
}

const DateSlider = ({onDateChange, onFilterChange}: Props) => {
    const [dateRange, setDateRange] = useState<Range>({
        startDate: undefined,
        endDate: undefined,
        key: "selection"
    });

    const handleSelect = (ranges: RangeKeyDict) => {
        const selection = ranges["selection"]

        setDateRange(selection)

        onDateChange(selection.startDate ?? null, selection.endDate ?? null)
        onFilterChange(selection.startDate ?? null, selection.endDate ?? null)
    }

    const handleClearFilter = () => {
        setDateRange({
            startDate: undefined,
            endDate: undefined,
            key: "selection"
        })

        onDateChange(null, null);
        onFilterChange(null, null);
    }

    return (
        <>
            <h5>Filter bookings by date</h5>
            <DateRangePicker ranges={[dateRange]} onChange={handleSelect} className="mb-4"/>
            <button className="btn btn-secondary" onClick={handleClearFilter}>
                Clear filter
            </button>
        </>
    );
};

export default DateSlider;
