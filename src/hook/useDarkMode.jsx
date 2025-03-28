import { useEffect } from "react";

const useDarkMode = () => {
  // Desativo modo oscuro por el momento
  const enableDarkMode = false;
  
  useEffect(() => {
    if (!enableDarkMode) return; 
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
       // Desativo modo oscuro por el momento
     

      if (mediaQuery.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    applyTheme();
    mediaQuery.addEventListener("change", applyTheme);

    return () => mediaQuery.removeEventListener("change", applyTheme);
  }, []);
};

export default useDarkMode;
