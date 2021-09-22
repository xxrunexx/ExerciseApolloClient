import "./Home.css";
import { gql, useQuery, useLazyQuery , useMutation} from '@apollo/client';
import { useState } from 'react'

const GetAllPassengers = gql`
  query MyQuery {
    anggota {
      jenis_kelamin
      id
      nama
      umur
    }
  }
`;

const UpdatePassenger = gql 
`mutation MyMutation4($nama: String!, $id: Int!) {
  update_anggota(where: {id: {_eq: $id}}, _set: {nama: $nama}) {
    affected_rows
  }
}`


const ListItem = (props) => {
  const { id, nama, umur, jenis_kelamin} = props.data;
  const [updatePassenger, {loading}] = useMutation(UpdatePassenger, {
  refetchQueries: [GetAllPassengers]
  })

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
