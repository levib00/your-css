import { Link } from 'react-router-dom';
import { SettingsOutlined, HomeOutlined, DataObjectOutlined } from '@mui/icons-material';

function NavBar() {
  return (
    <nav>
      <Link to={'/'} title='Home'><HomeOutlined /></Link>
      <Link to={'/settings'} title='Settings'><SettingsOutlined /></Link>
      <Link to={'/about'} title='About'><DataObjectOutlined /></Link>
    </nav>
  );
}

export default NavBar;
