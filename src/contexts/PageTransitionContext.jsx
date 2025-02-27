import { createContext, useContext, useState } from "react";

const PageTransitionContext = createContext();

export const PageTransitionProvider = ({ children }) => {
  const [transitionType, setTransitionType] = useState("slide");

  return (
    <PageTransitionContext.Provider value={{ transitionType, setTransitionType }}>
      {children}
    </PageTransitionContext.Provider>
  );
};

// Se corrigió el nombre del contexto
export const useComponentTransition = () => useContext(PageTransitionContext);
