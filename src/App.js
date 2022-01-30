import Header from './Components/Header';
import './App.css';
import { useEffect, useState } from 'react';
import AddItem from './Components/AddItem';
import Content from './Components/Content';
import Footer from './Components/Footer';
import SearchItems from './Components/SearchItems';
import apiRequest from './Components/apiRequest';


function App() {
  const API_URL = 'http://localhost:3500/items';
  const [newItem, setNewItem] = useState({});
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

    
    setNewItem(prev => ({
      ...prev,
      [name]: (name !== 'num') ? value.charAt(0).toUpperCase() + value.slice(1) : Number(value),
      id: Date.now(),
      isChecked: false
    }));
  }
  console.log(newItem)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newItem.item || !newItem.num) return;

    setItems(prev => ([newItem, ...prev]));
    setNewItem({});

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    }

    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  }

  const handleCheck = async (id) => {
    const listOfItems = items.map(item => item.id === id ? {...item, isChecked: !item.isChecked} : item);

    setItems(listOfItems);

    const updateItem = listOfItems.filter(item => item.id === id);

    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({isChecked: updateItem[0].isChecked})
    }

    const reqUrl = `${API_URL}/${id}`;

    const result = await apiRequest(reqUrl, updateOptions);

    if (result) setFetchError(result);
  }

  const handleDelete = async (id) => {
    const listOfItems = items.filter(item => item.id !== id);

    setItems(listOfItems);

    const deleteOptions = {method: 'DELETE'};
    const reqUrl = `${API_URL}/${id}`;

    const result = await apiRequest(reqUrl, deleteOptions);

    if (result) setFetchError(result);
  }

  return (
    <div className="App">
      <Header />
      <AddItem 
        item={newItem} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit}
      />
      <SearchItems
        search={search}
        handleSearch={setSearch}
      />
      <main>
        {isLoading && <p style={{textAlign: "center", fontSize: "1.4rem", marginTop: "50px"}}>Loading list...</p>}
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
