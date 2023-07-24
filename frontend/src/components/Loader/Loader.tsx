import React from 'react'
import style from './Loader.module.scss';
const Loader = () => {
  return (
    <div className={style.main}>
      <div className={style.ldsring}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

export default Loader