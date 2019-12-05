import React, { Component } from 'react';
import * as utils from '../lib/sidebarUtils';
import moment from 'moment';
import Select from 'react-select';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    const corssFactors = [
      { label: 'Precipitation', checked: false },
      { label: 'Temperature High', checked: true },
      { label: 'Temperature Low', checked: false },
      { label: 'Humidity', checked: true },
      { label: 'Visibility', checked: false },
      { label: 'Ozone', checked: false },
      { label: 'UV Index', checked: false }
    ];
    const userFilters = [
      {
        label: 'Gender',
        options: [
          { value: 'All', label: 'All' },
          { value: 'Men', label: 'Men' },
          { value: 'Women', label: 'Women' }
        ],
        value: { value: 'All', label: 'All' },
        isMulti: false
      },
      {
        label: 'Age',
        options: [
          { value: 'All', label: 'All' },
          { value: '<= 16', label: '<= 16' },
          { value: '16-30', label: '16-30' },
          { value: '30-40', label: '30-40' },
          { value: '> 40', label: '> 40' }
        ],
        value: { value: 'All', label: 'All' },
        isMulti: false
      },
      {
        label: 'Regions',
        options: [
          { value: 'All', label: 'All' },
          { value: 'Brookline', label: 'Brookline' },
          { value: 'Cambridge', label: 'Cambridge' },
          { value: 'Somerville', label: 'Somerville' },
          { value: 'Boston', label: 'Boston' },
          { value: 'Motivate', label: 'Motivate' },
          { value: '8D', label: '8D' },
          { value: 'Hingham', label: 'Hingham' },
          { value: 'Quincy', label: 'Quincy' },
          { value: 'Everett', label: 'Everett' },
          { value: 'Lyft', label: 'Lyft' },
          { value: 'Unassigned', label: 'Unassigned' }
        ],
        value: [{ value: 'All', label: 'All' }],
        isMulti: true
      }
    ];

    this.state = {
      currentDateRange: utils.initialDateRange,
      selectedDateRange: utils.initialDateRange,
      dateRangePresets: utils.dateRangePresets,
      shouldSelectCustomDateRange: false,
      shouldEditCustomDateRange: false,
      corssFactors,
      userFilters
    };

    this.resetDateRange = this.resetDateRange.bind(this);
  }

  resetDateRange() {
    const selectedDateRange = utils.initialDateRange;
    const dateRangePresets = utils.dateRangePresets;
    this.setState({
      selectedDateRange,
      dateRangePresets,
      shouldEditCustomDateRange: false,
      shouldSelectCustomDateRange: false
    });
  }

  renderDateRangeSectionHTML() {
    /**
     * convert date string from 'MM/DD/YYYY' to 'YYYY-MM-DD' which is the required format for HTML5 date input element
     * @param {Object} date a momentjs object
     */
    const formatDateToISOFormat = date => date.format(utils.dateISOFormat);
    /**
     * @param {Object} range {start: momentJS object, end: momentJS object}
     */
    const isRangeAPreset = range =>
      this.state.dateRangePresets.some(
        preset => preset.start === range.start && preset.end === range.end
      );
    const editCustomRange = () =>
      this.setState({
        shouldEditCustomDateRange: true,
        shouldSelectCustomDateRange: true
      });
    const cancelEditingCustomRange = () => {
      this.setState({
        selectedDateRange: this.state.currentDateRange,
        shouldEditCustomDateRange: false,
        shouldSelectCustomDateRange: !isRangeAPreset(
          this.state.currentDateRange
        )
      });
    };

    /**
     *
     * @param {String} label
     * @param {Object} date a momentjs object
     * @param {String} part 'START'|'END'
     */
    const customRangeControl = (label, date, part) => {
      /**
       * update `state.selectedDateRange`
       * @param {String} part 'START' | 'END'
       * @param {String} date ISO formatted date string 'YYYY-MM-DD'
       */
      const manualUpdateDateRange = (part, date) => {
        const dateRangePresets = this.state.dateRangePresets.map(preset => ({
          ...preset,
          selected: false
        }));
        this.setState({
          selectedDateRange: {
            ...this.state.selectedDateRange,
            [part.toLowerCase()]: moment(date)
          },
          dateRangePresets
        });
      };
      // Support cancel editing with ESC key
      const keyUpHandler = e => {
        if (e.key === 'Escape') {
          cancelEditingCustomRange();
        }
      };
      return (
        <label className='control'>
          <span className='label'>{label}</span>
          <input
            type='date'
            value={formatDateToISOFormat(date)}
            onChange={e => manualUpdateDateRange(part, e.currentTarget.value)}
            onKeyUp={keyUpHandler}
          />
        </label>
      );
    };
    const customRangeControlFrom = customRangeControl(
      'From',
      this.state.selectedDateRange.start,
      'START'
    );
    const customRangeControlTo = customRangeControl(
      'To',
      this.state.selectedDateRange.end,
      'END'
    );

    const customDateRangeSectionHTML = (() => {
      if (this.state.shouldSelectCustomDateRange) {
        const style = {};
        if (this.state.shouldEditCustomDateRange) {
          style.form = { display: 'block' };
          style.readonlyText = { display: 'none' };
        } else {
          style.form = { display: 'none' };
          style.readonlyText = { display: 'flex' };
        }
        return (
          <div className='custom-date-range-container'>
            <form
              onSubmit={e => {
                e.preventDefault();
                this.applyFilters();
              }}
              style={style.form}
            >
              <div className='custom-date-range-inputs'>
                {customRangeControlFrom}
                {customRangeControlTo}
              </div>
              <div className='actions'>
                <button
                  type='button'
                  className='button is-success'
                  onClick={cancelEditingCustomRange}
                >
                  CANCEL
                </button>
                <button
                  type='submit'
                  className='button is-primary hidden-sm-down'
                >
                  APPLY
                </button>
              </div>
            </form>
            <div
              className='current-date-range'
              onClick={editCustomRange}
              style={style.readonlyText}
            >
              <span className='date-range'>
                {this.state.currentDateRange.start.format(
                  utils.dateDisplayFormat
                )}{' '}-{' '}
                {this.state.currentDateRange.end.format(
                  utils.dateDisplayFormat
                )}
              </span>
            </div>
          </div>
        );
      }
    })();

    return (
      <div className='section'>
        <div className='section-header'>
          <span className='section-title'>Date Range</span>
          <a className='btn-section-reset' onClick={this.resetDateRange}>
            reset
          </a>
        </div>
        <div className='section-body'>
          <ul className='date-range-presets'>
            {this.state.dateRangePresets.map(preset => {
              const selected =
                preset.selected && !this.state.shouldSelectCustomDateRange;
              return (
                <li key={preset.label}>
                  <a
                    data-selected={selected}
                    onClick={() => this.setDateRangeFromPreset(preset)}
                  >
                    {preset.label}
                  </a>
                </li>
              );
            })}
            <li>
              <a
                data-selected={this.state.shouldSelectCustomDateRange}
                onClick={() =>
                  !this.state.shouldSelectCustomDateRange && editCustomRange()
                }
              >
                Custom Date Range
              </a>
            </li>
          </ul>
          {customDateRangeSectionHTML}
        </div>
      </div>
    );
  }

  /**
   * sets the date range section filter controls with preset
   * @param {Object} preset Refer to definition of `state.dateRangePresets` for shape of preset object
   */
  setDateRangeFromPreset(preset) {
    const dateRangePresets = this.state.dateRangePresets.map(p =>
      p.label === preset.label
        ? { ...p, selected: true }
        : { ...p, selected: false }
    );
    const selectedDateRange = {
      start: preset.range.start,
      end: preset.range.end
    };

    this.setState({
      selectedDateRange,
      dateRangePresets,
      shouldEditCustomDateRange: false,
      shouldSelectCustomDateRange: false
    });
  }

  applyFilters() {
    this.setState({
      currentDateRange: this.state.selectedDateRange,
      shouldEditCustomDateRange: false
    });
    // TODO:
    // Apply filters
  }

  /**
   * @param {Object} factor Refer to definition of `state.crossFactors` for shape of factor object
   */
  toggleFactor(factor) {
    const items = this.state.corssFactors.map(i =>
      i.label === factor.label ? { ...i, checked: !i.checked } : i
    );
    this.setState({ corssFactors: items });
  }

  updateUserFilters(filter, selectedValue) {
    // console.log('filter', filter);
    // console.log('selected value', selectedValue);
    const newFilters = this.state.userFilters.map( f => {
      if (f.label !== filter.label) return f;
      else {
        if (f.isMulti) {
          if (!selectedValue || selectedValue.length === 0) {
            selectedValue = [{ value: 'All', label: 'All' }];
          } else {
            if (f.value[0].value === 'All')
              selectedValue = selectedValue.filter(v => v.value !== 'All');
            else if (selectedValue.some(v => v.value === 'All'))
              selectedValue = [{ value: 'All', label: 'All' }];
          }
        }
        return {...f, value: selectedValue};
      }
    });

    this.setState({userFilters: newFilters});
  }

  render() {
    const dateRangeSectionHTML = this.renderDateRangeSectionHTML();
    return (
      <div className='filter-container'>
        <div className='filter-header'>
          <h2>Filter By</h2>
        </div>

        {dateRangeSectionHTML}

        <div className='section cross-factors'>
          <div className='section-header'>
            <span className='section-title'>Cross Factors</span>
          </div>

          <div className='section-body'>
            <ul>
              {this.state.corssFactors.map(factor => (
                <li key={factor.label}>
                  <label className='control'>
                    <input
                      type='checkbox'
                      onChange={() => this.toggleFactor(factor)}
                      checked={factor.checked}
                    />
                    {factor.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='section user-filters'>
          <div className='section-header'>
            <span className='section-title'>User Base Filters</span>
          </div>

          <div className='section-body'>
            <ul>
              {this.state.userFilters.map(item => (
                <li key={item.label}>
                  <span className='label'>{item.label}</span>
                  <Select
                    className='react-select'
                    value={item.value}
                    onChange={selected =>
                      this.updateUserFilters(item, selected)
                    }
                    options={item.options}
                    isMulti={item.isMulti}
                    closeMenuOnSelect={!item.isMulti}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <a
          className='button is-primary is-block apply-filters'
          onClick={this.applyFilters}
        >
          APPLY
        </a>
      </div>
    );
  }
}

export default Sidebar;
