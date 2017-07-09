---
layout: default
title: Exploring ES2016 and ES2017 中文版
date: 2017-07-09
modifiedOn: 2017-07-09
---
<h2 id="ch_trailing-commas">函数定义和调用中的尾随逗号</h2>
ECMAScript 2017 中的 “函数定义和调用中的尾随逗号”这条特性由 Jeff Morrison 提议。

<h3 id="overview">概述</h3>
函数定义时的尾随逗号是不合法的。

```js
function foo(
    param1,
    param2,
) {}
```

与此相似，函数调用时的尾随逗号也是不合法的。

```js
foo(
    'abc',
    'def',
);
```

<h3 id="trailing-commas">对象和数组中的尾随逗号</h3>
对象字面量中的尾随逗号会被忽略。

```js
let obj = {
    first: 'Jane',
    last: 'Doe',
};
```

在数组字面量里也同样被忽略。

```js
let arr = [
    'red',
    'green',
    'blue',
];
console.log(arr.length); // 3
```

这个特性有什么用处？主要有两个优点。

首先，重新排列元素变得更简单，因为如果要改变位于最后位置的元素位置，你不需要去添加或者删除逗号。
其次，它可以帮助版本控制系统，跟踪真实改变的地方。比如，我们将：

```js
[
    'foo'
]
```

改为：

```js
[
    'foo',
    'bar'
]
```
这会导致 'foo' 和 'bar' 这两行都被标志位改动状态，即使真实的改变只是加了后面这一行。

<h3 id="feature">特性：允许函数定义和调用中的尾随逗号</h3>
得益于可选及可被忽略的尾随逗号，这个特性也将这一优点带到函数定义和调用里。

比如，下面的函数声明在 ECMAScript 6 中将会导致语法错误（SyntaxError），但是现在是合法的：

```js
function foo(
    param1,
    param2,
) {}
```

与此相似，foo() 的调用也将是合法的：

```js
foo(
    'abc',
    'def',
);
```
