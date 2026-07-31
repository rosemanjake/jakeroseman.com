---
title: "Markdown parsing"
subtitle: "Thoughts on how you can efficiently parse and analyse text files."
date: 2024-01-05
category: tech
cover: "../../assets/blog/code.jpg"
---

I have developed many tools for technical writers. They lint, format, parse, and convert Markdown files. While designing these tools, certain common problems have repeatedly arisen. In response, I have developed a general approach that has proven to be effective and extensible in production. This article lays out that approach and the key lessons I have learnt.

![tfw writing a text parser](../../assets/blog/tfwtext.png)

**tfw when writing a text parser**

## Optimal time complexity

Performance is important in text processing. For example, a linter might produce results in an IDE. It therefore needs to produce findings in real time, as the user is typing. Similarly, a converter that parses and converts very large files could take many minutes if not well optimised.

For optimal time complexity, your algorithm should visit each character in a file only once. An algorithm that repeatedly scans back and forth will certainly be slower than one that does its work in a single pass. Your algorithm should therefore run in `O(n)` time, where `n` is the number of characters in the file. 

That is, the optimal processing time scales linearly with the size of the file. If you increase the file size five times over, your algorithm should run _at most_ five times slower.

For a simple example, consider a character frequency algorithm. An `O(n)` implementation would loop over the characters in the document a single time, perhaps using a hashmap to count occurrences of each character. An `O(n^2)` implementation might use nested loops to check every character against every other character. The latter is by far the slower solution.

**Lesson:** When developing a text processing algorithm, you should centre it on a single loop over every character in a file.

## Track state

At any given index, your program should understand the current context of the document, such as whether the current character is in a heading, code snippet, and HTML element. Tracking state in this manner is the key to parsing out components from a document.

### Define a tracking class

The simplest way to track state is with a single object whose members are of the following types:

- **Booleans:** Variables that capture whether the current character is in a certain state. For example, where `inCodeSnippet` is true, the current character is in a code snippet.
- **Buffers:** Lists of characters that have so far been encountered. For example, `paragraphBuffer` contains all the characters that the loop has iterated over up to the current index. It resets every time the sequence `\n\n` is encountered.
  - It is often most efficient to implement buffers as a `StringBuilder`, or equivalent.
- **Stacks:** Lists of strings that the program pushes and pops on a last-in-first-out basis. For example, the parser pushes `div` to a stack of HTML elements when encountered, and pops that element from the stack when encountering the corresponding `/div`. 

The following is an example definition of such a class in TypeScript:

```typescript
class TextFileState {
  originalText: string;
  currentCharacter: string | null;
  inCodeSnippet: boolean;
  /** All characters in the current paragraph. */
  paragraphBuffer: string[];
  /** All characters in the current component, e.g. code snippet. */
  componentBuffer: string[];
  htmlTags: string[];
  ...


  constructor(filePath: string) {
    this.originalText = TextUtils.getText(filePath);
    this.currentCharacter = null;
    this.inCodeSnippet = false;
    this.componentBuffer = string[];
    this.paragraphBuffer = [];
    this.htmlTags = [];
    ...
  }
}
```

Before you begin looping through your document, instantiate your tracking class. Keep this object as the only instantiation of the class. 

**Lesson:** When tracking state, do so in a single object. 

### State tracking functions

As you loop over each character in a file, you should call various state tracking functions depending on the current character. These functions should evaluate the current state of the document and change the given state booleans, buffers, and stacks. For example, when encountering a backtick character in a Markdown document, call `isInCode()`, and change `state.isInCodeSnippet` as appropriate.

There are several ways you could structure this. Most simply, you could use a switch statement where the expression is the current character. See the snippet below for an example:

```typescript
const state = TextFileState(filePath)

for (let i = 0; i < state.originalText.length; i++){

  state.currentCharacter = TextUtils.getCharacter(i) 
  if (state.shouldSkip()) continue
  state.pushToBuffers(currentCharacter)

  switch(currentCharacter) {
    case '`':
      isInCodeSnippet(i, state)
      break;
    case '-':
    case '*':
    case '+':
      isInList(state)
      break;
    default:
      break;
  }
}

