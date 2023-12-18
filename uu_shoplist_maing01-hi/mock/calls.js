import Calls from "../src/calls.js";

let appAssetsBaseUri =
  document.baseURI ||
  (document.querySelector("base") || {}).href ||
  location.protocol + "//" + location.host + location.pathname;
if (!appAssetsBaseUri.endsWith("/")) {
  appAssetsBaseUri = appAssetsBaseUri.slice(0, appAssetsBaseUri.lastIndexOf("/")); // strip what's after last slash
}

function sleep(time) {
  return new Promise(resolve => {
      setTimeout(resolve, time)
  })
}

Calls.call = (method, url, dtoIn) => {
  let mockUrl = (process.env.MOCK_DATA_BASE_URI || appAssetsBaseUri) + "mock/data/" + url + ".json";

  console.log("%c>> Mock call for url: " + url, "font-weight: bolder; color: blue");
  console.log("called with dtoIn:", dtoIn ? dtoIn : "empty dtoIn");

  let responsePromise = (async () => {
    let response = await fetch(mockUrl);
    let result = await response.json();
    await sleep(250);
    return result;
  })();
  return dtoIn != null ? responsePromise.then(dtoIn.done, dtoIn.fail) : responsePromise;
};

Calls.getCommandUri = (useCase) => {
  return useCase;
};

export default Calls;
