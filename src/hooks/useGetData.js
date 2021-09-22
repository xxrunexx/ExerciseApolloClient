import { useQuery ,useMutation, useSubscription } from "@apollo/client";
import { GetAllPassengers } from "../graphql/query";
import {SubscriptionPassenger} from "../graphql/subscribe"

export default function useGetData(){
    const { data,loading, error, subscribeToMore }= useQuery(GetAllPassengers);
    const subscribePassenger = () => {
        subscribeToMore({
            document: SubscriptionPassenger,
            updateQuery: (prev, {subscriptionData: {data}}) => {
                // console.log(data);
                return data
            }
        })
    }
    return {
        anggota: data ? data.anggota : [],
        loading,
        error,
        subscribePassenger,
    }
}