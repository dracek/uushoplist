const { TestHelper } = require("uu_appg01_server-test");

const errorPrefix = "uu-shoplist-main/shopList/delete";
const otherAwid = "33333333333333333333333333333333";


beforeAll(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGALL" });
});

afterAll(async () => {
  await TestHelper.teardown();
});

beforeEach(async () => {
  let db = await TestHelper.getDbConnection();
  await db.eval("db.shopList.insertOne({ 'awid': '"+ TestHelper.awid +"', '_id': ObjectId('abcd12345678901234567890'), 'name': 'Muj list', 'archived': false, 'ownerId': '3039-912-8064-0000', 'members': []})");
  await db.eval("db.shopList.insertOne({ 'awid': '"+ TestHelper.awid +"', '_id': ObjectId('bbbb12345678901234567890'), 'name': 'List pro jineho ownera', 'ownerId': '1111-912-8064-0000', 'members': []})");
  await db.eval("db.shopList.insertOne({ 'awid': '"+ otherAwid +"', '_id': ObjectId('aaaa12345678901234567890'), 'name': 'List pro jiny awid', 'ownerId': '3039-912-8064-0000', 'members': []})");
});

afterEach(async () => {
  let db = await TestHelper.getDbConnection();
  await db.eval("db.shopList.remove({})");
});

describe("Shoplist/delete", () => {

  test("HDS", async () => {
    let session = await TestHelper.login("ListOwner", true, false);
    let dtoIn = { 'id': "abcd12345678901234567890" };
    let response = await TestHelper.executePostCommand("shopList/delete", dtoIn, session);

    expect(response.status).toEqual(200);
    expect(response.data.id).toEqual("abcd12345678901234567890");
    expect(response.data.uuAppErrorMap).toEqual({});

    let db = await TestHelper.getDbConnection();
    const existingObject = await db.eval("db.shopList.findOne({ '_id': ObjectId('abcd12345678901234567890') })");
    expect(existingObject).toEqual(null);
  });

  test("InvalidDtoIn", async () => {
    let session = await TestHelper.login("ListOwner", true, false);
    let dtoIn = { 'name': "Muj list" };

    let error;
    try {
      await TestHelper.executePostCommand("shopList/delete", dtoIn, session);
    } catch (e){
      error = e;
    }

    expect(error.response.status).toEqual(400);
    expect(error.response.data.uuAppErrorMap).toBeDefined();
    const map = error.response.data.uuAppErrorMap;
    let key = errorPrefix + "/invalidDtoIn";
    expect(map[key]['type']).toEqual("error");
  });

  test("UnsupportedKeys", async () => {
    let session = await TestHelper.login("ListOwner", true, false);
    let dtoIn = { 'id': "abcd12345678901234567890", 'anyKey': 'value' };
    let response = await TestHelper.executePostCommand("shopList/delete", dtoIn, session);

    expect(response.status).toEqual(200);
    expect(response.data.id).toEqual("abcd12345678901234567890");

    expect(response.data.uuAppErrorMap).toBeDefined();
    const map = response.data.uuAppErrorMap;
    let key = errorPrefix + "/unsupportedKeys";
    expect(map[key]['type']).toEqual("warning");

    let db = await TestHelper.getDbConnection();
    const existingObject = await db.eval("db.shopList.findOne({ '_id': ObjectId('abcd12345678901234567890') })");
    expect(existingObject).toEqual(null);
  });

  test("ShopListNotPresent", async () => {
    let session = await TestHelper.login("ListOwner", true, false);
    let dtoIn = { 'id': "aaaa12345678901234567890" };
  
    let error;
    try {
      await TestHelper.executePostCommand("shopList/delete", dtoIn, session);
    } catch (e){
      error = e;
    }
  
    expect(error.response.status).toEqual(400);
    expect(error.response.data.uuAppErrorMap).toBeDefined();
    const map = error.response.data.uuAppErrorMap;
    let key = errorPrefix + "/shopListNotPresent";
    expect(map[key]['type']).toEqual("error");
  });

  test("NotEnoughRights", async () => {
    let session = await TestHelper.login("ListOwner", true, false);
    let dtoIn = { 'id': "bbbb12345678901234567890" };
  
    let error;
    try {
      await TestHelper.executePostCommand("shopList/delete", dtoIn, session);
    } catch (e){
      error = e;
    }
  
    expect(error.response.status).toEqual(400);
    expect(error.response.data.uuAppErrorMap).toBeDefined();
    const map = error.response.data.uuAppErrorMap;
    let key = errorPrefix + "/notEnoughRights";
    expect(map[key]['type']).toEqual("error");
  });

});