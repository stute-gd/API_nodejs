import { expect } from "chai";
import pkg from "pactum";
const { response, spec } = pkg;

import { baseUrl, userId, user, password } from "../helpers/data.js";

let token_response;
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

  it.only("Log as a user AAL", async () => {
    console.log("Print pwd  " + process.env.SECRET_PASSWORD);
    const response = await spec()
      .post(`${baseUrl}/Account/v1/Authorized`)
      .withBody({
        userName: user,
        password: password,
      })
      .inspect();
    expect(response.statusCode).to.eql(200);
  });

  it.only("Generate token", async () => {
    const response = await spec()
      .post(`${baseUrl}/Account/v1/GenerateToken`)
      .withBody({
        userName: user,
        password: password,
      })
      .inspect();
    token_response = response.body.token;
    console.log(token_response);
    expect(response.statusCode).to.eql(200);
    expect(response.body.result).to.eql("User authorized successfully.");
  });

  it.skip("Add book", async () => {
    const response = await spec()
      .post(`${baseUrl}/BookStore/v1/Books`)
      .withBearerToken(token_response)
      .withBody({
        userId: userId,
        collectionOfIsbns: [
          {
            isbn: "9781449331818",
          },
        ],
      })
      .inspect();
    expect(response.statusCode).to.eql(201);
  });
  it.skip("Check if user has a book", async () => {
    const response = await spec()
      .get(`${baseUrl}/Account/v1/${userId}`)
      .withBearerToken(token_response)
      .inspect();
    expect(response.statusCode).to.eql(200);
  });

  it.skip("Remove books", async () => {
    const response = await spec()
      .delete(`${baseUrl}/BookStore/v1/Books?UserId/${userId}`)
      .withBearerToken(token_response)
      .inspect();
    expect(response.statusCode).to.eql(204);
  });

  it.only("Check if user has ZERO books", async () => {
    const response = await spec()
      .get(`${baseUrl}/Account/v1/${userId}`)
      .withBearerToken(token_response)
      .inspect();
    expect(response.statusCode).to.eql(200);
    //expect(response.body).to.have.property('books').that.is.an('array');
    //expect(response.body).to.eql([]);
  });
  
});
