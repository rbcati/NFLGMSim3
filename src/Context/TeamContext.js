// src/context/TeamContext.js
import React, { createContext, useState } from 'react';

export const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState(JSON.parse(localStorage.getItem('yourTeam') || '[]'));
  const [salaryCap, setSalaryCap] = useState(255000000);

  return (
    <TeamContext.Provider value={{ team, setTeam, salaryCap, setSalaryCap }}>
      {children}
    </TeamContext.Provider>
  );
};
