---
title: This website
tags:
  - open-source
---
## This site is different

This site is part "blog", part digital garden. I take the time to share about it here with the intention of inspiring you to write, or write more, and definitely ABP (always be publishing!)

> [!tip] Feature hightlights
> This site has a great search engine.
> 
> The Graph View is also a great discovery tool. Any dot that is grey signals pages you haven't visited yet.

### Blog

This site is a "blog" in the sense that, as I connect the dots between threads, weaving insights as I go, and feel called to share, they’ll appear in chronological order under [[thoughts/index|My Thinking]]. These pages are also meant to include a note to mark when something evolves. They look like a blog post, but to me they are just better-written notes listed in chronological order. I'm doing a mental exercise in not thinking of these notes as performative content and needing to be grandiose "blog posts". 

The primary purpose of this site is for me to think through ideas by writing them down, for having reference material close at hand, and for the expansion of my own thinking and comprehension through having a contextual retrieval mechanism. 

My unique way of connecting the dots is what I think of as my valuable contributions, not so much the content itself.

### Digital garden

In the well-articulated words of [Joel Hooks](https://joelhooks.com/digital-garden):

> [!quote]
> The phrase "digital garden" is a metaphor for thinking about writing and creating that focuses less on the resulting "showpiece" and more on the process, care, and craft it takes to get there.

Isolation stifles serendipity, renewal, and transformation. As it is so for humans, so it is for ideas. The digital garden part of this website is a living space where ideas, and resources related to those ideas, grow, evolve, cross-pollinate, and sometimes wither. The notes here aren’t endpoints, they’re seeds. Some will bloom into well-formed thinking to share, others may stay half-formed. 

They’re available for exploration in the left-side panel. I have them out in the open in case they help spark resonance or connection in your own thinking.

> [!success] Idea
> If something here connects with your thinking, it'd be awesome to hear about it either here in the comments section or in any other channel. I’m always curious to learn how others think about these topics: maybe similarly, maybe in wonderfully different ways.

> [!info] If you want to geek out on what a digital garden is...
> - [What is a digital garden?](https://www.thunknotes.com/blog/what-is-a-digital-garden)
> - [Digital gardens let you cultivate your own little bit of the internet | MIT Technology Review](https://www.technologyreview.com/2020/09/03/1007716/digital-gardens-let-you-cultivate-your-own-little-bit-of-the-internet/)
> - [Networked Thought - Jacky Zhao](https://jzhao.xyz/posts/networked-thought)

### Connecting ideas

This site is built for surfacing connections between thoughts, topics, resources, and insights. Notes are interlinked in multiple ways: through **bidirectional links** with a Wikipedia-like popover preview, "Mentioned by" **backlinks**, shared **tags**, and a dynamic **Graph View**.

These connections are useful to reveal relationships that might not be obvious at first glance, offering delicious threads to pull, revisit, or extend. But both notes and connections are very personal to me, so, YMMV.

> [!tip]
> Entries intended as blog posts and those meant as digital garden notes are color-coded for clarity and context.

## Tools used

All tools used in building and deploying this website are either open source or free for open source projects like this one.

### Deployment

If a [[git-history.png|picture]]  is worth a thousand words, what value lies in its absence? I'd say, sometimes, peace of mind. That's what I had when so much time passed between updating this website that I forgot how the deploys were being done.

See, I originally setup this site as only a placeholder for some stuff. My last real update was June 2021, and a really small one on April 2023. Comes May 2025 and I really did not have a mental picture for how I had the deploy system setup. I literally did not remember [Netlify](https://www.netlify.com/) was my trusted, and free, tool for deployments. Took me a minute to recall.

That, folks, is good and robust software. Set and forget.

Netflify extends the courtesy of free deploys to all open source bits. 🙏

### Site generator

I've been a heavy software user since forever. It is not everyday that a tool stands out above others AND amazes me. I decided to change to [Quartz](https://quartz.jzhao.xyz/) because it nicely met my needs to have a low friction digital garden, second brain style of website that I could track on a GH repo but also have it hooked to my single Obsidian vault. It offers some nice theme options and all the expected features, and then some. 

Generously created and open sourced by [jackyzha0 (Jacky Zhao)](https://github.com/jackyzha0). 🙏

What really makes it shine as a unique, well-thought out system, imo, is it's philosophy, particularly the "**A garden should be your own**":
> [!quote]
> "At its core, Quartz is designed to be easy to use enough for non-technical people to get going but also powerful enough that senior developers can tweak it to work how they’d like it to work."

Simple enough and even sorta trivial-sounding. But it wasn't until I was deep in the weeds that I finally [[Grokking|grokked]] it: following it's clean software design patterns, I wasn't only changing the many available configurations. I was also directly changing the source code itself. No forks, no PRs. Just me, reshaping the system to fit my needs. _That’s_ what Jacky meant. I know any open source code can be changed and used this way, but this felt different. It was built with that intention. Source code modifications are not only a possibility, they’re intentionally made to be as frictionless as editing content. Future major Quartz updates might bring some merge conflict headaches. Totally worth it.

[Philosophy of Quartz](https://quartz.jzhao.xyz/philosophy)

#### My favorite feature

Quarts has a `sync` command that will track all new changes and push it all to the git repository. This is not unique to this site generator, but I really want to emphasize how nice it is to be able to update a bunch of content, pop up a floating terminal window, and sync it with the live branch. No need to sort out logical batches of changes, or think about git commit messages. Just "hit publish." A git commit gets logged for the operation which, obviously, can be reverted like any git commit. The `sync` command also has a default commit message that can be overwritten. Zero friction.

If you ever want to do individual `git commit` on the content, that is always an option.

### Comments

I found it ingenious that a tool would hook comments on my pages directly to GH comments. That's what [giscus](https://giscus.app/) does, helping keep everything where I already am (GitHub.) I love it that they have a bunch of themes to choose from to closely match the theme of my site. And that [Quartz](https://quartz.jzhao.xyz/) directly integrates it makes it even easier to incorporate. 🙏

My favorite feature: I can turn comments on/off per page!

### Editing

Any markdown editor will work. I happen to prefer these, which I use interchangeably, and sometimes simultaneously:

- Nvim (my dotfiles here: [dotfiles/nvim/.config/nvim at main · carlisia/dotfiles](https://github.com/carlisia/dotfiles/tree/main/nvim/.config/nvim))
- Obsidian
