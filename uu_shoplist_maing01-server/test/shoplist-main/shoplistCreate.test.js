const { TestHelper } = require("uu_appg01_server-test");

const errorPrefix = "uu-shoplist-main/shopList/create";

beforeAll(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGALL" });
});

afterAll(async () => {
  await TestHelper.teardown();
});

describe("Shoplist/create", () => {

  test("HDS", async () => {
    let session = await TestHelper.login("ListOwner", true, false);
    let dtoIn = { 'name': "Novy list" };
    let response = await TestHelper.executePostCommand("shopList/create", dtoIn, session);

    expect(response.status).toEqual(200);
    expect(response.data.name).toEqual("Novy list");
    expect(response.data.uuAppErrorMap).toEqual({});
  });

  test("InvalidDtoIn", async () => {
    let session = await TestHelper.login("ListOwner", true, false);
    let dtoIn = { };

    let error;
    try {
      await TestHelper.executePostCommand("shopList/create", dtoIn, session);
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
    let dtoIn = { 'name': "Novy list", 'someKey': 'val' };
    let response = await TestHelper.executePostCommand("shopList/create", dtoIn, session);

    expect(response.status).toEqual(200);
    expect(response.data.name).toEqual("Novy list");

    expect(response.data.uuAppErrorMap).toBeDefined();
    const map = response.data.uuAppErrorMap;
    let key = errorPrefix + "/unsupportedKeys";
    expect(map[key]['type']).toEqual("warning");
  });

});