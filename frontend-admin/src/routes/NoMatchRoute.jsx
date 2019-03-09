import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div>
    You're lost, 404
    <ul>
      <li>
        <Link to="/trips">Go to Trips</Link>
      </li>
      <li>
        <Link to="/trips/create">Create Them</Link>
      </li>
      <li>
        <Link to="/login">Or Sign In</Link>
      </li>
      <li>
        <Link to="/table">table</Link>
      </li>
    </ul>
  </div>
);
