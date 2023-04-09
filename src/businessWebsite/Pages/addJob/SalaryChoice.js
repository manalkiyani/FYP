import React, { useState } from "react";
import { NumberInput, Flex, Select } from "@mantine/core";
const SalaryChoice = ({ option, classes }) => {
  switch (option) {
    case "Range":
      return (
        <Flex justify="center">
          <NumberInput
            style={{ width: "500px" }}
            mt="md"
            classNames={classes}
            label="Minimum Amount"
            step={1000}
          />
          <NumberInput
            style={{ width: "500px" }}
            mt="md"
            classNames={classes}
            label="Maximum Amount"
            step={1000}
          />
          <Select
            mt="md"
            data={["per year", "per month", "per day", "per hour"]}
            placeholder="Pick one"
            classNames={classes}
            required
          />
        </Flex>
      );
    case "Starting amount":
      return (
        <NumberInput
          style={{ width: "500px" }}
          mt="md"
          classNames={classes}
          label="Starting Amount"
          step={1000}
        />
      );
    case "Maximum amount":
      return (
        <NumberInput
          style={{ width: "500px" }}
          mt="md"
          classNames={classes}
          label="Maximum Amount"
          step={1000}
        />
      );
    case "Exact amount":
      return (
        <NumberInput
          style={{ width: "500px" }}
          mt="md"
          classNames={classes}
          label="Exact Amount"
          step={1000}
        />
      );
    default:
      return null;
  }
};

export default SalaryChoice;
