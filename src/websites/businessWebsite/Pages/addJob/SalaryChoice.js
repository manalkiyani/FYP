import React, { useState } from "react";
import { NumberInput, Flex, Select } from "@mantine/core";
const SalaryChoice = ({
  option,
  classes,
  startingAmount,
  setStartingAmount,
  exactAmount,
  setExactAmount,
  maximumAmount,
  setMaximumAmount,
  minRange,
  setMinRange,
  maxRange,
  setMaxRange,

  setSalaryPeriod,
}) => {
  switch (option) {
    case "Range":
      return (
        <Flex justify="center">
          <NumberInput
            value={minRange}
            style={{ width: "500px" }}
            mt="md"
            classNames={classes}
            label="Minimum Amount"
            step={1000}
            onChange={setMinRange}
          />

          <NumberInput
            value={maxRange}
            style={{ width: "500px" }}
            mt="md"
            classNames={classes}
            label="Maximum Amount"
            step={1000}
            onChange={setMaxRange}
          />
          {/* <Select
            mt="md"
            data={["per year", "per month", "per day", "per hour"]}
            placeholder="Pick one"
            label = "Salary Period"
            classNames={classes}
            required
            onChange={setSalaryPeriod}
          /> */}
        </Flex>
      );
    case "Starting amount":
      return (
        <NumberInput
          value={startingAmount}
          style={{ width: "500px" }}
          mt="md"
          classNames={classes}
          label="Starting Amount"
          step={1000}
          onChange={setStartingAmount}
        />
      );
    case "Maximum amount":
      return (
        <NumberInput
          value={maximumAmount}
          style={{ width: "500px" }}
          mt="md"
          classNames={classes}
          label="Maximum Amount"
          step={1000}
          onChange={setMaximumAmount}
        />
      );
    case "Exact amount":
      return (
        <NumberInput
          value={exactAmount}
          style={{ width: "500px" }}
          mt="md"
          classNames={classes}
          label="Exact Amount"
          step={1000}
          onChange={setExactAmount}
        />
      );
    default:
      return null;
  }
};

export default SalaryChoice;
