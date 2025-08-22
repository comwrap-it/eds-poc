import React, { useEffect, useRef, useState } from "react";
import {
  DateInputWrapper,
  Input,
  CalendarButton,
  CalendarPopup,
  CalendarGrid,
  CalendarHeader,
  CalendarDay,
  MonthBar,
  ArrowButton,
  MonthYearLabel,
  YearList,
  YearItem,
  YearsListContainer,
  InputContainer,
  CurrentYear,
} from "./UsDateInput.Style";
import { DELETE_CONTENT_BACKWARD, ICONS } from "../../Form.data";

const UsDateInput = (props: any) => {
  const { config, onChange } = props;
  const { name, placeholder, onFocusPlaceholder, readOnly, defaultValue } =
    config;

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(defaultValue);
  const [isYearListOpen, setIsYearListOpen] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [displayedYearStart, setDisplayedYearStart] = useState<number>(
    new Date().getFullYear() - 4
  );
  const [displayedYearEnd, setDisplayedYearEnd] = useState<number>(
    new Date().getFullYear()
  );

  const dateInputRef = useRef<HTMLDivElement>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const onFocusLabel = onFocusPlaceholder || "gg/mm/aaaa";

  const handleFocus = () => setIsInputFocused(true);
  const handleBlur = () => setIsInputFocused(false);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setInputValue(formatDate(date)); // Imposta la data nel formato corretto nell'input
    onChange(formatDate(date));
    setIsCalendarOpen(false); // Chiudo il calendario dopo la selezione
  };

  /**
   * Funzione per formattare la data in formato "DD/MM/YYYY"
   **/
  const formatDate = (date: Date): string => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  /**
   * Funzione per generare il calendario
   **/
  const generateCalendar = (): (Date | null)[] => {
    const firstDay = new Date(currentYear, currentMonth.getMonth(), 0);
    const daysInMonth = new Date(
      currentYear,
      currentMonth.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfWeek = firstDay.getDay(); // 0 = Domenica, 1 = Lunedì, etc.

    const days: (Date | null)[] = [];

    // Aggiungi i giorni del mese precedente
    const prevMonthDays = new Date(
      currentYear,
      currentMonth.getMonth(),
      0
    ).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(
        new Date(currentYear, currentMonth.getMonth() - 1, prevMonthDays - i)
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth.getMonth(), i);
      days.push(date);
    }

    // Aggiungi i giorni del mese successivo
    const lastDayOfWeek = new Date(
      currentYear,
      currentMonth.getMonth() + 1,
      0
    ).getDay();
    const nextMonthDays = 7 - lastDayOfWeek - 1;
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push(new Date(currentYear, currentMonth.getMonth() + 1, i));
    }

    return days;
  };

  // Funzione per navigare tra i mesi
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentYear, currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentYear, currentMonth.getMonth() + 1));
  };

  const delta = 5;

  // Funzione per navigare tra gli anni
  const goToPreviousYear = () => {
    setDisplayedYearStart(displayedYearStart - delta);
    setDisplayedYearEnd(displayedYearEnd - delta);
  };

  const goToNextYear = () => {
    setDisplayedYearStart(displayedYearStart + delta);
    setDisplayedYearEnd(displayedYearEnd + delta);
  };

  // Funzione per toggle della lista degli anni
  const toggleYearList = () => {
    setIsYearListOpen(!isYearListOpen);
  };

  /**
   * funzione per modificare la data inserita nel formato corretto
   */
  const handleInputChange = (e: any) => {
    let value = e.target.value;
    if (e.nativeEvent.inputType !== DELETE_CONTENT_BACKWARD) {
      value = e.target.value.replace(/\D/g, "");
      if (value.length >= 2) value = `${value.slice(0, 2)}/${value.slice(2)}`;
      if (value.length >= 5) value = `${value.slice(0, 5)}/${value.slice(5)}`;
    }
    onChange(value.slice(0, 10));
    setInputValue(value.slice(0, 10));
  };

  // Funzione per chiudere il calendario se si clicca fuori dal componente
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dateInputRef.current &&
      !dateInputRef.current.contains(event.target as Node)
    ) {
      setIsCalendarOpen(false); // Chiudi il calendario se il click è fuori
    }
  };

  // gestione click esterno
  useEffect(() => {
    if (isCalendarOpen)
      document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCalendarOpen]);

  return (
    <>
      <DateInputWrapper ref={dateInputRef}>
        <InputContainer>
          <Input
            defaultValue={defaultValue}
            disabled={readOnly}
            className={`${name} ${!props.hideErrorsInline && props.invalid && props.error ? 'error' : ''}`}
            type="text"
            value={defaultValue && readOnly ? defaultValue : inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={isInputFocused ? onFocusLabel : placeholder}
          />
          <CalendarButton
            onClick={() => !readOnly && setIsCalendarOpen(!isCalendarOpen)}
          >
            <img alt="Calendar" src={isCalendarOpen ? ICONS.CROSS : ICONS.CALENDAR} />
          </CalendarButton>
        </InputContainer>
        {isCalendarOpen && (
          <CalendarPopup>
            <MonthBar>
              <ArrowButton onClick={goToPreviousMonth}>{"<"}</ArrowButton>
              <MonthYearLabel onClick={toggleYearList}>
                {currentMonth.toLocaleString("default", { month: "long" })}{" "}
                <CurrentYear>{currentYear}</CurrentYear>
              </MonthYearLabel>
              <ArrowButton onClick={goToNextMonth}>{">"}</ArrowButton>
            </MonthBar>
            <YearsListContainer>
              {isYearListOpen && (
                <>
                  <ArrowButton onClick={goToPreviousYear}>{"<"}</ArrowButton>
                  <YearList>
                    {[...Array(delta)].map((_, index) => {
                      const year = displayedYearStart + index;
                      return (
                        <YearItem
                          key={year}
                          selected={year === currentYear}
                          onClick={() => {
                            setCurrentYear(year);
                            setIsYearListOpen(false);
                          }}
                        >
                          {year}
                        </YearItem>
                      );
                    })}
                  </YearList>
                  <ArrowButton onClick={goToNextYear}>{">"}</ArrowButton>
                </>
              )}
            </YearsListContainer>

            <CalendarHeader>
              {["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"].map(
                (day, index) => (
                  <div key={index}>{day}</div>
                )
              )}
            </CalendarHeader>
            <CalendarGrid>
              {generateCalendar().map((date, index) => (
                <CalendarDay
                  className={
                    selectedDate &&
                    selectedDate.toDateString() === date?.toDateString()
                      ? "selected-day"
                      : ""
                  }
                  key={index}
                  onClick={date ? () => handleDateSelect(date) : undefined}
                  selected={
                    selectedDate &&
                    selectedDate.toDateString() === date?.toDateString()
                  }
                  isOtherMonth={
                    date && date.getMonth() !== currentMonth.getMonth()
                  }
                >
                  {date ? date.getDate() : ""}
                </CalendarDay>
              ))}
            </CalendarGrid>
          </CalendarPopup>
        )}
      </DateInputWrapper>
      {!props.hideErrorsInline && props.invalid && props.error && (
        <div className={`us-input-errors-wrapper active`}>
          <span>{props.error?.message}</span>
        </div>
      )}
    </>
  );
};

export default UsDateInput;
