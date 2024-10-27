import { createContext, useState } from "react";

type State = {
  isOpen: boolean;
  message: null | string;
};

type NotificationContextType =
  | [State, React.Dispatch<React.SetStateAction<State>>]
  | undefined;

export const NotificationContext =
  createContext<NotificationContextType>(undefined);

function NotificationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useState<State>({
    isOpen: false,
    message: null,
  });

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContextProvider;
