import { createVendiaClient } from "@vendia/client";

const client = createVendiaClient({
    apiUrl: `https://y9dxhwftjd.execute-api.us-west-2.amazonaws.com/graphql/`,
    websocketUrl: `wss://dok471qfo3.execute-api.us-west-2.amazonaws.com/graphql`,
    apiKey: `e3bPz4Vy1BurWPLkJuW4pUPx1AGPKPnw2nmeavbjcJ7`, // <---- API key
})


const {entities} = client;

const useBavaria = () => {
    return {entities}
}

export default useBavaria;
