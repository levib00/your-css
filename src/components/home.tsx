import Listing from './listing';
import { styles } from '../objects/styles';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Home = () => {

  const [allStyles, setAllStyles] = useState(styles)
  const [listings, setListings] = useState<any>([])

  useEffect(() => {
      const stylesArray = []
      for (let style in allStyles) {
        if (styles.hasOwnProperty(style)) {
          stylesArray.push(
            <Listing key={Math.random()} style={ style } styles={ styles } setAllStyles={setAllStyles} />
          )
        }
      }
      setListings(stylesArray)
  }, [allStyles])

  return (
    <>
      <label htmlFor="search"></label>
      <input type="text" id='search' />
      <Link to='/form'><button>+</button></Link>
      <div>
        {listings.map((listing: any) => listing)}
      </div>
    </>
  )
}

export default Home