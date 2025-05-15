
import React from 'react';

const CardContainer = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="box-border border-2 border-midnight-blue-800 rounded-lg shadow-lg shadow-midnight-blue-950 overflow-hidden hover:shadow-xl transition-all p-2 m-2">
      {children}
    </div>
  );
};

export  {CardContainer};