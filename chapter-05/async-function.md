---
layout: default
title: exploring-es2016-and-es2017（中文版）
date: 2017-07-08
modifiedOn: 2017-07-08
---
<h2 id="ch_async-functions">异步函数</h2>

ES2017中新特性“Async Functions”（异步函数）是 Brian Terlson 提议的。

<p style="height: 5px;"></p>
<h3 id="_overview-2">概览</h3>
<p style="height: 5px;"></p>
<h4 id="_variants">函数变体</h4>

以下是已经存在的各种异步函数变体。请注意出现的关键词
*async*。

 - 异步函数声明：

 ```js
 async function foo() {}
 ```

 - 异步函数表达式：

 ```js
 const foo = async function () {};
 ```

 - 异步函数定义：

 ```js
 let obj = { async foo() {} }
 ```

 - 异步箭头函数：

 ```js
 const foo = async () => {};
 ```

 <h4 id="_async-functions-always-return-promises">异步函数常返回Promise对象</h4>

 异步函数 Promise 完成态

 ```js
 async function asyncFunc() {
    return 123;
}

asyncFunc().then(x => console.log(x));
// 123
 ```

 异步函数 Promise 拒绝态

 ```js
 async function asyncFunc() {
    throw new Error('Problem!');
}

asyncFunc().catch(err => console.log(err));//Error: Problem!
 ```
 <h4 id="_handling-results-and-errors-of-asynchronous-computations-via-await">用 await 进行异步计算的结果处理和错误处理</h4>

 *await*（只能在异步函数内部使用）等待操作对象 Promise 返回

 - 如果处于 Promise 完成态，*await* 结果是完成态的值。
 - 如果处于 Promise 拒绝态，*await* 抛出错误值。

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

<p style="height: 5px;"></p>
<h3 id="_understanding-async-functions">理解异步函数</h3>
<p style="height: 5px;"></p>

在我解释异步函数之前，我需要解释一下 Promise 和 generator 可以组合使用，通过类似同步的方法实现异步操作。

