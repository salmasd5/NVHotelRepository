import  { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import PropTypes from 'prop-types';
import { DateRangePicker } from "react-date-range";

const DateSlider = ({ onDateChange, onFilterChange }) => {
	const [dateRange, setDateRange] = useState({
		startDate: null,
		endDate: null,
		key: "selection"
	});

	const handleSelect = (ranges) => {
		const { startDate, endDate } = ranges.selection;
		setDateRange(ranges.selection);
		if (onDateChange) onDateChange(startDate, endDate);
		if (onFilterChange) onFilterChange(startDate, endDate);
	};

	const handleClearFilter = () => {
		setDateRange({
			startDate: null,
			endDate: null,
			key: "selection"
		});
		if (onDateChange) onDateChange(null, null);
		if (onFilterChange) onFilterChange(null, null);
	};

	return (
		<>
			<h5>Filter bookings by date</h5>
			<DateRangePicker
				ranges={[dateRange]}
				onChange={handleSelect}
				className="mb-4"
			/>
			<button className="btn btn-secondary" onClick={handleClearFilter}>
				Clear Filter
			</button>
		</>
	);
};

DateSlider.propTypes = {
	onDateChange: PropTypes.func.isRequired,
	onFilterChange: PropTypes.func, // Optional prop
};

export default DateSlider;
