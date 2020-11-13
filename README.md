# bt-sms-diceroller
This Twilio example SMS bot rolls pairs of six-sided dice en-masse, which comes
in handy for certain board games and tabletop wargames.

## Usage
Deploy with the Twilio CLI; see
[the Twilio Function docs](https://www.twilio.com/docs/runtime/functions) for
instructions. Then text the number associated with the deployed Function with
a string representing each pair of six-sided dice you want to roll. Each letter
or emoji you send represents a separate thing you're rolling for, and following
a letter or emoji by a number rolls multiple pairs of dice for that thing (
up to 20 pairs max, to keep the reply short enough for SMS).

## Example
The text:
```
ab10cd😃
```

will receive a reply like (with randomized die roll values):
```
a: 9
b: 5, 6, 4, 2, 8, 7, 8, 8, 8, 8
c: 4
d: 11
😃: 3
```
