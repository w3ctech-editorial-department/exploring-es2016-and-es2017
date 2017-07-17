---
layout: default
title: Exploring ES2016 and ES2017 中文版
date: 2017-06-20
modifiedOn: 2017-06-21
---

<h2 id="introduction">介绍</h2>

- [读者在阅读之前需要知道的那些事](introduction/what-you-need-to-know-about-this-book.html#ch_about-book)
  - [本书的内容](introduction/what-you-need-to-know-about-this-book.html#_what-is-in-this-book)
  - [支持](introduction/what-you-need-to-know-about-this-book.html#_support)
- [关于作者](introduction/about-the-author.html)

<h2 id="background">背景</h2>
- [TC39制定ECMAScript特性的那些事](chapter-01/the-tc39-process-for-ecmascript-features.html#ch_tc39-process)
  - [ECMAScript规范，由谁来定](chapter-01/the-tc39-process-for-ecmascript-features.html#tc39)
  - [ECMAScript规范，如何制定](chapter-01/the-tc39-process-for-ecmascript-features.html#tc39-process)
    - [ECMAScript 2015（ES6）遇到最大的问题：版本的发布](chapter-01/the-tc39-process-for-ecmascript-features.html#_problem-ecmascript-2015-es6-was-too-large-a-release)
    - [解决之道：TC39 process](chapter-01/the-tc39-process-for-ecmascript-features.html#_solution-the-tc39-process)
  - [请你们不要把这些特性（随意）称为ECMAScript 20xx特性](chapter-01/the-tc39-process-for-ecmascript-features.html#_dont-call-them-ecmascript-20xx-features)
  - [深入阅读](chapter-01/the-tc39-process-for-ecmascript-features.html#_further-reading)

- [常见问题: ES2016 & ES2017](chapter-02/faq.html#ch_faq)
  - [ECMAScript 2016 是不是太过于精简](chapter-02/faq.html#_isnt-ecmascript-2016-too-small)

<h2 id="ecmascript-2016">ECMAScript 2016</h2>
- [Array.prototype.includes](chapter-03/array-prototype-includes.html)
  - [概览](chapter-03/array-prototype-includes.html#overview)
  - [数组方法：includes](chapter-03/array-prototype-includes.html#includes)
  - [经常问的问题](chapter-03/array-prototype-includes.html#problem)
  - [进一步阅读](chapter-03/array-prototype-includes.html#readmore)
- [Exponentiation operator (**)](chapter-04/exponentiation-operator.html)
  - [概览](chapter-04/exponentiation-operator#_overview-1)
  - [为求幂运算创造的中缀运算符](chapter-04/exponentiation-operator#_an-infix-operator-for-exponentiation)

<h2 id="async-functions">Async functions</h2>
- [异步函数](chapter-05/async-function.html#ch_async-functions)
  - [概览](chapter-05/async-function.html#_overview-2)
    - [函数变体](chapter-05/async-function.html#_variants)
    - [异步函数常返回 Promise 对象](chapter-05/async-function.html#_async-functions-always-return-promises)
    - [用 await 进行异步计算的结果处理和错误处理](chapter-05/async-function.html#_handling-results-and-errors-of-asynchronous-computations-via-await)
- [理解异步函数](chapter-05/async-function.html#_understanding-async-functions)
  - [通过 generator 来编写异步代码](chapter-05/async-function.html#_writing-asynchronous-code-via-generators)
  - [通过几个异步函数来编写异步代码](chapter-05/async-function.html#_writing-asynchronous-code-via-async-functions)
  - [以同步的方法开始，然后异步处理的异步函数](chapter-05/async-function.html#_async-functions-are-started-synchronously-settled-asynchronously)
  - [返回没有覆盖的 Promise 对象](chapter-05/async-function.html#_returned-promises-are-not-wrapped)
- [使用 await 的窍门](chapter-05/async-function.html#_tips-for-using-await)
  - [不要忘记使用 await](chapter-05/async-function.html#_dont-forget-await)
  - [不需要使用 await 的特殊情况](chapter-05/async-function.html#_you-dont-need-await-if-you-fire-and-forget)
  - [await 是连续执行的，Promise.all() 是并行的](chapter-05/async-function.html#_await-is-sequential-promiseall-is-parallel)
- [异步函数和回调](chapter-05/async-function.html#_async-functions-and-callbacks)
  - [Array.prototype.map()](chapter-05/async-function.html#_arrayprototypemap)
  - [Array.prototype.forEach()](chapter-05/async-function.html#_arrayprototypeforeach)
- [使用异步函数的窍门](chapter-05/async-function.html#_tips-for-using-async-functions)
  - [了解你使用的 Promise](chapter-05/async-function.html#_know-your-promises)
  - [立即调用异步函数表达式](chapter-05/async-function.html#_immediately-invoked-async-function-expressions)
  - [用异步函数进行单元测试](chapter-05/async-function.html#_unit-testing-with-async-functions)
  - [不要担心没有处理的拒绝态](chapter-05/async-function.html#_dont-worry-about-unhandled-rejections)
- [阅读延伸](chapter-05/async-function.html#_further-reading-2)

<h2 id="ecmascript-2017">ECMAScript 2017</h2>
- [函数定义和调用中的尾随逗号](chapter-10/index.html)
  - [概览](chapter-10/index.html#overview)
  - [对象和数组中的尾随逗号](chapter-10/index.html#trailing-commas)
  - [特性：允许函数定义和调用中的尾随逗号](chapter-10/index.html#feature)
{% comment %}

{% if site.posts.size != 0 %}

## 最新文章

{% for post in site.posts %}
* {{ post.date | date_to_string }} [{{ post.title }}]({{ post.url }})
{% endfor %}

{% endif %}

{% if site.pages.size != 0 %}

## 最新页面

{% for page in site.pages limit:5 %}
{% if page.url !='/index.html' %}
* [{{ page.title }}]( {{ page.url }})（{{ page.date }}）
{% endif %}
{% endfor %}

{% endif %}

{% endcomment %}
