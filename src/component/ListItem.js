import "./Home.css";
import { gql, useQuery, useLazyQuery , useMutation} from '@apollo/client';
import { useState } from 'react'
import useUpdatePassenger from "../hooks/useUpdatePassenger";




const ListItem = (props) => {
  const { id, nama, umur, jenis_kelamin} = props.data;
  const { updatePassenger } = useUpdatePassenger();

  const [statusNama, setStatusNama] = useState(false)
  const [newNama, setnewNama] = useState('')
    const clickNama = () => {
      return setStatusNama(!statusNama)
    }
    const submitNama = () => {
      updatePassenger({variables :{
          nama : newNama,
          id : id
      }})
    }
    const onEditNama = (e) =>{
      setnewNama(e.target.value)
      console.log("newNama = ", newNama)

    }

  return (
    <tr>
      <td>
        <span onClick={clickNama}>{nama}</span>
        {statusNama ? <form onSubmit={submitNama}><input onChange={onEditNama} placeholder={nama}/> </form> : ""}
      </td>
      <td>{umur}</td>
      <td>{jenis_kelamin}</td>
      <td className="removeBorder" onClick={() => props.hapusPengunjung(id)}>
        <button>Hapus</button>
      </td>
    </tr>
  );
};

export default ListItem;
