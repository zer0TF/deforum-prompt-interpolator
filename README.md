# DePerp: Deforum Prompt Interpolator

DePerp is a prompt interpolator for Deforum.

Input this:

```json
{
  "0": "a clown fish",
  "10": "a basketball"
}
```

And it will automatically create Deforum-interpolated prompts like this:

```json
{
  "0": "a clown fish",  
  "1": "(a clown fish:0.9) AND (a basketball:0.1)",
  "2": "(a clown fish:0.8) AND (a basketball:0.2)",
  "3": "(a clown fish:0.7) AND (a basketball:0.3)",
  "4": "(a clown fish:0.6) AND (a basketball:0.4)",
  "5": "(a clown fish:0.5) AND (a basketball:0.5)",
  "6": "(a clown fish:0.4) AND (a basketball:0.6)",
  "7": "(a clown fish:0.3) AND (a basketball:0.7)",
  "8": "(a clown fish:0.2) AND (a basketball:0.8)",
  "9": "(a clown fish:0.1) AND (a basketball:0.9)",
  "10": "a basketball"
}
```

# FAQs

## Why?

I wanted to use interpolated prompts with Deforum, but in 2D/3D mode. 🙂

## How does it handle various inputs?

It will pre-fill frames back to 0 if your first keyframe is not `"0"`, and it will also automatically sort your keyframes in numeric order for you.

## Will it tell me if my input is invalid?

Yep. You could also just use this tool to validate that you have correct Deforum-style prompt input, and even use it to sort your keyframes in numerical order if you wanted to. 😁

## Can it interpolate between 3+ prompts together in one keyframe?

No. Math is hard.

## What else does it do?

Nothing right now!

## Why not Parseq?

Sure, if you want your brain to explode. 🤯 DePerp does only one thing. And it does it well.
