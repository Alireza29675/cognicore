import { createContext, useContext } from "react";

const configContext = createContext<IConfigContext>({} as IConfigContext);

export const Provider = configContext.Provider;
export const useConfig = () => useContext(configContext);

export default configContext;