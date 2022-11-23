import { render, screen, act } from "@testing-library/react";
import Register from "./Register";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from '@testing-library/user-event';
describe("Register component", () => {
    it("should have register button", () => {
        render(React.createElement(Router, null,
            React.createElement(Register, null)));
        const button = screen.getByRole("button");
        expect(button.textContent).toBe("Register");
    });
    /*
      it("should register new user with test input", async () => {
      const setUser = jest.fn();
      const credentials = {username: "test123", password: "12345678", country: "Poland" };
      await userEvent.type('input[name="password"]', credentials.password);
      await userEvent.type('input[name="username"]', credentials.username);
      await userEvent.type('input[name="country"]', credentials.country);
      const submitBtn = screen.getByRole('button', {name: /Register/i});
      await userEvent.click(submitBtn);
      
      expect(setUser).toHaveBeenCalledWith(credentials)
      })*/
});
/*
jest.mock('../../utilities/authApiService.tsx', () => ({
register: () => ({username: "test123", password: "12345678", country: "Poland" })
}));


  it("should call register with the correct credentials", async () => {
    const setUser = jest.fn();
    const credentials = {username: "test123", password: "12345678", country: "Poland" };
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {render (<Router><Register setUser={setUser} /></Router>)});

    const usernameInput =  screen.getByLabelText("Username");
    const passwordInput =  screen.getByLabelText("Password");
    const passwordConfInput =  screen.getByLabelText("Password Confirmation");
    const countryInput =  screen.getByLabelText("Country");
    const submitBtn = screen.getByRole('button', {name: /Register/i});

    userEvent.type(usernameInput, "test123");
    userEvent.type(passwordInput, "12345678");
    userEvent.type(passwordConfInput, "12345678");
    userEvent.type(countryInput, "Poland");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act( async() => {
    await userEvent.click(submitBtn)});

    expect(setUser).toHaveBeenCalledWith(credentials);
  })
  */ 
//# sourceMappingURL=Register.test.js.map