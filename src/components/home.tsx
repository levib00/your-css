import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Listing from './listing';
import { IStyle, styles } from '../objects/styles';
import { getFromStorage, populateSpecialStyles } from '../scripts/storage-handlers';

const Home = () => {
  const [allStyles, setAllStyles] = useState<IStyle>(styles);
  const [listings, setListings] = useState<React.ReactElement[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isBeingEdited, setIsBeingEdited] = useState<null | number>(null);
  const [searchResults, setSearchResults] = useState({});

  const search = (obj: IStyle, searchQueryString: string) => {
    const keys = Object.getOwnPropertyNames(obj);
    const searchResultsObj: IStyle = {};
    for (let i: number = 0; i < keys.length; i += 1) {
      if (keys[i].toLowerCase().includes(searchQueryString)) {
        searchResultsObj[keys[i]] = obj[keys[i]];
      }
    }
    setSearchResults(searchResultsObj);
    return searchResultsObj;
  };

  useEffect(() => {
    search(allStyles, searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    (async () => {
      setAllStyles(populateSpecialStyles(await getFromStorage(null)));
    })();
  }, [searchQuery]);

  useEffect(() => {
    let stylesArray: any;
    if (searchQuery) {
      stylesArray = Object.entries(searchResults).map((e) => ({ [e[0]]: e[1] }));
    } else {
      stylesArray = Object.entries(allStyles).map((e) => ({ [e[0]]: e[1] }));
    }
    setListings(
      stylesArray.sort((a: any, b: any) => Object.keys(a)[0].localeCompare(Object.keys(b)[0])),
    );
  }, [allStyles, searchResults]);

  return (
    <>
      <label htmlFor="search"></label>
      <input type="text" id='search' placeholder='website' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
      <Link to='/form'><button>+</button></Link>
      <div>
        {
          listings.map((thisStyle, index) => <Listing
          key={Math.random()}
          toggleEditing={() => setIsBeingEdited((s) => (s === index ? null : index))}
          isBeingEdited={isBeingEdited === index} style={ Object.keys(thisStyle)[0] }
          allStyles={ allStyles }
          styles={ Object.values(thisStyle)[0] }
          setAllStyles={setAllStyles} />)
        }
      </div>
    </>
  );
};

export default Home;
