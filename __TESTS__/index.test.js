const Controller = require("../src/Controller/User");

test("criar usuário", () => {
  expect(Controller.Create_User("joao@example.com")).toEqual({
    id: expect.any(Number),
    email: "joao@example.com",
  });
});
