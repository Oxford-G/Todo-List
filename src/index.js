import './css/style.scss';
import { displayNav, displayFooter } from './structure';
import { start } from './start';

const initializer = () => {
  displayNav();
  start();
  displayFooter();
};

initializer();
