---
layout: default
title: Exploring ES2016 and ES2017 中文版
date: 2017-06-20
modifiedOn: 2017-06-24
---

## Array.prototype.includes

本章描述了ECMAScript 2016的特征: “Array.prototype.includes” 方法（作者Domenic Denicola和Rick Waldron）

<h3 id="overview">概览</h3>

```js
> ['a', 'b', 'c'].includes('a')
true

> ['a', 'b', 'c'].includes('d')
false
```

<h3 id="includes">数组方法：includes</h3>

数组方法`includes`有以下定义：

```js
Array.prototype.includes(value : any) : boolean
```

`includes`方法用来判断一个数组是否包含一个指定的值，如果是，返回true否则返回false。

```js
> ['a', 'b', 'c'].includes('a')
true

> ['a', 'b', 'c'].includes('d')
false
```

`includes`方法与 `indexof`方法相似 -- 下面两个表达式几乎相等

```js
arr.includes(x)
arr.indexOf(x) >= 0
```

最主要的不同在于includes()方法可以查找 `NaN` ，而indexOf()方法不行：

```js
> [NaN].includes(NaN);
true
> [NaN].indexOf(NaN)
-1
```

`includes`不能区分 +0 和 -0 （[几乎所有的JavaScript都是如此工作](http://speakingjs.com/es5/ch11.html#two_zeros)）：

```js
> [-0].includes(+0)
true
```

类型化数组（Typed Arrays）也有 `includes()` 方法：

```js
let tarr = Uint8Array.of(12, 5, 3);
console.log(tarr.includes(5)); // true
```

<h3 id="problem">经常问的问题</h3>

1. 为什么这个方法称为 `includes` 而不是 `contains` ?
    
    后者（称为contains）是最初的选择，但是这将会破坏网络上的代码（[MooTools将这个方法添加到 `Array.prototype`](https://esdiscuss.org/topic/having-a-non-enumerable-array-prototype-contains-may-not-be-web-compatible)）。

2. 为什么这个方法称为 `include` 而不是 `has`?
    
    `has`已经被用于关键字了（Map.prototype.has），`includes` 已经用于元素（element）（String.prototype.includes）.集合的元素可以被看作为键和值，这就是为什么会有一个 `Set.prototype.has`方法（而没有 `includes`）.

3. ES6方法 [`String.prototype.includes`](http://exploringjs.com/es6/ch_strings.html#_checking-for-containment-and-repeating-strings) 适用于字符串，而不是字符。那么对于 `Array.prototype.includes` 方法而言，是不是存在不一致问题？
    
    如果数组的 `includes` 方法和字符串的 `includes` 方法工作机制一样，它应该接受数组，而不是单个元素。但是两个 `includes` 方法与 `indexOf` 方法的例子保持一致；作为一般情况，字符被视为特殊情况和任意长度的字符串。

<h3 id="readmore">进一步阅读</h3>

[`Array.prototype.includes`](https://github.com/tc39/Array.prototype.includes/) (Domenic Denicola, Rick Waldron)
