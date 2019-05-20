import Diagrams from './components/Diagrams'
import Home from "./components/Home";
import Search from "./components/Search";

export const routes = [
  {path : '/diagrams', name : 'diagram', components : {
      default: Diagrams,
    }},
  {path : '/home', name : 'home', components : {
      default: Home,
    }},
  {path : '/search', name : 'search', components : {
      default: Search,
    }},
  {path : '', redirect : '/home'},
  {path : '*', redirect: {name : '/home'}}
];
