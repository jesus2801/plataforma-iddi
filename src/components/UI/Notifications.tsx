import React, { MouseEvent, useState } from 'react';

const Notifications = () => {
  const [state, setState] = useState(false);

  const handleActive = (e: MouseEvent<HTMLImageElement>) => {
    if (state) {
      e.currentTarget.src = '/static/icons/app/bell.png';
      setState(false);
    } else {
      e.currentTarget.src = '/static/icons/app/bell-active.png';
      setState(true);
    }
  };

  return (
    <div>
      <img src="/static/icons/app/bell.png" onClick={handleActive} />
    </div>
  );
};

export default Notifications;
