// import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';

import { WebSocketLink} from "apollo-link-ws"
import {ApolloClient } from "apollo-client";

 import { InMemoryCache } from "apollo-cache-inmemory";
 
export default  new ApolloClient({
    cache : new InMemoryCache(),
    link : new WebSocketLink({
        uri : "wss://ionic-react-app.herokuapp.com/v1/graphql",
        options:{
            reconnect:true
        }
    })
})
 
 