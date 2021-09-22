import { useLazyQuery } from "@apollo/client";
import { GetSinglePassenger } from "../graphql/query";

export default function useSingleData(){
    const [getData,
    { data: singleData, 
      loading: loadingSingleData, 
      errorSingleData 
    },] = useLazyQuery(GetSinglePassenger);

    return{
        getData,
        singleData,
        loadingSingleData,
        errorSingleData
    }
}