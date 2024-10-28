import { createContext, useMemo, useState } from "react";

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
  const [state, setState] = useState<State>({
    isOpen: false,
    message: null,
  });

  const value = useMemo<NotificationContextType>(
    () => [state, setState],
    [state]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContextProvider;
