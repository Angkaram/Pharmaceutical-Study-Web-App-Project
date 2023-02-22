import { createVendiaClient } from "@vendia/client";

const client = createVendiaClient({
    apiUrl: `https://waw9fm8vki.execute-api.us-west-2.amazonaws.com/graphql/`,
    websocketUrl: `wss://xedwlaswyh.execute-api.us-west-2.amazonaws.com/graphql`,
    apiKey: `9YaJcrJzJ5srWmcosaNENLW9td6WJhniPP6WZPUdvLCi`, // <---- API key
})

const {entities} = client;

const useJaneHopkins = () => {
    return {entities}
}

export default useJaneHopkins;