function isInCodeSnippet(state){
	if (state.paragraphBuffer.length === 3 && 
    state.paragraphBuffer[i - 1] === '`' && 
    state.paragraphBuffer [i - 2] === '`'){
    state.inCodeSnippet = true      
  }
}
```

Passing just the state object allows you to simplify function parameters. This produces a more easily extensible structure in which debugging is also much easier. Through the state object you can see the complete current state of the document at the current character.

**Lesson:** Pass your state object to state tracking functions and modify it in place.

### Applications of state tracking

Tracking state is the basis for most actions you would want to take. Consider how your program might track entering and exiting a code snippet:

- **Enter component:** Loop encounters backtick, calls `isInCodeSnippet` and sees three backticks in `state.paragraphBuffer`. `isInCodeSnippet` switches `state.inCodeSinppet` from `false` to `true`.
- **Push to `componentBuffer`:** While `state.inCodeSnippet` is true, the program pushes each character to `state.componentBuffer`.
- **Leave component:** The loop again encounters backtick, calls `isInCodeSnippet` and sees three backticks in `componentBuffer`. `isInCodeSnippet` switches `state.inCodeSnippet` to false.
- **Flush `componentBuffer`:**`isInCodeSnippet` joins the characters in `componentBuffer` to a single string that captures the content of the snippet.

Consider the examples below on how you could use this workflow in a linter, formatter, and general parser.

- **Linter:** Run that string against a regular expression that matches if there is a particular error present.
- **Formatter:** Pass the string to a code formatting API like `Format.JS` before pushing it to a final list of formatted lines.
- **Parser:** Pass the string to the constructor of a `Node` class and integrate the resulting object into a syntax tree.

**Lesson:** Use changes in state to parse components.

## Build a common framework

As you may have noticed from the previous examples, it is possible to build a single text processor that performs multiple functions. If your implementation is flexible enough, you can build a single general purpose library for linting, formatting, parsing, and converting.

**Lesson:** Build a general purpose program that you can use in various contexts.

## Things to avoid

There are some common ways of approaching these problems that are not maximally efficient. If you are most interested in supporting custom syntax, or if the performance of your solution is paramount, you should minimise tokenisation and perhaps also avoid abstract syntax trees. The following sections offer more detail.

### Minimise tokenisation

When processing text, it can be tempting to break the document down into tokens before performing any analysis. However, this is often an unnecessary step that adds complexity and reduces performance. In many cases, you can achieve the same results by simply analysing the characters in the document as you loop through them.

For example, consider identifying bold text in Markdown. Rather than first tokenising the document and then looking for pairs of `**` tokens, you can just check if the current and next characters are both `*` while looping through the document. This avoids the extra pass and overhead of tokenization. Of course, there are cases where tokenization is beneficial, especially for complex analysis requiring understanding document structure. But for many common text processing tasks, analyzing characters directly is simpler and more efficient.

**Lesson:** Avoid tokenizing text unless necessary. Analyzing characters directly is often simpler and more efficient.

### Avoid trees

When building custom text processing tools like linters, formatters, and converters, it is common to use a two-stage approach: parse the document into an abstract syntax tree (AST), then analyze or manipulate that tree. However, this can add unnecessary complexity and runtime overhead. In many cases, it's more efficient to analyze the document while parsing it in a single pass.

If your primary goal is linting and performance is a top priority, it's often more efficient to analyze the document directly while parsing it, rather than first building an AST. By integrating parsing and analysis into a single pass through the document, you can avoid the additional complexity and runtime cost of constructing and traversing an intermediary tree structure.

Consider a linter that runs regexes on each link target in a file. It would be more efficient if it identified and processed the links while looping through the document, rather than first building an AST and then traversing it to find the links.

On the other hand, if your tool needs to perform more involved formatting or transformations, using an AST can provide a structured representation that simplifies these tasks. ASTs are particularly useful when working with third-party libraries or tools that provide AST-based APIs or when dealing with complex language grammars.

**Lesson:** When building high-performance text processing tools, consider your specific requirements. For analysis tasks like linting, integrating parsing and analysis can provide better performance by avoiding the overhead of an AST. For more complex formatting or transformations, leveraging an AST may be the better approach.

## Optimizations

There are several optimisations you can use to speed up your program’s processing time. Because most processing time goes into state checks, it is important that you skip them where it is possible to do so.

- **Don’t call unnecessary functions:** You can avoid function calls by using a hashmap or switch as in the above example to only call the functions relevant to the current character.
- **Skip `n` characters:** Sometimes you can be certain that the program doesn’t need to do anything with the next few characters. Perhaps you needed to lookahead five characters and have already pushed those characters to your buffers. Set an integer like `state.skips` to 5 that causes the loop to skip over the given number of characters.
- **Skip to character:** Similarly, you can make your main loop skip over any character that isn’t a match for a variable like `state.skipCharacter`. For example, when in a code snippet you might want to skip state checks on everything up to the next backtick. 

You could implement these checks in a single `shouldSkip()` function as in the above code snippet.

**Lesson:** Avoid calling state tracking functions where possible.

## Conclusion

The above sections outline the general approach I have taken when building tools to lint, format, and parse Markdown. The primary lessons are the following:

- **Time complexity:** Loop over every character in the file just once.
- **State:** Track the state of the document at every index.
- **Parse components:** Use buffers and changes in state to parse out the components in the document.
- **Common framework:** Build a general purpose program you can use in various contexts.
- **Tokenisation:** Don’t tokenise if not necessary.
- **Optimisations:** Skip state checks on characters where possible.
- **Avoid trees:** You don't always need an abstract syntax tree. You can increase performance by avoiding them. They are less useful for linters and more useful for converters.
