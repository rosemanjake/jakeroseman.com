---
title: "The Fix-Everything Button"
subtitle: "Programming is over."
date: 2026-11-22
category: tech
---

When I was a teenager, I flirted with programming a few times. Around 2008, I
torrented a C++ textbook and a cracked copy of Visual Studio. The first chapter
of the book immediately started with an in-depth discussion of static functions
and classes and I had absolutely no idea what any of it meant. I didn’t get so
far as a hello world. I decided that programming was for people more intelligent
and talented than me. I just didn’t get it.

I retained that feeling throughout the rest of school and all of university.
Over the years whenever I met professional developers and software engineers I
always felt jealous that they had figured it all out, not least because it was
so clearly a great source of income. In 2018 when I interviewed at a FinTech
company in London, I looked past the meeting rooms and into the open space where
the engineers had monitors covered in dark mode IDEs. I felt distinctly
intimidated.

The FinTech company hired me to do technical writing, copywriting, and bid
writing. However, everyone around me was either an engineer or a mathematician.
Those who weren’t would nevertheless freely discuss VARCHARs and FLOATs. I felt
quite out of place.

When I joined the company, all of the technical documents were maintained within
[InDesign](https://en.wikipedia.org/wiki/Adobe_InDesign) projects, which was of
course not a very good idea. A senior engineer had the idea of using
[Markdown](https://en.wikipedia.org/wiki/Markdown). He built a simple service
that wrapped around [Pandoc](https://pandoc.org/) to convert Markdown files into
HTML that we could directly display within the company’s web app. I suddenly and
immediately had a clear idea of how programming could be relevant directly to
what I was doing, and I wanted to learn more.

I learnt [LaTeX](https://en.wikipedia.org/wiki/LaTeX) to help with laying out
some formal mathematical papers, and one colleague was impressed by a
[TikZ](https://en.wikipedia.org/wiki/PGF/TikZ) diagram I made. That gave me a
bit of a confidence boost, and I decided I should learn C# to better understand
what everyone else was doing.

I have always loved historical linguistics, so somehow I settled on the idea of
building a little program that would take a list of
[Proto-Indo-European](https://en.wikipedia.org/wiki/Proto-Indo-European_language)
(PIE) roots and apply
[Grimm’s Law](https://en.wikipedia.org/wiki/Grimm%27s_law),
[Verner’s Law](https://en.wikipedia.org/wiki/Verner%27s_law), and other sound
changes that caused PIE to develop into
[Proto-Germanic](https://en.wikipedia.org/wiki/Proto-Germanic_language). By the
time I was thinking about the idea, it was early 2020.

After being locked up inside for most of the year, I returned to the idea in
September 2020. I wanted to make a real attempt at it and told my now-wife about
what I wanted to do. She said “use a loop”. I had a vague sense of what a while
loop was, but I had never heard of a for loop.

As it was, I wrote a foreach loop in C# that iterated over a list of strings and
applied a [regular expression](https://en.wikipedia.org/wiki/Regular_expression)
replacement to them. I had never actually fully understood that in programming a
core operation was just iterating over a list of elements and applying some
transformation to them. I saw straight away that, in fact, it was the only real
operation any program ever does. It will seem very silly, but in that moment I
experienced the strongest and clearest epiphany of my life. I was so excited I
struggled to sleep that night. Using a loop for the first time was the missing
piece. Finally, I got it.

I had always thought that programming would have the same sensation as slogging
through trigonometry problems. Instead, programming felt to me like writing a
poem in an ancient forgotten language that uses an unusual but very beautiful
metre. The flow state was incredible. I had never exercised my working memory so
completely, nor experienced that level of focus. In a somewhat manic state,
programming quickly and with loud music, I at some point realised that before
this I had never truly challenged myself in my life.

From that point until my daughter was born three years later, I spent almost all
my spare time programming. I found genuinely useful ways to automate my work
with C#, and increasingly spent my time at work programming. I made plenty of
mistakes in those days. I shunned books and tutorials to a fault. All I wanted
to do was build. Looking back, I can see that I could have saved myself quite a
lot of time if I had just read a few books and discovered some shortcuts.

I used my budding confidence to move to Google in August 2021, where I joined
the Android technical writing team. It was an environment where I could write
and read code in the course of technical writing, where I was encouraged to
automate my work, and where I could learn from real engineers. As a result, the
speed at which I was learning increased enormously.

I picked up a few projects at Google, many of which have been successful, but
none has been as successful as the Markdown
[linter](<https://en.wikipedia.org/wiki/Lint_(software)>) I built in
[Kotlin](https://kotlinlang.org/). I started work on it around the start
of 2022. At first, it was a basic linter for the Android docs, integrated into
Google’s linter service. By early 2025, it was Google’s Markdown linter, running
on virtually all Markdown files across the company’s
[monorepo](https://en.wikipedia.org/wiki/Monorepo). Today, with Markdown prompts
and skills load-bearing for real production systems, the Markdown linter is the
second most-used linter in Google, behind only the Python linter.

The linter taught me much of what I know. It began its life as a small and quite
naive [state machine](https://en.wikipedia.org/wiki/Finite-state_machine). Over
time it grew into something else. I implemented all manner of core data
structures and algorithms: [tries](https://en.wikipedia.org/wiki/Trie),
[bitmasks](<https://en.wikipedia.org/wiki/Mask_(computing)>),
[linked lists](https://en.wikipedia.org/wiki/Linked_list), countless linear
string traversals, and many excruciating regular expressions. I hand-coded all
of it. I spent thousands of hours typing in flow states, running tests, stepping
through functions with a debugger, and facing issues I thought I could never
fix, but which somehow I always did.

Many of the things I learnt weren’t even necessarily about programming. For
example, it taught me the correct scope of a changelist (pull request), the
delicate etiquette of code review, and the absolute necessity of full test
coverage.

It was the most challenging, interesting, and intellectually stimulating thing I
had ever done. I would get up in the morning excited to check my bug queue,
hoping that there would be something fun to work on. And the best thing about it
all was that it actually worked. It wasn’t a toy project. It became a real
production application within a major tech company with 100,000 users.

That is all finished now. Done. I’ll never see a bug, know the exact function
causing it, and then have a great deal of fun handcrafting an algorithm to solve
it. When trying to solve a problem, there is now a magical fix-everything button
well within reach at all times. It is impossible to resist.

I’m currently rewriting my artisanally handwritten Kotlin in
[Go](https://go.dev/). [Claude](https://www.anthropic.com/claude) has already
shipped an initial version. I didn’t write any of the Go myself. However, there
were a few other interesting things that I did do. I decided on the stack,
designed the overall architecture of the parser, determined how findings should
be declared, and shaped the way that it can all be customised through configs. I
applied all the painful lessons I had learnt from beating my Kotlin into shape.

The result is a much better piece of software. It is more performant, more
extensible, and more flexible than the code that I wrote by hand. But it would
not exist if it weren’t for my initiative and my ideas. Claude didn’t start a
session by itself and decide on its own that a natively multi-dialect Markdown
parser was the right base for Google’s Markdown tooling. It is something that I
have been wanting to do for a long time. If I had done it the old way, it
probably would have taken me at least six months of full-time work. And if I had
changed my mind about some architectural design halfway through, it would have
wreaked absolute havoc.

I haven’t written a line of code in months, and that’s OK. I am grateful for the
time I spent learning programming at what now seems like a shockingly low level,
even though it didn’t seem so at the time. The agents haven’t stolen programming
from me. They have saved me from spending so much time fiddling with minutiae. I
now make bigger, wider-reaching, and more interesting decisions than how best to
optimise a string traversal that will be sufficiently fast one way or another.

I miss taking a high dose of caffeine, blasting loud music, and spending all
evening building something challenging. We too often make the mistake of
thinking that our highest calling is to step through individual functions with a
debugger and be tortured for hours by particularly tricky bugs. The
fix-everything button is right there and I’m going to keep pressing it, over and
over again.
