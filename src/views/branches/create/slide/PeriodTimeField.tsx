import { Copy } from "lucide-react";
import { useEffect, useState } from "react";

import { TimePickerDemo } from "@/components/time-picker/TimePicker";
import type { AutoFormInputComponentProps } from "@/components/ui/auto-form/types";

export const PeriodTimeFieldType = ({
  label,
  isRequired,
  field,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) => {
  const MIDNIGHT_DATE: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    0,
    0,
    0,
    0
  );
  Copy;
  const ELEVEN_PM_DATE: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    23,
    0,
    0,
    0
  );

  const initialValue = fieldConfigItem.inputProps?.value || field.value;
  const [startDate, setStartDate] = useState<Date | undefined>(
    initialValue
      ? new Date(
          `${new Date().toISOString().slice(0, 10)}T${initialValue.toString().split("-")[0]}:00`
        )
      : MIDNIGHT_DATE
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    initialValue || field.value
      ? new Date(
          `${new Date().toISOString().slice(0, 10)}T${initialValue.toString().split("-")[1]}:00`
        )
      : ELEVEN_PM_DATE
  );
  useEffect(() => {
    if (initialValue) {
      setStartDate(
        new Date(
          `${new Date().toISOString().slice(0, 10)}T${initialValue.toString().split("-")[0]}:00`
        )
      );
      setEndDate(
        new Date(
          `${new Date().toISOString().slice(0, 10)}T${initialValue.toString().split("-")[1]}:00`
        )
      );
    }
  }, [initialValue]);
  useEffect(() => {
    if (startDate && endDate) {
      field.onChange(
        `${String(startDate.getHours()).padStart(2, "0")}:${String(startDate.getMinutes()).padStart(2, "0")}-${String(endDate.getHours()).padStart(2, "0")}:${String(endDate.getMinutes()).padStart(2, "0")}`
      );
    }
  }, [startDate, endDate]);

  return (
    <div className="flex w-full flex-col gap-2 ">
      <span className="flex items-center gap-1 text-sm font-medium">
        {label}{" "}
        {isRequired && <span className="text-sm text-destructive">*</span>}
      </span>
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-md border-2 border-dashed p-2">
          <span className="flex items-center gap-1 text-sm font-medium">
            Start time <span className="text-sm text-destructive">*</span>
          </span>
          <TimePickerDemo
            disabled={fieldConfigItem.inputProps?.disabled}
            date={startDate}
            setDate={setStartDate}
          />
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-md border-2 border-dashed p-2">
          <span className="flex items-center gap-1 text-sm font-medium">
            End time <span className="text-sm text-destructive">*</span>
          </span>
          <TimePickerDemo
            disabled={fieldConfigItem.inputProps?.disabled}
            date={endDate}
            setDate={setEndDate}
          />
        </div>
      </div>

      <span className="text-sm text-gray-500">
        {fieldConfigItem.description}
      </span>
    </div>
  );
};

export const TimeFieldType = ({
  label,
  isRequired,
  field,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) => {
  const MIDNIGHT_DATE: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    0,
    0,
    0,
    0
  );

  const [startDate, setStartDate] = useState<Date | undefined>(
    fieldConfigItem.inputProps?.value
      ? new Date(
          `${new Date().toISOString().slice(0, 10)}T${fieldConfigItem.inputProps?.value}:00`
        )
      : MIDNIGHT_DATE
  );
  useEffect(() => {
    if (startDate) {
      field.onChange(
        `${String(startDate.getHours()).padStart(2, "0")}:${String(startDate.getMinutes()).padStart(2, "0")}`
      );
    }
  }, [startDate]);

  return (
    <div className="flex w-full flex-col gap-2 ">
      <span className="flex items-center gap-1 text-sm font-medium">
        {label}{" "}
        {isRequired && <span className="text-sm text-destructive">*</span>}
      </span>
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-md border-2 border-dashed p-2">
          <span className="flex items-center gap-1 text-sm font-medium">
            {label} <span className="text-sm text-destructive">*</span>
          </span>
          <TimePickerDemo
            disabled={fieldConfigItem.inputProps?.disabled}
            date={startDate}
            setDate={setStartDate}
          />
        </div>
      </div>

      <span className="text-sm text-gray-500">
        {fieldConfigItem.description}
      </span>
    </div>
  );
};
