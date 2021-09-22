import { useMutation } from "@apollo/client";
import { GetAllPassengers } from '../graphql/query'
import { UpdatePassenger } from '../graphql/mutation'

export default function useUpdatePassenger() {
    const [updatePassenger, { loading: loadingUpdate}] = useMutation(UpdatePassenger, {
        refetchQueries: [GetAllPassengers]
      });
    return{
        updatePassenger,
        loadingUpdate
    }
}