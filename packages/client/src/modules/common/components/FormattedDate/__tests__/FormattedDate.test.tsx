import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import FormattedDate from "../FormattedDate";

describe("<FormatteDate />", () => {
  it("should show the correct date with padding", () => {
    const testingDate = new Date("1993-10-5");
    const { getByText } = render(<FormattedDate date={testingDate} />);
    const renderedDate = getByText("05.10.1993");

    expect(renderedDate).toBeInTheDocument();
    expect(renderedDate).toBeVisible();
  });
});
