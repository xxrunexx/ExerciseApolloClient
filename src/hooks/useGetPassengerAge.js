import { useLazyQuery } from "@apollo/client";
import { GetPassengerAge } from "../graphql/query";

export default function useGetPassengerAge(){
  const [getAgeData,
    { data: singleAgeData, 
      loading: loadingSingleAgeData
    },] = useLazyQuery(GetPassengerAge);

    return{
        getAgeData,
        singleAgeData,
        loadingSingleAgeData,
    }
}