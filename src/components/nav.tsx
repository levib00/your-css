import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <Link to={'/'}><button>Home</button></Link>
      <Link to={'/settings'}><button>Settings</button></Link>
      <Link to={'/about'}><button>About</button></Link>
    </nav>
  );
}

export default NavBar;
