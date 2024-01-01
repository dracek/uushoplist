const { TestHelper } = require("uu_appg01_server-test");

const command = "uu-shoplist-main/shopList/list";
const otherAwid = "33333333333333333333333333333333";

beforeAll(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGALL" });

  let db = await TestHelper.getDbConnection();
  await db.eval("db.shopList.insertOne({ 'awid': '"+ TestHelper.awid +"', '_id': ObjectId('a00012345678901234567890'), 'name': 'Muj list 1', 'ownerId': '3039-912-8064-0000', 'members': [], 'archived': false})");
  await db.eval("db.shopList.insertOne({ 'awid': '"+ TestHelper.awid +"', '_id': ObjectId('b00012345678901234567890'), 'name': 'Muj list 2', 'ownerId': '3039-912-8064-0000', 'members': [], 'archived': false})");
  await db.eval("db.shopList.insertOne({ 'awid': '"+ TestHelper.awid +"', '_id': ObjectId('c00012345678901234567890'), 'name': 'Muj list 3', 'ownerId': '3039-912-8064-0000', 'members': [], 'archived': true})");
  await db.eval("db.shopList.insertOne({ 'awid': '"+ TestHelper.awid +"', '_id': ObjectId('bbbb12345678901234567890'), 'name': 'List pro jineho ownera', 'ownerId': '1111-912-8064-0000', 'members': []})");
  await db.eval("db.shopList.insertOne({ 'awid': '"+ otherAwid +"', '_id': ObjectId('aaaa12345678901234567890'), 'name': 'List pro jiny awid', 'ownerId': '3039-912-8064-0000', 'members': []})");
});

afterAll(async () => {
  await TestHelper.teardown();
});

describe("Shoplist/list", () => {

  test("HDS", async () => {
    let session = await TestHelper.login("ListOwner", true, false);
    let dtoIn = { };
    let response = await TestHelper.executeGetCommand("shopList/list", dtoIn, session);

    expect(response.status).toEqual(200);
    expect(response.data.itemList.length).toEqual(2);
    expect(response.data.uuAppErrorMap).toEqual({});
    expect(response.data.pageInfo).toEqual({ 'pageIndex': 0, 'pageSize': 1000, total: 2 })
  });

  test("includeArchived", async () => {
    let session = await TestHelper.login("ListOwner", true, false);
    let dtoIn = { 'includeArchived': true };
    let response = await TestHelper.executeGetCommand("shopList/list", dtoIn, session);

    expect(response.status).toEqual(200);
    expect(response.data.itemList.length).toEqual(3);
    expect(response.data.uuAppErrorMap).toEqual({});
    expect(response.data.pageInfo).toEqual({ 'pageIndex': 0, 'pageSize': 1000, total: 3 })
  });

  test("pagination", async () => {
    let session = await TestHelper.login("ListOwner", true, false);
    let dtoIn = { 'includeArchived': true, 'pageInfo': {"pageIndex": 1, "pageSize": 2} };
    let response = await TestHelper.executeGetCommand("shopList/list", dtoIn, session);

    expect(response.status).toEqual(200);
    expect(response.data.itemList.length).toEqual(1);
    expect(response.data.uuAppErrorMap).toEqual({});
    expect(response.data.pageInfo).toEqual({ 'pageIndex': 1, 'pageSize': 2, total: 3 })
  });

  test("InvalidDtoIn", async () => {
    let session = await TestHelper.login("ListOwner", true, false);
    let dtoIn = { 'includeArchived': true, 'pageInfo': 'bumerang' };

    let error;
    try {
      await TestHelper.executeGetCommand("shopList/list", dtoIn, session);
    } catch (e){
      error = e;
    }

    expect(error.response.status).toEqual(400);
    expect(error.response.data.uuAppErrorMap).toBeDefined();
    const map = error.response.data.uuAppErrorMap;
    let key = command + "/invalidDtoIn";
    expect(map[key]['type']).toEqual("error");
  });

  test("UnsupportedKeys", async () => {
    let session = await TestHelper.login("ListOwner", true, false);
    let dtoIn = { 'addedKey': '123' };
    let response = await TestHelper.executeGetCommand("shopList/list", dtoIn, session);

    expect(response.status).toEqual(200);
    expect(response.data.itemList.length).toEqual(2);
    expect(response.data.pageInfo).toEqual({ 'pageIndex': 0, 'pageSize': 1000, total: 2 })

    expect(response.data.uuAppErrorMap).toBeDefined();
    const map = response.data.uuAppErrorMap;
    let key = command + "/unsupportedKeys";
    expect(map[key]['type']).toEqual("warning");
  });

});