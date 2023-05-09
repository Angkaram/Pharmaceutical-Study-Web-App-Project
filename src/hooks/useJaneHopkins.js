import { createVendiaClient } from "@vendia/client";

const client = createVendiaClient({
    apiUrl: `https://r3yygay3z2.execute-api.us-west-2.amazonaws.com/graphql/`,
    websocketUrl: `wss://k2wuqyhp0d.execute-api.us-west-2.amazonaws.com/graphql`,
    apiKey: `AXKe8Rj4xQ9uPetWnA3Mi2yyrDLB9tc4ibS9YjNbyEwS`, // <---- API key
})

const {entities} = client;

const useJaneHopkins = () => {
    return {entities}
}

export default useJaneHopkins;