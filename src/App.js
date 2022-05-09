import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState('');
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // setAlert({ show: true, msg: 'Please enter a name', type: 'danger' });
      showAlert(true, 'danger', 'Please enter a name');
      return;
    }else if(name && isEditing) {
        //deal with edit
      setList(list.map(item => {
          if (item.id === editId) {
            item.title = name;
          }
          return item;
        }
      ));
      setIsEditing(false);
      setEditId('');
      setName('');
      showAlert(true, 'success', 'Item updated');

    }else{
      //show alert
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      showAlert(true, 'success', 'Successfully added')
      // setAlert({ show: true, msg: 'Item added', type: 'success' });
      setName('');
    }
  };

  const showAlert = (show=false, type='', msg='') => {
    setAlert({ show, msg, type });
  }

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    showAlert(true, 'danger', 'Successfully deleted');
    // setAlert({ show: true, msg: 'Item deleted', type: 'success' });
  }

  const clearList = () => {
    setList([]);
    showAlert(true, 'danger', 'List cleared');
  }

  const editItem = (id) => {
    const findItem = list.find((item) => item.id === id);
    if (findItem) {
      setIsEditing(true);
      setEditId(findItem.id);
      setName(findItem.title);

      // showAlert(true, 'success', 'Successfully edited');
    } else {
      showAlert(true, 'danger', 'Item not found');
    }
  }

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>Grocery Bud</h3>
        <div className='form-control'>
          <input
            type="text"
            className='grocery'
            placeholder='eg. eggs'
            value={name} onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>

      {
        list.length > 0 &&
        (
          <div className='grocery-container'>
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button className='clear-btn' onClick={clearList}>Clear Items</button>
          </div>
        )
      }

    </section>
  );
}

export default App
