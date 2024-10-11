import { useState, useEffect } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <Checkbox.Root 
      checked={isDarkMode} 
      onCheckedChange={toggleDarkMode} 
      className="flex items-center cursor-pointer"
    >
      <div className={`w-8 h-4 rounded-full flex items-center p-1 transition duration-300 ease-in-out ${isDarkMode ? 'bg-gray-900' : 'bg-gray-400'}`}>
        <div className={`w-4 h-4 rounded-full shadow transition-transform duration-300 ease-in-out ${isDarkMode ? 'translate-x-4 bg-gray-200' : 'bg-white'}`} />
      </div>
      <span className="ml-2 text-sm">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
    </Checkbox.Root>
  );
};

export default DarkModeToggle;

