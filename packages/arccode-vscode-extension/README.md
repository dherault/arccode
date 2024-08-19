# Arccode

A role-playing game for developers

## Motivation

Coding is inherently fun — it's an act of creation that yields visible results. However, it can also become repetitive and laborious. That's why I created Arccode: to bring joy to your day and shield you from monotony. By incorporating variable rewards and a sense of progress into coding, I believe we can make the experience even more enjoyable. So, have fun coding!

## Data collected

This VSCode extension collects keyword metadata when the content of a file of a supported language is changed. This metadata is used to calculate the player's progress and to generate the game's content.

Here is an example of such data:

```json
{
  "javascript": {
    "function": 4,
    "const": 12
  },
  "ruby": {
    "def": 3,
    "class": 1
  }
}
```

As you can see, the original code is not stored, only the keywords and their counts.
