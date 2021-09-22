import {gql} from '@apollo/client';

export const InsertPassenger = gql`
  mutation MyMutation($object: anggota_insert_input!) {
    insert_anggota_one(object: $object) {
      id
    }
  }
`

export const DeletePassenger = gql`
  mutation MyMutation($id: Int!) {
    delete_anggota_by_pk(id: $id) {
      id
      nama
      umur
      jenis_kelamin
    }
  }
`
export const UpdatePassenger = gql 
`mutation MyMutation4($nama: String!, $id: Int!) {
  update_anggota(where: {id: {_eq: $id}}, _set: {nama: $nama}) {
    affected_rows
  }
}`