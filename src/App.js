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
      console.log('edit');

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

  const callDelete = (id) => {

    setList(list.filter((item) => item.id !== id));
    // setAlert({ show: true, msg: 'Item deleted', type: 'success' });

  }

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}

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
            <List items={list} callDelete={callDelete} />
            <button className='clear-btn'>Clear Items</button>
          </div>
        )
      }

    </section>
  );
}

export default App
