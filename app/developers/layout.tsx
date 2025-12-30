import React from 'react'

const layout = () => {
  return (
    <div>
      
    </div>
  );
};

export default function DevelopersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h2> Developer Profiles</h2>
      <hr />
      {children}
    </div>
  );
}
