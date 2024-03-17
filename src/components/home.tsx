import Listing from './listing';
import { IStyle, styles } from '../objects/styles';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFromStorage, populateSpecialStyles } from '../scripts/storage-handlers';

const Home = () => {

  const [allStyles, setAllStyles] = useState<IStyle>(styles)
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
    (async() => {
      setAllStyles(populateSpecialStyles(await getFromStorage(null)))
    })()
  }, [searchQuery])

  useEffect(() => {
      const stylesArray = []
      if (searchQuery) {
        for (let style in searchResults) {
          if (allStyles.hasOwnProperty(style)) {
            stylesArray.push(
              <Listing key={Math.random()} style={ style } styles={ allStyles[style] } setAllStyles={setAllStyles} />
            )
          }
        }
      } else {
      for (let style in allStyles) {
        if (allStyles.hasOwnProperty(style)) {
          stylesArray.push(
            <Listing key={Math.random()} style={ style } styles={allStyles[style] } setAllStyles={setAllStyles} />
          )}
        }
      }
      setListings(stylesArray.sort((a, b) => a.props.style.localeCompare(b.props.style)))
  }, [allStyles, searchResults])

  return (
    <>
      <label htmlFor="search"></label>
      <input type="text" id='search' placeholder='website' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
      <Link to='/form'><button>+</button></Link>
      <div>
        {listings.map((listing: React.ReactElement) => listing)}
      </div>
    </>
  )
}

export default Home