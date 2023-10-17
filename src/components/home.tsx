import Listing from './listing'
import { styles } from '../objects/styles'
import { Link } from 'react-router-dom'

const Home = () => {

  const passStyles = () => {
    const stylesArray = []
    for (let style in styles) {
      if (styles.hasOwnProperty(style)) {
        stylesArray.push(
          <Listing key={Math.random()} style={ style } styles={ styles }/>
        )
      }
    }
    return stylesArray
  }

  return (
    <>
      <label htmlFor="search"></label>
      <input type="text" id='search' />
      <Link to='/form'><button>+</button></Link>
      <div>
        {passStyles().map(listing => listing)}
      </div>
    </>
  )
}

export default Home