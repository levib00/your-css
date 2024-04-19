import { Link } from 'react-router-dom';
import { SettingsOutlined, HomeOutlined, DataObjectOutlined } from '@mui/icons-material';

function NavBar() {
  return (
    <nav>
      <Link to={'/'} title='Home'><HomeOutlined /></Link>
      <div className='bottom-spacing-nav'>
        <Link to={'/settings'} title='Settings'><SettingsOutlined /></Link>
        <Link to={'/about'} title='About'><DataObjectOutlined /></Link>
      </div>
    </nav>
  );
}

export default NavBar;
