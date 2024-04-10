import React from 'react';
import style from './App.module.scss';
import Bloco from '../components/bloco';

export default function App() {
  return (
    <div className={style.AppStyle}>
      <Bloco v1={[1,2,68,14]} v2 ={[1]} v3={[2]} v4={[9]} />
    </div>
  );
}

