import { NavLink } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { BsBarChartFill } from 'react-icons/bs';
import Star from '../../assets/img/star.png';

import './Header.scss';

export const Header = (props) => {
  return (
    <header className="app-header">
      <NavLink
        className="flex align-center justify-center"
        exact
        to="/"
        activeClassName="active-nav"
      >
        <img src={Star} alt="g" />
      </NavLink>

      <ul className="navbar-header">
        <NavLink exact to="/" activeClassName="active-nav">
          <FaHome className="icon start" />
        </NavLink>
        {/* <NavLink exact to="/chart" activeClassName="active-nav">
          <BsBarChartFill className="icon" />
        </NavLink> */}
      </ul>
    </header>
  );
};
