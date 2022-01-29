import Header from './Components/Header';
import './App.css';
import { useEffect, useState } from 'react';
import AddItem from './Components/AddItem';
import Content from './Components/Content';
import Footer from './Components/Footer';
import SearchItems from './Components/SearchItems';


function isSaved(key, initalValue = []) {
  const savedValue = JSON.parse(localStorage.getItem(key));

  if (!savedValue) return initalValue;
  return savedValue;
}

function App() {
  const [item, setItem] = useState({});
  const [itemList, setItemList] = useState(() => { return isSaved('shoppingList') });

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(itemList));
  }, [itemList]);

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

    setItemList(prev => ([item, ...prev]));
    setItem({});
  }

  const handleCheck = (targetId) => {
    const listOfItems = itemList.map(item => item.id === targetId ? {...item, isChecked: !item.isChecked} : item);

    setItemList(listOfItems);
  }

  const handleDelete = (targetRemoveId) => {
    const listOfItems = itemList.filter(item => item.id !== targetRemoveId);

    setItemList(listOfItems);
  }

  const handleSearch = ({ target }) => {
    // const { value } = target;
  }

  return (
    <div className="App">
      <Header />
      <SearchItems
        handleSearch={handleSearch}
      />
      <AddItem item={item} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit}
      />
      <Content items={itemList}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer items={itemList}/>
    </div>
  );
}

export default App;
