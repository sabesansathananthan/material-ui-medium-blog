import * as shortenText from "../ShortenText";

const spyFn = jest.spyOn(shortenText, "default");

const longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

describe("ShortenText function", () => {
  it("should return shorten text", () => {
    const result = spyFn(longText, 0, 3);

    expect(result).toBe("Lor");
    expect(result).toHaveLength(3);
  });
});
