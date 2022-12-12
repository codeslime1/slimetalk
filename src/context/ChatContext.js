import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    friend: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_CHAT":
        return {
          chatId:
            user.uid > action.payload.uid
              ? user.uid + action.payload.uid
              : action.payload.uid + user.uid,
          friend: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
