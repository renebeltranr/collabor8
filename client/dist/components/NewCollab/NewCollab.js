var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState } from "react";
import collabApiService from "../../utilities/collabApiService";
import { GlobalContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./NewCollab.css";
function NewCollab() {
    const navigate = useNavigate();
    const initialState = {
        name: "",
        URL: "",
    };
    const [state, setState] = useState(initialState);
    const ctx = React.useContext(GlobalContext);
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("name", name);
        console.log("value", value);
        setState((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const cb = {
            name: state.name,
            tracks: [state.URL],
        };
        const res = yield collabApiService.newCollab(cb);
        console.log('het');
        if (res.status === 400) {
            const errorResponse = res;
            alert(`${errorResponse.message}`);
            setState(initialState);
        }
        else {
            console.log("collab created successfully: ", cb);
            navigate(`/profile/${ctx.username}`);
        }
    });
    const validateForm = () => {
        return !state.name || !state.URL;
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "newCollab" },
            React.createElement("form", { className: "newCollabForm", onSubmit: handleSubmit },
                React.createElement("h3", null, "Create your New Collab"),
                React.createElement("div", { className: "newCollabName" },
                    React.createElement("h5", null, "Pick a cool Collab name. Other users will see it!"),
                    React.createElement("input", { className: "default-input", type: "text", placeholder: "Cool Collab Name", name: "name", value: state.name, onChange: handleChange })),
                React.createElement("div", { className: "newCollabVid" },
                    React.createElement("h5", null,
                        "Paste the code you find in a Youtube's video URL that will serve as a base track for your Collab. Example:",
                        " ",
                        React.createElement("p", null,
                            "https://www.youtube.com/watch?v=",
                            React.createElement("span", { className: "highlighted" }, "OS8taasZl8k"))),
                    React.createElement("input", { className: "default-input", type: "text", placeholder: "Youtube Video CODE", name: "URL", value: state.URL, onChange: handleChange }),
                    React.createElement("h5", null, "Once you see your Youtube Video embeded on the player, you're ready to create it!")),
                React.createElement("button", { className: "default-btn", type: "submit", disabled: validateForm() }, "\u00A0Create\u00A0")),
            React.createElement("div", { className: "videoDiv" },
                React.createElement("iframe", { title: "test", width: "190", height: "110", src: "https://www.youtube-nocookie.com/embed/" + state.URL })))));
}
export default NewCollab;
//# sourceMappingURL=NewCollab.js.map