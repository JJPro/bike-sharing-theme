import moment from 'moment';

export const dateDisplayFormat = 'MM/DD/YYYY';
export const dateISOFormat = 'YYYY-MM-DD';
export const today = moment();
export const startOfLastMonth = moment(today).subtract(1, 'month').startOf('month');
export const endOfLastMonth = moment(today).subtract(1, 'month').endOf('month');
export const dateRangePresets = [
  {
    label: 'Last Month',
    range: { start: startOfLastMonth, end: endOfLastMonth },
    selected: true
  },
  {
    label: 'Last 90 Days',
    range: { start: moment(endOfLastMonth).subtract(90, 'd'), end: endOfLastMonth },
    selected: false
  },
  {
    label: 'This Year',
    range: { start: moment().startOf('year'), end: today },
    selected: false
  },
  {
    label: 'Last Year',
    range: {
      start: moment(today).subtract(1, 'years').startOf('year'),
      end: moment(today).subtract(1, 'years').endOf('year')
    },
    selected: false
  },
];
export const initialDateRange = dateRangePresets[0].range;