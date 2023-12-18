import { Environment } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";

// NOTE During frontend development it's possible to redirect uuApp command calls elsewhere, e.g. to production/staging
// backend, by configuring it in *-hi/env/development.json:
//   "uu5Environment": {
//     "callsBaseUri": "https://uuapp-dev.plus4u.net/vnd-app/awid"
//   }

const Calls = {
  async call(method, url, dtoIn, clientOptions) {
    const response = await Plus4U5.Utils.AppClient[method](url, dtoIn, clientOptions);
    return response.data;
  },

  getList(dtoIn) {
    const commandUri = Calls.getCommandUri("shopList/get");
    return Calls.call("get", commandUri, dtoIn);
  },

  updateList(dtoIn) {
    const commandUri = Calls.getCommandUri("shopList/update");
    return Calls.call("post", commandUri, dtoIn);
  },

  updateItem(dtoIn) {
    const commandUri = Calls.getCommandUri("shopList/updateItem");
    return Calls.call("post", commandUri, dtoIn);
  },

  createItem(dtoIn) {
    const commandUri = Calls.getCommandUri("shopList/createItem");
    return Calls.call("post", commandUri, dtoIn);
  },

  deleteItem(dtoIn) {
    const commandUri = Calls.getCommandUri("shopList/deleteItem");
    return Calls.call("post", commandUri, dtoIn);
  },

  addUser(dtoIn) {
    const commandUri = Calls.getCommandUri("shopList/addUser");
    return Calls.call("post", commandUri, dtoIn);
  },

  deleteUser(dtoIn) {
    const commandUri = Calls.getCommandUri("shopList/deleteUser");
    return Calls.call("post", commandUri, dtoIn);
  },

  listLists(dtoIn) {
    const commandUri = Calls.getCommandUri("shopList/list");
    return Calls.call("get", commandUri, dtoIn);
  },

  createList(dtoIn) {
    const commandUri = Calls.getCommandUri("shopList/create");
    return Calls.call("post", commandUri, dtoIn);
  },

  deleteList(dtoIn) {
    const commandUri = Calls.getCommandUri("shopList/delete");
    return Calls.call("post", commandUri, dtoIn);
  },


  loadIdentityProfiles() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/initUve");
    return Calls.call("get", commandUri);
  },

  initWorkspace(dtoInData) {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/init");
    return Calls.call("post", commandUri, dtoInData);
  },

  getWorkspace() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/get");
    return Calls.call("get", commandUri);
  },

  async initAndGetWorkspace(dtoInData) {
    await Calls.initWorkspace(dtoInData);
    return await Calls.getWorkspace();
  },

  getCommandUri(useCase, baseUri = Environment.appBaseUri) {
    return (!baseUri.endsWith("/") ? baseUri + "/" : baseUri) + (useCase.startsWith("/") ? useCase.slice(1) : useCase);
  },
};

export default Calls;
