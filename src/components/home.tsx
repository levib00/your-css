import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AddOutlined } from '@mui/icons-material';
import Listing from './listing';
import { IStyle } from '../objects/styles';
import { getFromStorage, populateSpecialStyles } from '../scripts/storage-handlers';

interface IDomainStyle {
  [key:string]: {
    isActive?: boolean
    css?: string
    undeleteable?: boolean
    displayName?: string
  }
}

const Home = () => {
  const [allStyles, setAllStyles] = useState<IStyle | undefined>();
  const [listings, setListings] = useState<IDomainStyle[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isBeingEdited, setIsBeingEdited] = useState<null | number>(null);
  const [modalIsShowing, setModalIsShowing] = useState<null | number>(null);
  const [searchResults, setSearchResults] = useState<IStyle | undefined>();

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
    if (allStyles) {
      search(allStyles, searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    (async () => {
      const storageStyles = await getFromStorage(null) || {};
      setAllStyles(populateSpecialStyles(await storageStyles));
    })();
  }, [searchQuery]);

  useEffect(() => {
    let stylesArray: Array<{ [x:string]: IDomainStyle }> = [];
    const shownListings = searchResults || allStyles;
    if (shownListings) {
      stylesArray = Object.entries(shownListings).map(
        (e: [string, any]) => ({ [e[0]]: e[1] }),
      );
    }
    setListings(
      stylesArray.sort((a, b) => Object.keys(a)[0].localeCompare(Object.keys(b)[0])),
    );
  }, [allStyles, searchResults]);

  return (
    <>
      <search>
        <label htmlFor='search'></label>
        <input
          type='text'
          id='search'
          placeholder='website'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </search>
      <Link to='/form' title='Add a new style'><button><AddOutlined /></button></Link>
      <section className='listings'>
        {
          listings.map((thisStyle, index) => <Listing
          key={Math.random()}
          toggleEditing={() => setIsBeingEdited((s) => (s === index ? null : index))}
          toggleModal={() => setModalIsShowing((s) => (s === index ? null : index))}
          isBeingEdited={isBeingEdited === index}
          modalIsShowing={modalIsShowing === index}
          domainName={ Object.keys(thisStyle)[0] }
          allStyles={ allStyles }
          styleInfo={ Object.values(thisStyle)[0] }
          setAllStyles={setAllStyles} />)
        }
      </section>
    </>
  );
};

export default Home;
