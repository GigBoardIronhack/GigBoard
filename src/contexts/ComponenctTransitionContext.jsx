import { createContext, useContext, useState } from "react";

const ComponentTransitionContext = createContext(); // ✅ Nombre corregido

export const ComponentTransitionProvider = ({ children }) => {
  const [transitionType, setTransitionType] = useState("slide");

  return (
    <ComponentTransitionContext.Provider value={{ transitionType, setTransitionType }}>
      {children}
    </ComponentTransitionContext.Provider>
  );
};

// ✅ Aquí también corrigimos el nombre del contexto
export const useComponentTransition = () => useContext(ComponentTransitionContext);
