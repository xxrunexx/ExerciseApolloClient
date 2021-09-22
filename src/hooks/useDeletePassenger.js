import { useMutation } from "@apollo/client";
import { GetAllPassengers } from '../graphql/query'
import { DeletePassenger } from '../graphql/mutation'

export default function useDeletePassenger() {
    const [deletePassenger, { loading: loadingDelete}] = useMutation(DeletePassenger, {
        refetchQueries: [GetAllPassengers]
      });
    return{
        deletePassenger,
        loadingDelete
    }
}