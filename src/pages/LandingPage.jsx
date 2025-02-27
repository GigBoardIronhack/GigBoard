
const LandingPage = () => {

  return (
    
    <div className=" container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
      <h1>Modo Automático</h1>
      <p>Este texto cambiará de color según el tema del sistema.</p>
    </div>
    <div className="bg-red-500 rounded hover:bg-black transition-all  text-white p-4 text-1xl sm:text-3xl lg:text-4xl">
      ¡Si esto es rojo, Tailwind funciona! 🎉
    </div>
    <div className="bg-blue-500 rounded text-white p-4 text-2xl sm:text-4xl lg:text-5xl">
      ¡Si esto es azul, Tailwind funciona! 🎉
    </div>
    <div className="hidden sm:block">Solo en tablet o más grande</div>
    <div className="block sm:hidden">Solo en móviles</div>
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white flex items-center justify-center">
      <h1 className="text-3xl">🌗 Modo Oscuro/Claro en Tailwind</h1>
    </div>
    <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    
        <h1>Modo Automático</h1>
        <p>Este texto cambiará de color según el tema del sistema.</p>
    
  </div>
    </div>


  )
}

export default LandingPage