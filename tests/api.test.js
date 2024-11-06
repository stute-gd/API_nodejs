import { expect } from "chai";
import pkg from "pactum";
const { response, spec } = pkg;
import "dotenv/config";
import { baseUrl } from "../helpers/data.js";
import { userId } from "../helpers/data.js";

describe("Api tests", () => {
  it.skip("get request", async () => {
    const response = await spec()
      .get(`${baseUrl}/BookStore/v1/Books`)
      .inspect();
    expect(response.statusCode).to.eql(200);
    expect(response.body.books[1].title).to.be.eql(
      "Learning JavaScript Design Patterns"
    );
    expect(JSON.stringify("Learning JavaScript Design Patterns"));
    const book = response.body.books.find(
      (book) => book.title === "You Don't Know JS"
    );
    expect(book.author).to.be.eql("Kyle Simpson");
  });

  it.skip("Create user", async () => {
    const response = await spec()
      .post(`${baseUrl}/Account/v1/User`)
      .withBody({
        userName: "AAL",
        password: "AZ12341234az@",
      })
      .inspect();
    expect(response.statusCode).to.eql(201);
    //0198302c-5344-4e45-b7ac-d07ade129919
  });
  it("Log as a user AAL", async () => {
    console.log("Print pwd  " + process.env.SECRET_PASSWORD);
    const response = await spec()
      .post(`${baseUrl}/Account/v1/Authorized`)
      .withBody({
        userName: "AAL",
        password: process.env.SECRET_PASSWORD,
      })
      .inspect();
  });
});
