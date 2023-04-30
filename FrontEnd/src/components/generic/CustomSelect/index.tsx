"use client";
import { Select, Option } from "@material-tailwind/react";
import React, { Ref, useState } from "react";

function CustomSelect({
  setType,
  showAll,
  label,
  type,
}: {
  setType: (x: string) => void;
  showAll: boolean;
  label: string;
  type?: string;
}) {
  const options = [
    {
      value: "all",
      name: "All",
    },
    {
      value: "apartment",
      name: "Apartment",
    },
    {
      value: "villa",
      name: "Villa",
    },
    {
      value: "farmhouse",
      name: "Farmhouse",
    },
    {
      value: "condos",
      name: "Condos",
    },
    {
      value: "townhouse",
      name: "Townhouse",
    },
    {
      value: "duplex",
      name: "Duplex",
    },
    {
      value: "studio",
      name: "Studio",
    },
    {
      value: "chalet",
      name: "Chalet",
    },
  ];

  if (!showAll) options.shift();

  return (
    <div className="flex flex-col w-full gap-6 h-[38px]">
      <Select
        label={label}
        variant="outlined"
        color="indigo"
        size="md"
        value={type ? type : undefined}
        onChange={() => {}}
      >
        {options.map(({ value, name }, i) => {
          return (
            <Option key={i} onClick={() => setType(value)} value={value}>
              {name}
            </Option>
          );
        })}
      </Select>
    </div>
  );
}

export default CustomSelect;