ES6中的 Promise 在只有一次计算结果的异步函数中是很常用的。有一个典型的例子就是[客户端的fetch API](https://fetch.spec.whatwg.org/#concept-request)，对于XMLHttpRequest获取到的资源文件进行选择性处理。以下是示例：

```js
function fetchJson(url) {
    return fetch(url)
    .then(request => request.text())
    .then(text => {
        return JSON.parse(text);
    })
    .catch(error => {
        console.log(`ERROR: ${error.stack}`);
    });
}
fetchJson('http://example.com/some_file.json')
.then(obj => console.log(obj));
```
<h4 id="_writing-asynchronous-code-via-generators">通过 generator 来编写异步代码</h4>

co 是一个通过 Promise 和 generator 来实现类同步操纵的库，以下是示例：

```js
const fetchJson = co.wrap(function* (url) {
    try {
        let request = yield fetch(url);
        let text = yield request.text();
        return JSON.parse(text);
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
});
```

每次回调函数（generator函数）的结果产生 Promise 对象给 co，回调暂停，只有在 Promise 执行完成后，co 才会继续执行回调。如果 Promise 处于完成态，*yield* 返回完成态的结果，如果处于拒绝态，*yield* 抛出拒绝态的错误。此外，co 保证结果是通过回调执行完成才返回的（类似于 *then()* 所做的工作）。

<h4 id="_writing-asynchronous-code-via-async-functions">通过几个异步函数来编写异步代码</h4>

和 co 的语法类似，异步函数主要也是用特定语法：

```js
async function fetchJson(url) {
    try {
        let request = await fetch(url);
        let text = await request.text();
        return JSON.parse(text);
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
}
```

在异步函数内部，写法更类似于generator。

<h4 id="_async-functions-are-started-synchronously-settled-asynchronously">以同步的方法开始，然后异步处理的异步函数</h4>

以下是异步函数是如何工作的：

1、异步函数的结果总是返回一个 Promise 对象 *p* 。Promise 对象在异步函数开始执行的时候被创建。

2、函数体执行过程中，只有遇到 *return* 或者 *throw* 的时候会终止执行，或者遇到 *await* 的时候临时终止执行，等待一段时间后继续执行。

3、返回Promise对象*p*。

当执行异步函数的函数体的时候，*return x* 是 Promise 对象 *p* 的完成态结果，*throw err* 是 *p* 的拒绝态结果。执行结果是异步返回的，也就是说，*then()* 和 *catch()* 通常在当前的代码已经执行完毕之后才进行回调。

以下是代码示例：

```js
async function asyncFunc() {
    console.log('asyncFunc()'); // (A)
    return 'abc';
}
asyncFunc().
then(x => console.log(`Resolved: ${x}`)); // (B)
console.log('main'); // (C)

// Output:
// asyncFunc()
// main
// Resolved: abc
```

归纳为以下内容：

1、（第A行）异步函数以同步开始，异步函数的Promise对象通过 *return* 返回完成态结果。

2、（第C行）继续执行。

3、（第B行）Promise异步产生处理结果。


<h4 id="_returned-promises-are-not-wrapped">返回没有覆盖的 Promise 对象</h4>

Promise 的处理是有操作标准的，按照标准，应该用 *return* 返回 Promise 的完成态 *p* ，这就意味着：

1、用 *return* 返回的值被 Promise 处理成完成态 *p* 。

2、用 *return* 返回 Promise 对象 *p* 此时相当于处于 Promise 状态下。

否则，你可以返回 Promise 的函数执行，但是这个执行的结果不会被覆盖在异步函数中。以下是代码示例：

```js
async function asyncFunc() {
    return Promise.resolve(123);
}
asyncFunc()
.then(x => console.log(x)) // 123
```

有趣的是，返回一个拒绝态的 Promise 对象会导致异步函数的执行结果被拒绝。（通常情况下，用*throw*返回结果）：

```js
async function asyncFunc() {
    return Promise.reject(new Error('Problem!'));
}
asyncFunc()
.catch(err => console.error(err)); // Error: Problem!
```

这和Promise的解决方案类似，使你能够在不使用 *await* 的情况下，使用其他异步计算的完成处理和拒绝处理：

```js
async function asyncFunc() {
    return anotherAsyncFunc();
}
```

上面的代码示例和下面的类似，但是比下面的更高效。（以下代码示例没有用Promise 覆盖 *anotherAsyncFunc()* ）：

```js
async function asyncFunc() {
    return await anotherAsyncFunc();
}
```

<p style="height: 5px;"></p>
<h3 id="_tips-for-using-await">使用 await 的窍门</h3>
<p style="height: 5px;"></p>
<h4 id="_dont-forget-await">不要忘记使用 await </h4>

在异步函数中容易犯的一个错误就是在方法调用中忘记使用 *await* ：

```js
async function asyncFunc() {
    const value = otherAsyncFunc(); // missing `await`!
    ···
}
```

在这个例子中，方法执行返回的 Promise 对象赋值给了 *value* ，这个 *value* 通常不是你想要的最终结果。

*await* 甚至可以在异步函数不返回任何值的情况下起作用。Promise 简单作为标示使用告诉调用者执行已经完成。以下是代码示例：

```js
async function foo() {
    await step1(); // (A)
    ···
}
```

 第A行的 *await* 关键字保证了 *step1()* 这个方法是在 *foo()* 方法执行之前已经完成执行。


<h4 id="_you-dont-need-await-if-you-fire-and-forget">不需要使用 await 的特殊情况</h4>

有时候你只需要触发一个异步计算，而对于这个计算什么时候完成并不感兴趣。以下是代码示例：
```js
async function asyncFunc() {
    const writer = openFile('someFile.txt');
    writer.write('hello'); // don’t wait
    writer.write('world'); // don’t wait
    await writer.close(); // wait for file to close
}
```

在这里，你不需要关心每行的写入操作是否完成，只需要保证写入操作准确执行（ API 保证了写入准确性，如我们所见，在异步函数的执行模型中已经有了相关示例）

*asyncFunc()* 函数最后一行的 *await* 保证了只有在文件写入完毕之后 *close()* 方法才会执行。

在上面的代码中，返回的 Promise 没有覆盖，你可以用 *return* 替换掉 *await writer.close()* ：

```js
async function asyncFunc() {
    const writer = openFile('someFile.txt');
    writer.write('hello');
    writer.write('world');
    return writer.close();
}
```

两种方式利弊共存，*await* 那种写法理解起来更容易。


<h4 id="_await-is-sequential-promiseall-is-parallel">await 是连续执行的，Promise.all() 是并行的</h4>

下面的代码做了两种异步函数的调用，用 *asyncFunc1()* 和 *asyncFunc2()* 来表示。

```js
async function foo() {
    const result1 = await asyncFunc1();
    const result2 = await asyncFunc2();
}
```

这两个函数是顺序执行的，如果想平行执行来加快执行速度的话，你可以用 *Promise.all()* 这个方法，以下是代码示例：

```js
async function foo() {
    const [result1, result2] = await Promise.all([
        asyncFunc1(),
        asyncFunc2(),
    ]);
}
```

有一种方法是等待两个 Promise 完成之后再做其他。而这里我们使用的方法是等待一个Promise的完成，将结果存储在有两个元素的数组中，然后再做其他操作。

<p style="height: 5px;"></p>
<h3 id="_async-functions-and-callbacks">异步函数和回调</h3>
<p style="height: 5px;"></p>

异步函数的一个限制是 *await* 只影响被其直接覆盖的函数（ *await* 作为函数关键字）。否则，异步函数不能在回调中使用 *await* （但是回调函数可以异步调用自己，后面我们将重点介绍）。这也意味着我们可以有技巧地使用以回调为主的函数方法。例子中我们将使用数组方法 *map()* 和 *forEach()* 。

<h4 id="_arrayprototypemap">Array.prototype.map()</h4>

我们用数组方法 *map()* 开始讲解。在下面的代码示例中，我们想要下载以数组方式存储的一系列 URL 中的文件，然后用数组的方式返回下载好的文件。

```js
async function downloadContent(urls) {
    return urls.map(url => {
        // Wrong syntax!
        const content = await httpGet(url);
        return content;
    });
```

上面的写法并不起作用，因为 *await* 在语法上并不能修饰函数内部的方法（只对 *downloadContent()* 这个直接修饰的方法有效）。那如果使用一个异步的箭头函数呢？

```js
async function downloadContent(urls) {
    return urls.map(async (url) => {
        const content = await httpGet(url);
        return content;
    });
}
```

上面的代码有两个问题：
 - 返回的结果是数组形式的 Promise 对象而不是数组形式的 string 对象。

 - 当 *map()* 函数结束之后，回调执行并不能结束，因为 *await* 只有在覆盖的箭头函数执行完成，以及异步执行的 *httpGet()* 达到完成态之后才会结束。这也意味着你不能使用 *await* 来等待 *downloadContent()* 执行结束。

我们可以使用 *Promise.all()* 来解决上面的两个问题，可以将数组形式的 Promise 对象转化为一个 Promise 对象形式的数组（所有值都是经过 Promise 完成并返回）。

 ```js
 async function downloadContent(urls) {
    const promiseArray = urls.map(async (url) => {
        const content = await httpGet(url);
        return content;
    });
    return await Promise.all(promiseArray);
}
 ```

*map()* 的回调并不对 *httpGet()* 的结果起作用，只是起到不断执行的作用。因此，这里我们不需要一个异步的箭头函数，只需要一个普通的箭头函数就能达到相同的结果。

```js
async function downloadContent(urls) {
    const promiseArray = urls.map(
        url => httpGet(url));
    return await Promise.all(promiseArray);
```

这里我们做了一个小小的改进：这个异步函数有点低效，它首先使用的 *await* ，但是没有全部覆盖 *Promise.all()* 的结果，后来通过 *return()* 来实现结果覆盖，因此我们可以直接返回 *Promise.all()* 的结果。

```js
async function downloadContent(urls) {
    const promiseArray = urls.map(
        url => httpGet(url));
    return Promise.all(promiseArray);
}
```

<h4 id="_arrayprototypeforeach">Array.prototype.forEach()</h4>

我们使用另一个数组方法 *forEach()* 来打印通过一组 URL 下载的文件的内容：

```js
async function logContent(urls) {
    urls.forEach(url => {
        // Wrong syntax
        const content = await httpGet(url);
        console.log(content);
    });
}
```

同样的，这里的代码会产生一个语法错误，你不可以在非异步的箭头函数内部使用 *await* 。

我们换用异步箭头函数：

```js
async function logContent(urls) {
    urls.forEach(async url => {
        const content = await httpGet(url);
        console.log(content);
    });
    // Not finished here
}
```

这段代码起作用了，但是会出现一个警告：*hhtpGet()* 返回的 promise 对象是异步完成的，这也意味着当 *forEach()* 返回的时候回调可能还没有结束，所以最终你无法等到 *logContent()* 函数执行完成。

如果你并不想要这个结果，你可以在一个 *for-of* 循环中达到和 *forEach()* 相同的功能。

```js
async function logContent(urls) {
    for (const url of urls) {
        const content = await httpGet(url);
        console.log(content);
    }
}
```

上面的代码保证了在 *for-of* 循环结束之后所有的函数都执行完成了。但是执行过程是循序的：*httpGet()* 只有在第一次完成之后才会继续第二次执行。如果你希望执行过程是并行的，你必须使用 *Promise.all()* ：

```js
async function logContent(urls) {
    await Promise.all(urls.map(
        async url => {
            const content = await httpGet(url);
            console.log(content);
        }));
}
```

*map()* 用来创建数组形式的 Promise 对象集合。我们对完成的结果并不感兴趣，只需要等待 *await* 的所有方法执行完成，也就是说我们希望的是在异步函数完成之后所有的执行都已经完成了。我们也可以返回 *Promise.all()* ，但是结果可能是数组中的元素都是未完成状态的。

<p style="height: 5px;"></p>
<h3 id="_tips-for-using-async-functions">使用异步函数的窍门</h3>
<p style="height: 5px;"></p>
<h4 id="_know-your-promises">了解你使用的 Promise </h4>

异步函数的基础就是 Promise 对象，所以理解 Promise 比理解 *await* 更重要。特别是当遇到老代码不是用 Promise 来实现异步函数的时候，你别无选择，只能用 Promise 来重构。

举个例子，这里有个 “promisified” 版本的 *XMLHttpRequest* ：

```js
function httpGet(url, responseType="") {
    return new Promise(
        function (resolve, reject) {
            const request = new XMLHttpRequest();
            request.onload = function () {
                if (this.status === 200) {
                    // Success
                    resolve(this.response);
                } else {
                    // Something went wrong (404 etc.)
                    reject(new Error(this.statusText));
                }
            };
            request.onerror = function () {
                reject(new Error(
                    'XMLHttpRequest Error: '+this.statusText));
            };
            request.open('GET', url);
            xhr.responseType = responseType;
            request.send();
        });
}
```

*XMLHttpRequest* 的 API 是基于回调的。通过一个异步函数来保证完成意味着你不得不在内部的回调中完成处理或者拒绝操作。那是不可能的，因为你只能通过 *return* 或者 *throw* 来完成这样的操作，同样你也不能在一个回调中 *return* 一个方法执行的结果，*throw* 也是一样的道理。

因此，你要遵循下面的编程规范：
 - 立即使用 Promise 对象来构建异步函数主体部分
 - 用异步函数来构建函数主体

阅读延伸：“Exploring ES6”中章节 [“异步编程中的Promise对象”](http://exploringjs.com/es6/ch_promises.html)

<h4 id="_immediately-invoked-async-function-expressions">立即调用异步函数表达式</h4>

有时候在模块或者脚本的顶级区域使用 *await* 是一种很好的选择。当然也只影响异步函数内部。因此你有几种选择。你可以创建一个异步函数 *main()* ，然后立即调用：

```js
async function main() {
    console.log(await asyncFunction());
}
main();
```

你也可以立即执行函数表达式：
```js
(async function () {
    console.log(await asyncFunction());
})();
```

另一个选择是立即执行箭头函数：
```js
(async () => {
    console.log(await asyncFunction());
})();
```

<h4 id="_unit-testing-with-async-functions">用异步函数进行单元测试</h4>

以下代码使用[测试框架mocha](https://mochajs.org/) 来测试异步函数 *asyncFun1()* 和 *asyncFun2()* ：

```js
import assert from 'assert';

// Bug: the following test always succeeds
test('Testing async code', function () {
    asyncFunc1() // (A)
    .then(result1 => {
        assert.strictEqual(result1, 'a'); // (B)
        return asyncFunc2();
    })
    .then(result2 => {
        assert.strictEqual(result2, 'b'); // (C)
    });
});
```

这个测试总是成功的，因为 mocha 不会等待 B 行和 C 行断言执行完成。

你可以用过返回链式调用的 Promise 来解决这个问题，因为当测试返回 Promise 对象的时候 mocha 会识别出来，等待 Promise 对象完成再进行下一步（除非超时了）。

```js
return asyncFunc1() // (A)
```

异步函数总是返回 Promise 对象，所以很容易进行测试。

```js
import assert from 'assert';
test('Testing async code', async function () {
    const result1 = await asyncFunc1();
    assert.strictEqual(result1, 'a');
    const result2 = await asyncFunc2();
    assert.strictEqual(result2, 'b');
});
```

mocha 单元测试异步函数有两个优势：代码更精简，能够准确处理返回的 Promise 对象。

<h4 id="_dont-worry-about-unhandled-rejections">不要担心没有处理的拒绝态</h4>

当前的 JavaScript 引擎可以在拒绝态未处理的情况下提出警告。以下代码在过去会经常执行失败，但是当前的 JavaScript 引擎可以进行警告：
```js
async function foo() {
    throw new Error('Problem!');
}
foo();
```


<p style="height: 5px;"></p>
<h3 id="_further-reading-2">阅读延伸</h3>
<p style="height: 5px;"></p>

 - [异步函数](https://github.com/tc39/ecmascript-asyncawait) （提出者Brian Terlson）
 - [通过generators来简化异步计算](http://exploringjs.com/es6/ch_generators.html#sec_co-library)（“Exporing ES6”中的部分章节）