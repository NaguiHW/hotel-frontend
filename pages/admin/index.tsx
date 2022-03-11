import { useEffect, useState } from "react";
import axios from '../../functions/axios';
import { AiFillEdit } from 'react-icons/ai';
import { RiDeleteBin5Line } from 'react-icons/ri';
import Modal from "../../components/Modal";

interface Hotel {
  id: number;
  name: string;
  category: number;
  price: number;
  photos: string;
}

const Admin = () => {
  const [hotels, setHotels] = useState<Hotel[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<"create"|"update">("create");
  const [form, setForm] = useState({
    id: 0,
    name: '',
    category: '',
    price: '',
    photos: '',
  });

  const [updateForm, setUpdateForm] = useState<{}>({});

  const getHotels = async () => {
    try {
      setLoading(true);
      const response = await axios({
        method: 'get',
        url: '/hotel'
      });

      setHotels(response.data);
      setLoading(false);
    } catch (error) {
      setHotels([]);
      console.error(error);
      setLoading(false);
    }
  };

  const edit = (id: number) => {
    setActionType("update");
    setUpdateForm({
      ...updateForm,
      id,
    })
    setModalOpen(true);
  };

  const create =  () => {
    setActionType("create");
    setModalOpen(true);
  };

  const createHotel = async () => {
    try {
      console.log('here')
      const response = await axios({
        method: 'post',
        url: '/hotel',
        data: {
          name: form.name,
          category: form.category,
          price: form.price,
          photos: form.photos
        }
      });

      setForm({
        id: 0,
        name: '',
        category: '',
        price: '',
        photos: '',
      });

      getHotels();
    } catch (error) {
      console.error(error)
    }
  }
  
  const updateHotel = async () => {
    try {
      const response = await axios({
        method: 'put',
        url: `/hotel/${updateForm.id}`,
        data: {
          ...updateForm
        }
      });

      setUpdateForm({});

      getHotels();
    } catch (error) {
      console.error(error)
    }
  }

  const deleteHotel = async (id: number) => {
    try {
      const response = await axios({
        method: 'delete',
        url: `/hotel/${id}`,
      });

      getHotels();
    } catch (error) {
      console.error(error)
    }
  }

  const submit = () => {
    if (actionType === "create") {
      if(form.name !== '' && form.price !== '' && form.category !== '' && form.photos !== '') {
        createHotel();
      }
    } else {
      console.log(1)
      if (updateForm.name !== '' || updateForm.price !== '' || updateForm.category !== '' || updateForm.photos !== '') {
        console.log(2)
        updateHotel();
      }
    }
    setModalOpen(false);
  };

  const handleChange = (e: { preventDefault: () => void; target: { name: any; value: any; }; }) => {
    e.preventDefault();
    if(actionType === "create") {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    } else {
      setUpdateForm({
        ...updateForm,
        [e.target.name]: e.target.value,
      })
    }
  }

  useEffect(() => {
    getHotels();
  }, [])

  return (
    <>
      <h1>Admin</h1>
      <button type="button" onClick={create}>Create Hotel</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Photos</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            hotels.map(hotel => (
              <tr key={hotel.id}>
                <td>{hotel.name}</td>
                <td>{hotel.category}</td>
                <td>{hotel.price}</td>
                <td>{hotel.photos}</td>
                <td><button onClick={() => edit(hotel.id)}><AiFillEdit /></button></td>
                <td><button onClick={() => deleteHotel(hotel.id)}><RiDeleteBin5Line /></button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
      { modalOpen && <Modal type={actionType} closeModal={setModalOpen} handleSubmit={submit} handleChange={handleChange} /> }
    </>
  )
};

export default Admin;
