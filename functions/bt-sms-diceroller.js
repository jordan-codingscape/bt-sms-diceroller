const chance = require("chance").Chance();
const P = require("parsimmon");

const Parser = P.createLanguage({
  Symbol: () =>
    P.regexp(
      /[a-zA-Z]|\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/
    ).desc("a symbol"),
  Repeat: () =>
    P.regex(/[0-9]+/)
      .map(Number)
      .desc("a repeat count"),
  Dice: (r) => P.seqObj(["symbol", r.Symbol], ["repeat", r.Repeat.fallback(1)]),
  Message: (r) => r.Dice.trim(P.optWhitespace).atLeast(1),
});

exports.Parser = Parser;

const parseRequest = (reqStr) => {
  const req = Parser.Message.parse(reqStr);

  if (!req.status) {
    return "I didn't understand that. Reply HELP for help.";
  } else {
    return req.value
      .map((dice) => {
        const repeat = Math.min(Math.max(dice.repeat, 1), 20);
        const results = Array(repeat)
          .fill()
          .map(() => chance.rpg("2d6", { sum: true }))
          .join(", ");

        return `${dice.symbol}: ${results}`;
      })
      .join("\n");
  }
};

exports.handler = (_context, event, callback) => {
  const twiml = new Twilio.twiml.MessagingResponse();
  const reqStr = event.Body || "";

  if (reqStr === "HELP") {
    twiml.message(`\
This SMS bot rolls pairs of six-sided dice en masse.
To begin, text back a string of letters or Emoji, one per pair of dice you\
need to roll. Type a number after a letter or Emoji to roll multiple pairs\
at once (max 20).

Example: "ab10🤯" rolls one pair for a, b, and 🤯, and 10 pairs for b.
Msg&Data Rates May Apply.\
`);
  } else if (reqStr === "STOP") {
    twiml.message(`This is not a subscription service. Reply HELP for help.`);
  } else {
    twiml.message(parseRequest(reqStr));
  }

  callback(null, twiml);
};
