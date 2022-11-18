import { render, screen } from "@testing-library/react";
import Register from "./Register";
import { BrowserRouter as Router } from "react-router-dom";

describe("Register component", () => {
  test("should have register button", () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    const button = screen.getByRole("button");
    console.log(button.textContent);
    expect(button.textContent).toBe("Register");
  });
});
