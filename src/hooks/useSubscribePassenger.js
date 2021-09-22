import { useSubscription } from "@apollo/client";
import { SubscriptionPassenger } from '../graphql/subscribe';

export default function usesubscribePassenger() {
    const { data, error, loading} = useSubscription(SubscriptionPassenger);

    return{
        data,
        error,
        loading,
    }
}