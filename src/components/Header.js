import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div class="nowrap orange">

      <div className="flex flex-fixed black">
        <Link to="/" className="no-underline black">
          <div className="fw7 mr1">Hacker</div>
        </Link>
        <Link to="/" className="ml1 no-underline black">
          List
        </Link>
        <div className="ml1">|</div>
        <Link
          to="/create"
          className="ml1 no-underline black"
        >
          submit
        </Link>
      </div>
    </div>
  );
};

export default Header;