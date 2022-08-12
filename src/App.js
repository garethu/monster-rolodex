import { useState, useEffect } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

const App = () => {

  const [searchField, setSearchField] = useState(''); 
  const [monsters, setMonsters] = useState([]); 
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  console.log('render'); 

  useEffect( () => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => setMonsters(users));

    console.log("useEffect fire")
  }, []);

  useEffect( () => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);

    console.log("effect is firing")
  },[monsters, searchField]
  )

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  

  return (
    <div className="App">
    <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox onChangeHandler={onSearchChange} placeholder="Search monsters" className="monster-search-box"/>
      <CardList monsters={filteredMonsters} /> 
    </div>
  );

}

export default App;
