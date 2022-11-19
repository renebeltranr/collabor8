import { render, screen } from "@testing-library/react";
import Register from "./Register";
import { BrowserRouter as Router } from "react-router-dom";
describe("Register component", () => {
    test("should have register button", () => {
        render(React.createElement(Router, null,
            React.createElement(Register, null)));
        const button = screen.getByRole("button");
        console.log(button.textContent);
        expect(button.textContent).toBe("Register");
    });
});
//# sourceMappingURL=Register.test.js.map