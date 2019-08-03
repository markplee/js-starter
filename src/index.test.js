import { JSDOM } from "jsdom";

describe("Our first test", () => {
  it("it should pass", () => {
    expect(true).toBe(true);
  });
});

describe("index.html", () => {
  it("it should have h1 that says Users", done => {
    return JSDOM.fromFile("./src/index.html").then(dom => {
      const h1 = dom.window.document.getElementsByTagName("h1")[0];
      expect(h1.innerHTML).toBe("Users");
      done();
    });
  });
});
