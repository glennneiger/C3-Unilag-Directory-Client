import React from 'react';

const backdrop = (props) => {
   let backdropClass = props.open ? 'backdrop show' : 'backdrop';

  return (
      <div className={backdropClass} onClick={props.removeBackdrop} />
  );
};

export default backdrop;