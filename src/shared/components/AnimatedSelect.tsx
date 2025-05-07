import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export type OptionType = {
  value: string;
  label: string;
};

type PropsType = {
  options: OptionType[];
  defaultValues?: OptionType[];
  handleChangeFunction: (selected: OptionType[] | null) => void;
};

export const AnimatedSelect: React.FC<PropsType> = ({
  options,
  handleChangeFunction,
  defaultValues,
}) => {
  return (
    <div className="bg-white dark:bg-neutral-950 p-4 rounded-xl text-sm">
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={defaultValues}
        isMulti
        options={options}
        onChange={handleChangeFunction}
        classNamePrefix="react-select"
        styles={{
          control: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#f9fafb" : "#ffffff",
            borderColor: state.isFocused ? "#cbd5e1" : "#e2e8f0",
            boxShadow: "none",
            minHeight: "40px",
            fontSize: "0.875rem",
            "@media (prefers-color-scheme: dark)": {
              backgroundColor: "#0f0f0f",
              borderColor: "#1f2937",
              color: "#f3f4f6",
            },
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: "#ffffff",
            borderRadius: "0.5rem",
            overflow: "hidden",
            "@media (prefers-color-scheme: dark)": {
              backgroundColor: "#1f1f1f",
            },
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
              ? "#e5e7eb"
              : state.isFocused
              ? "#f1f5f9"
              : "transparent",
            color: "#111827",
            "@media (prefers-color-scheme: dark)": {
              backgroundColor: state.isSelected
                ? "#374151"
                : state.isFocused
                ? "#4b5563"
                : "transparent",
              color: "#f9fafb",
            },
          }),
          multiValue: (provided) => ({
            ...provided,
            backgroundColor: "#e5e7eb",
            "@media (prefers-color-scheme: dark)": {
              backgroundColor: "#374151",
            },
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            color: "#1f2937",
            "@media (prefers-color-scheme: dark)": {
              color: "#f3f4f6",
            },
          }),
          multiValueRemove: (provided) => ({
            ...provided,
            color: "#6b7280",
            ":hover": {
              backgroundColor: "#ef4444",
              color: "#ffffff",
            },
            "@media (prefers-color-scheme: dark)": {
              color: "#9ca3af",
              ":hover": {
                backgroundColor: "#ef4444",
                color: "#ffffff",
              },
            },
          }),
          input: (provided) => ({
            ...provided,
            color: "#1f2937",
            "@media (prefers-color-scheme: dark)": {
              color: "#f3f4f6",
            },
          }),
          placeholder: (provided) => ({
            ...provided,
            color: "#9ca3af",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "#111827",
            "@media (prefers-color-scheme: dark)": {
              color: "#f3f4f6",
            },
          }),
        }}
      />
    </div>
  );
};
