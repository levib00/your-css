import Listing from './listing';
import { styles, IStyle } from '../objects/styles';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Home = () => {

  const [allStyles, setAllStyles] = useState(styles)
  const [listings, setListings] = useState<React.ReactElement[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState({})

  const search = (obj:  IStyle, searchQuery: string) => {
    const keys = Object.getOwnPropertyNames(obj)
    const searchResultsObj: IStyle  = {}
    for ( let i: number = 0; i < keys.length; i++) {
      if (keys[i].toLowerCase().includes(searchQuery)) {
        searchResultsObj[keys[i]] = obj[keys[i]]
      }
    }
    setSearchResults(searchResultsObj)
    return searchResultsObj
  }

  useEffect(() => {
    search(allStyles, searchQuery)
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
        {listings.map((listing: React.ReactElement) => listing)}
      </div>
    </>
  )
}

export default Home