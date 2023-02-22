import { createVendiaClient } from "@vendia/client";

const client = createVendiaClient({
    apiUrl: `https://i3ivprriya.execute-api.us-west-2.amazonaws.com/graphql/`,
    websocketUrl: `wss://q9dweadiz5.execute-api.us-west-2.amazonaws.com/graphql`,
    apiKey: `DgiWw32EvQdQQ2q1FPSv986vJiZ7vvxYjphBQvR2jShx`, // <---- API key
})


const {entities} = client;

const useFDA = () => {
    return {entities}
}

export default useFDA;
