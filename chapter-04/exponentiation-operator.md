---
layout: default
title: Exploring ES2016 and ES2017 中文版
date: 2017-06-20
modifiedOn: 2017-06-25
---

<h2 id="ch_exponentiation-operator">Exponentiation operator (**)</h2>

求幂运算(**)是由Rick Waldron创造的一个ECMAScript 2016的特性。

<h3 id="_overview-1">概览</h3>

```js

> 6 ** 2
36

```

<h3 id="_an-infix-operator-for-exponentiation">为求幂运算创造的中缀运算符</h3>

**是一个为求幂运算创造的中缀运算符：

```js

x ** y

```

等同于：

```js

Math.pow(x, y)

```

实例如下:

```js

let squared = 3 ** 2; // 9

let num = 3;
num **= 2;
console.log(num); // 9

```

<h3 id="readmore">进一步阅读</h3>

[`Exponentiation Operator`](https://github.com/rwaldron/exponentiation-operator) (Rick Waldron)







