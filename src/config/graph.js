import { Client } from "@microsoft/microsoft-graph-client";
import 'isomorphic-fetch';

let cachedToken = null; // TODO: implement OAuth refresh

const client = Client.init({
  authProvider: (done) => {
    done(null, cachedToken);
  }
});

export async function fetchMessage(resourceUrl) {
  return client.api(resourceUrl).get();
}
