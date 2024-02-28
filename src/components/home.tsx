import Listing from './listing';
import { styles, IStyle } from '../objects/styles';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Home = () => {

  const [allStyles, setAllStyles] = useState(styles)
  const [listings, setListings] = useState<any>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState({})

  const func = (obj:  IStyle, searchQuery: string) => {
    const op = Object.getOwnPropertyNames(obj)
    const arr: IStyle  = {}
    for ( let i: number = 0; i < op.length; i++) {
      if (op[i].toLowerCase().includes(searchQuery)) {
        arr[op[i]] = obj[op[i]]
      }
    }
    setSearchResults(arr)
    return arr
  }

  useEffect(() => {
    func(allStyles, searchQuery)
  }, [searchQuery])

  useEffect(() => {
      const stylesArray = []
      if (searchQuery) {
        for (let style in searchResults) {
          if (styles.hasOwnProperty(style)) {
            stylesArray.push(
              <Listing key={Math.random()} style={ style } styles={ styles[style] } setAllStyles={setAllStyles} />
            )
          }
        }
      } else {
      for (let style in allStyles) {
        if (styles.hasOwnProperty(style)) {
          stylesArray.push(
            <Listing key={Math.random()} style={ style } styles={ styles[style] } setAllStyles={setAllStyles} />
          )}
        }
      }
      setListings(stylesArray)
  }, [allStyles, searchResults])

  return (
    <>
      <label htmlFor="search"></label>
      <input type="text" id='search' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
      <Link to='/form'><button>+</button></Link>
      <div>
        {listings.map((listing: any) => listing)}
      </div>
    </>
  )
}

export default Home