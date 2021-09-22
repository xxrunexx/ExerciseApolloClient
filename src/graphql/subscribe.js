import {gql} from '@apollo/client';

export const SubscriptionPassenger = gql`
subscription MySubscription {
    anggota {
      id
      jenis_kelamin
      nama
      umur
  }
}
`