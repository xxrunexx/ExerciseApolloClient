import { useLazyQuery } from "@apollo/client";
import { GetPassengerName } from "../graphql/query";

export default function useGetPassengerName(){
  const [getNameData,
    { data: singleNameData, 
      loading: loadingSingleNameData, 
    },] = useLazyQuery(GetPassengerName);

    return{
        getNameData,
        singleNameData,
        loadingSingleNameData,
    }
}