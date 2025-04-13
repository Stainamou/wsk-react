import { Link, Outlet } from "react-router-dom";

const Layout = () => (
  <div>
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/upload">Upload</Link>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <Outlet /> {}
    </main>
    <footer>

    </footer>
  </div>
);

export default Layout;
