import {gql} from '@apollo/client';

export const GetAllPassengers = gql`
  query MyQuery {
    anggota {
      jenis_kelamin
      id
      nama
      umur
    }
  }
`;

export const GetSinglePassenger = gql`
  query MyQuery($id: Int!) {
    anggota(where: { id: { _eq: $id } }) {
      id
      jenis_kelamin
      nama
      umur
    }
  }
`;

export const GetPassengerAge = gql`
  query MyQuery($umur: Int!) {
    anggota(where: { umur: { _eq: $umur } }) {
      id
      jenis_kelamin
      nama
      umur
    }
  }
`;

export const GetPassengerName = gql`
  query MyQuery($nama: String!) {
    anggota(where: { nama: { _eq: $nama } }) {
      id
      jenis_kelamin
      nama
      umur
    }
  }
`;