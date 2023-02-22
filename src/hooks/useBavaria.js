import { createVendiaClient } from "@vendia/client";

const client = createVendiaClient({
    apiUrl: `https://eb7suvb9y1.execute-api.us-west-2.amazonaws.com/graphql/`,
    websocketUrl: `wss://p7g059ngoa.execute-api.us-west-2.amazonaws.com/graphql`,
    apiKey: `GggyixLCvnu4bNuW99pBroYPJD9A44RZVxWz9y6CwGx5`, // <---- API key
})


const {entities} = client;

const useBavaria = () => {
    return {entities}
}

export default useBavaria;
