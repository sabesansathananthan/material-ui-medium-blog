import * as toText from "../ToText";

const spyFn = jest.spyOn(toText, "default");
const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

describe("ToText Function", () => {
  beforeAll(() => {
    Object.defineProperty(global.Element.prototype, "innerText", {
      get() {
        return this.textContent;
      },
    });
  });

  it("should return text string", () => {
    const result = spyFn(text);

    expect(result).toBe(text);
    expect(result).toHaveLength(text.length);
  });
});
