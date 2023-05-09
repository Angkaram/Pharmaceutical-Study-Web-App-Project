import { createVendiaClient } from "@vendia/client";

const client = createVendiaClient({
    apiUrl: `https://fukn470qm4.execute-api.us-west-2.amazonaws.com/graphql/`,
    websocketUrl: `wss://ekwmoii2pb.execute-api.us-west-2.amazonaws.com/graphql`,
    apiKey: `3msKiwbQFpcX12VEpV4MDpRSTBLWgjq45WttAFaqrAAk`, // <---- API key
})


const {entities} = client;

const useFDA = () => {
    return {entities}
}

export default useFDA;
