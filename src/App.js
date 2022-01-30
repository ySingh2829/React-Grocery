import Header from './Components/Header';
import './App.css';
import { useEffect, useState } from 'react';
import AddItem from './Components/AddItem';
import Content from './Components/Content';
import Footer from './Components/Footer';
import SearchItems from './Components/SearchItems';


function App() {
  const API_URL = 'http://localhost:3500/items';
  const [item, setItem] = useState({});
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const responseData = await response.json();
          setFetchError(null);
          return setItems(responseData);
        }
        throw new Error("Did not recieve data.");
      } catch (err) {
        setFetchError(err.message)
      } finally {
        setIsLoading(false);
      }
    }

    const timeoutId = setTimeout(() => fetchData(), 2000)

    return () => {
      clearTimeout(timeoutId);
    }

  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    console.log(value)

    setItem(prev => ({
      ...prev,
      [name]: value.charAt(0).toUpperCase() + value.slice(1),
      id: Date.now(),
      isChecked: false
    }));
  }

  const handleSubmit = e => {
    e.preventDefault();
    
    if (!item.item || !item.num) return;

    setItems(prev => ([item, ...prev]));
    setItem({});
  }

  const handleCheck = (targetId) => {
    const listOfItems = items.map(item => item.id === targetId ? {...item, isChecked: !item.isChecked} : item);

    setItems(listOfItems);
  }

  const handleDelete = (targetRemoveId) => {
    const listOfItems = items.filter(item => item.id !== targetRemoveId);

    setItems(listOfItems);
  }

  return (
    <div className="App">
      <Header />
      <AddItem 
        item={item} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit}
      />
      <SearchItems
        search={search}
        handleSearch={setSearch}
      />
      <main>
        {isLoading && <p style={{textAlign: "center", fontSize: "1.4rem"}}>Loading list...</p>}
        {fetchError && <h3 style={{textAlign: "center", color: "red", marginTop: "50px"}}>Error: {fetchError}</h3>}
        {!fetchError && !isLoading && (
          <Content 
            items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
            search={search}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer 
        items={items}
      />
    </div>
  );
}

export default App;
