---
layout: default
title: exploring-es2016-and-es2017（中文版）
date: 2017-07-08
modifiedOn: 2017-07-08
---
<h2 id="async-func">异步函数</h2>

ES2017中新特性“Async Functions”（异步函数）是Brian Terlson提议的。

<h3 id="_c5-overview">5.1 概览</h3>
<p style="height: 5px;"></p>
<h4 id="_c5-variants">5.1.1 函数变体</h4>

以下是已经存在的各种异步函数变体。请注意出现的关键词
*async*。

 - 异步的函数声明：

 ```js
 async function foo() {}
 ```

 - 异步的函数表达式：

 ```js
 const foo = async function () {};
 ```

 - 异步函数的定义：

 ```js
 let obj = { async foo() {} }
 ```

 - 异步的箭头函数：

 ```js
 const foo = async () => {};
 ```

 <h4 id="_c5-return-promise">5.1.2 异步函数常用Promises返回</h4>

 异步函数Promises完成态

 ```js
 async function asyncFunc() {
    return 123;
}

asyncFunc().then(x => console.log(x));
// 123
 ```

 异步函数Promises拒绝态

 ```js
 async function asyncFunc() {
    throw new Error('Problem!');
}

asyncFunc().catch(err => console.log(err));//Error: Problem!
 ```
 <h4 id="_c5-await">5.1.3 用await进行异步计算的结果处理和错误处理</h4>

 *await*（只能在异步函数内部使用）等待操作对象Promise返回

 - 如果处于Promise完成态，*await* 结果是完成态的值。
 - 如果处于Promise拒绝态，*await*抛出错误值。

 处理只有一个返回值的异步函数

 ```js
 async function asyncFunc() {
    const result = await otherAsyncFunc();
    console.log(result);
}

// 等同于
function asyncFunc() {
    return otherAsyncFunc()
    .then(result => {
        console.log(result);
    });
}
 ```

 处理有多个返回值的异步函数

 ```js
 async function asyncFunc() {
    const result1 = await otherAsyncFunc1();
    console.log(result1);
    const result2 = await otherAsyncFunc2();
    console.log(result2);
}

// 等同于
function asyncFunc() {
    return otherAsyncFunc1()
    .then(result1 => {
        console.log(result1);
        return otherAsyncFunc2();
    })
    .then(result2 => {
        console.log(result2);
    });
}

 ```

 处理并行计算且有多个返回值的异步函数

 ```js
 async function asyncFunc() {
    const [result1, result2] = await Promise.all([
        otherAsyncFunc1(),
        otherAsyncFunc2(),
    ]);
    console.log(result1, result2);
}

// 等同于
function asyncFunc() {
    return Promise.all([
        otherAsyncFunc1(),
        otherAsyncFunc2(),
    ])
    .then([result1, result2] => {
        console.log(result1, result2);
    });
}
 ```

 错误处理：

 ```js
 async function asyncFunc() {
    try {
        await otherAsyncFunc();
    } catch (err) {
        console.error(err);
    }
}

// 等同于
function asyncFunc() {
    return otherAsyncFunc()
    .catch(err => {
        console.error(err);
    });
}

 ```

<h3 id="_c5-understand-async-func">5.2 理解异步函数</h3>
<p style="height: 5px;"></p>

在我解释异步函数之前，我需要解释一下Promises和generators可以组合使用，通过类似同步的方法实现异步操作。

<h4 id="_c5-variants">5.1.1 函数变体</h4>





 








