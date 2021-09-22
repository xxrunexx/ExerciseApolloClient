import { useMutation } from "@apollo/client";
import { GetAllPassengers } from '../graphql/query'
import { InsertPassenger } from '../graphql/mutation'

export default function useInsertPassenger() {
    const [insertPassenger, { loading: loadingInsert}] = useMutation(InsertPassenger, {
        refetchQueries: [GetAllPassengers]
      });
    return{
        insertPassenger,
        loadingInsert
    }
}