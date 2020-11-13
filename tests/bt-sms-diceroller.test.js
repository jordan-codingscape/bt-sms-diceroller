const { Parser } = require("../functions/bt-sms-diceroller.js");

describe("Parser tests", () => {
  it("should parse a single symbol", () => {
    const result = Parser.Message.tryParse("a");

    expect(result).toEqual([
      {
        symbol: "a",
        repeat: 1,
      },
    ]);
  });

  it("should parse a single emoji", () => {
    const result = Parser.Message.tryParse("😃");

    expect(result).toEqual([
      {
        symbol: "😃",
        repeat: 1,
      },
    ]);
  });

  it("should parse a symbol with repeat", () => {
    const result = Parser.Message.tryParse("x10");

    expect(result).toEqual([
      {
        symbol: "x",
        repeat: 10,
      },
    ]);
  });

  it("should parse an emoji with repeat", () => {
    const result = Parser.Message.tryParse("😊25");

    expect(result).toEqual([
      {
        symbol: "😊",
        repeat: 25,
      },
    ]);
  });

  it("should parse a string of symbols", () => {
    const result = Parser.Message.tryParse("abc");

    expect(result).toEqual([
      { symbol: "a", repeat: 1 },
      { symbol: "b", repeat: 1 },
      { symbol: "c", repeat: 1 },
    ]);
  });

  it("should parse a string of emoji", () => {
    const result = Parser.Message.tryParse("😛🎾💍");

    expect(result).toEqual([
      { symbol: "😛", repeat: 1 },
      { symbol: "🎾", repeat: 1 },
      { symbol: "💍", repeat: 1 },
    ]);
  });

  it("should parse a complex message", () => {
    const result = Parser.Message.tryParse("aB5💀f🥰10zz");

    expect(result).toEqual([
      { symbol: "a", repeat: 1 },
      { symbol: "B", repeat: 5 },
      { symbol: "💀", repeat: 1 },
      { symbol: "f", repeat: 1 },
      { symbol: "🥰", repeat: 10 },
      { symbol: "z", repeat: 1 },
      { symbol: "z", repeat: 1 },
    ]);
  });
});
