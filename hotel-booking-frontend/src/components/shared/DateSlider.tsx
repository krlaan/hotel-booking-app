import {useState} from "react";
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import {DateRangePicker, type Range, type RangeKeyDict} from "react-date-range";
import {FaCalendarAlt, FaEraser} from "react-icons/fa";

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
        <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                        <FaCalendarAlt className="hotel-color me-2" size={20} />
                        <h6 className="mb-0 fw-semibold">Filter Bookings</h6>
                    </div>
                    <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={handleClearFilter}
                        title="Clear filter">
                        <FaEraser className="me-1"/>
                        Clear
                    </button>
                </div>

                <div className="date-slider-wrapper">
                    <DateRangePicker
                        ranges={[dateRange]}
                        onChange={handleSelect}
                        months={2}
                        direction="horizontal"
                    />
                </div>
            </div>
        </div>
    );
};

export default DateSlider;
