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
    console.log('hello');
  };

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert type={alert.type} msg={alert.msg} />}

        <h3>Grocery Bud</h3>
        <div className='form-control'>
          <input type="text" className='grocery' placeholder='eg. eggs' value={name} onChange={(e) => setName(e.target.value)} />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      <div className='grocery-container'>
        <List />
        <button className='clear-btn'>Clear Items</button>
      </div>
    </section>
  );
}

export default App
