---
layout: default
title: exploring-es2016-and-es2017（中文版）
date: 2017-07-08
modifiedOn: 2017-07-22
---
## 8. 新的字符串方法：`padStart` 和 `padEnd`

本章讲解了 ECMAScript 2017 特性[“字符串填充 (String padding)”](https://github.com/tc39/proposal-string-pad-start-end)，该特性是由 Jordan Harband 和 Rick Waldron 提出的。

### 8.1 概览
ECMAScript 2017 有两个新的字符串方法：

```js
> 'x'.padStart(5, 'ab')
'ababx'
> 'x'.padEnd(5, 'ab')
'xabab'
```

### 8.2 为什么使用填充字符串？
填充字符串 (padding strings) 的常见使用场景包括：
- 以等宽字体显示表格数据
- 给文件名或 URL 地址增加一个计数或ID：如 'file 001.txt'
- 对齐控制台输出： 如 'Test 001: ✓'
- 打印具有固定数字位数的十六进制或二进制数字：如 '0x00FF'

### 8.3 String.prototype.padStart(maxLength, fillString=' ')
该方法（不断地）在字符串的首部增加新的字符串 `fillString` ，直到其总长度达到 `maxLength` 为止：

```js
> 'x'.padStart(5, 'ab')
'ababx'
```

当需要时，使用 `fillString` 的一个片段，使得结果的长度正好是 `maxLength`：

```js
> 'x'.padStart(4, 'ab')
'abax'
```

如果字符串的长度大于或等于 `maxLength`， 则返回它本身：

```js
> 'abcd'.padStart(2, '#')
'abcd'
```

如果 `maxLength` 和 `fillString` 相同，则 `fillString` 成为一个蒙版 (mask)，并将字符串插入到蒙版的尾部：

```js
> 'abc'.padStart(10, '0123456789')
'0123456abc'  
```

如果你省略 `fillString`，则使用含有单个空格的字符串 (`' '`) 进行填充：

```js
> 'x'.padStart(3)
'  x'
```

#### 8.3.1 `padStart()` 的一个简单实现
以下实现让你大概了解 `padStart()` 是如何工作的，但它（对于一些边缘情况来说）不完全符合规范。

```js
String.prototype.padStart =
function (maxLength, fillString=' ') {
    let str = String(this);
    if (str.length >= maxLength) {
        return str;
    }

    fillString = String(fillString);
    if (fillString.length === 0) {
        fillString = ' ';
    }

    let fillLen = maxLength - str.length;
    let timesToRepeat = Math.ceil(fillLen / fillString.length);
    let truncatedStringFiller = fillString
        .repeat(timesToRepeat)
        .slice(0, fillLen);
    return truncatedStringFiller + str;
};
```

### 8.4 String.prototype.padEnd(maxLength, fillString=' ')

`padEnd()` 的工作方式与 `padStart()` 类似，但不是在字符串首部插入重复的 `fillString`，而是在尾部插入：

```js
> 'x'.padEnd(5, 'ab')
'xabab'
> 'x'.padEnd(4, 'ab')
'xaba'
> 'abcd'.padEnd(2, '#')
'abcd'
> 'abc'.padEnd(10, '0123456789')
'abc0123456'
> 'x'.padEnd(3)
'x  '
```

`padEnd()` 的实现跟 `padStart()` 的相比，只有最后一行不同：

```js
return str + truncatedStringFiller;
```

### 8.5 常见问题
#### 8.5.1 为什么这两个填充方法不命名为 `padLeft` 和 `padRight`?

对于双向或从右到左排列的语言，`left (左边)` 和 `right (右边)` 这两个说法不能正常使用。因此，`padStart` 和 `padEnd` 的命名沿用了现有的方法名`startsWith` 和 `endsWith` 的设计。
