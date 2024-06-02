import { Link } from 'react-router-dom';
import { SettingsOutlined, HomeOutlined, DataObjectOutlined } from '@mui/icons-material';
const NavBar = () => {
  return (
    <nav>
      <ul>
        <li> <Link to={'/'} title='Home'><HomeOutlined /></Link> </li>
        <div className='bottom-spacing-nav'>
          <li> <Link to={'/settings'} title='Settings'><SettingsOutlined /></Link> </li>
          <li> <Link to={'/about'} title='About'><DataObjectOutlined /></Link> </li>
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
