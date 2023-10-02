/* eslint-disable import/order */
import m1 from './1m.svg';
import m2 from './2m.svg';
import m3 from './3m.svg';
import m4 from './4m.svg';
import m5 from './5m.svg';
import m6 from './6m.svg';
import m7 from './7m.svg';
import m8 from './8m.svg';
import m9 from './9m.svg';
import p1 from './1p.svg';
import p2 from './2p.svg';
import p3 from './3p.svg';
import p4 from './4p.svg';
import p5 from './5p.svg';
import p6 from './6p.svg';
import p7 from './7p.svg';
import p8 from './8p.svg';
import p9 from './9p.svg';
import s1 from './1s.svg';
import s2 from './2s.svg';
import s3 from './3s.svg';
import s4 from './4s.svg';
import s5 from './5s.svg';
import s6 from './6s.svg';
import s7 from './7s.svg';
import s8 from './8s.svg';
import s9 from './9s.svg';
import z1 from './1z.svg';
import z2 from './2z.svg';
import z3 from './3z.svg';
import z4 from './4z.svg';
import z5 from './5z.svg';
import z6 from './6z.svg';
import z7 from './7z.svg';

const tileImage = (tile: String) => {
  switch (tile) {
    case '1p':
      return p1;
    case '2p':
      return p2;
    case '3p':
      return p3;
    case '4p':
      return p4;
    case '5p':
      return p5;
    case '6p':
      return p6;
    case '7p':
      return p7;
    case '8p':
      return p8;
    case '9p':
      return p9;
    case '1s':
      return s1;
    case '2s':
      return s2;
    case '3s':
      return s3;
    case '4s':
      return s4;
    case '5s':
      return s5;
    case '6s':
      return s6;
    case '7s':
      return s7;
    case '8s':
      return s8;
    case '9s':
      return s9;
    case '1m':
      return m1;
    case '2m':
      return m2;
    case '3m':
      return m3;
    case '4m':
      return m4;
    case '5m':
      return m5;
    case '6m':
      return m6;
    case '7m':
      return m7;
    case '8m':
      return m8;
    case '9m':
      return m9;
    case '1z':
      return z1;
    case '2z':
      return z2;
    case '3z':
      return z3;
    case '4z':
      return z4;
    case '5z':
      return z5;
    case '6z':
      return z6;
    case '7z':
      return z7;
  }
};

export default tileImage;