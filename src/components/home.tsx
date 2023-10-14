import Listing from '../components/listing.js'
import { styles } from '../../public/scripts/your-css.js'

const Home = () => {

  const passStyles = () => {
    for (let style in styles) {
      if (styles.hasOwnProperty(style)) {
        return (
          <>
            <Listing style={ style } styles={ styles }/>
          </>
        )
      }
    }
  }

  return (
    <>
      <div>
        {passStyles()}
      </div>
    </>
  )
}

export default Home