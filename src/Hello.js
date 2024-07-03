import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apireq from './apireq';
import './index.css'
function Hello(){
    const API_URL = 'http://localhost:3001/items';
    const [items, setItems] = useState([]);

    const [newItem, setNewItem] = useState("")
    const [search, setSearch] = useState("")
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        const fetchItems = async () => {
            try{
                const response = await fetch(API_URL);
                console.log(response)
                const listItems = await response.json();
                setItems(listItems);
            } catch (err){
                console.log(err.stack)
            } finally{
                setisLoading(false)
            }
        }
        setTimeout(() => {
            (async () => await fetchItems())()
        },2000)
    },[]
)

     const addItem = async(item) => {
         const id = items.length ? items[items.length - 1].id + 1 : 1
         const addNewItem = {id, checked:false, item}
         const listItems = [...items, addNewItem]
         setItems(listItems)

         const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addNewItem)
         }

         const result = await apireq(API_URL,postOptions);
         if (result) throw Error("ERROR");

    }
  
    const handleCheck = async(id) => {
        const listItems = items.map((item) => item.id===id ? {...item, checked: !item.checked} : item)
        setItems(listItems)
        const myItem = listItems.filter((item) => item.id === id);
        const updateOptions = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ checked: myItem[0].checked })
        };
        const reqUrl = `${API_URL}/${id}`;
        const result = await apireq(reqUrl, updateOptions);
        if (result) throw Error("ERROR");
    }
  
    const handleDelete = async(id) => {
        const listItems = items.filter((item) => item.id !==id)
        setItems(listItems)
        const deleteOptions = { method: 'DELETE' };
        const reqUrl = `${API_URL}/${id}`;
        const result = await apireq(reqUrl, deleteOptions);
        if (result) throw Error("ERROR");
    }

     const handleSubmit = (e) => {
         e.preventDefault()
         if (!newItem) return;
         console.log(newItem)
         addItem(newItem)
         setNewItem("")
     }
    return(
        <div className='Hello'>
            <Header title="Bucket List" />
            <AddItem
                newItem = {newItem}
                setNewItem = {setNewItem}
                handleSubmit = {handleSubmit}
            />
            <SearchItem
                search = {search}
                setSearch = {setSearch}
             /> 
            <div>
                {isLoading && <p>Loading Items...</p>}
                { !isLoading && <Content
                    //items = {items}
                    items = {items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
                    handleCheck = {handleCheck}
                    handleDelete = {handleDelete}
                />}
            </div>
            <Footer 
                lengthh = {items.length}
            />
        </div>

);
}
export default Hello;