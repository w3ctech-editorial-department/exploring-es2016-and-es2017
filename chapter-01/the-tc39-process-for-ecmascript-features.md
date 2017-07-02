---
layout: default
title: Exploring ES2016 and ES2017 中文版
date: 2017-06-20
modifiedOn: 2017-06-29
---
<h2 id="ch_tc39-process">关于TC39 ECMAScript特性的流程那些事</h2>

该章（的篇幅主要是用于）解释所谓的（so-called）TC39 process，（那么问题来了，TC39 process到底能干啥？简单来讲，那就是），TC39 process可以主导（govern）ECMAScript特性规范的制定，（忘记说了），这还是从ECMAScript 2016 （ES7）开始的呢。

<h3 id="tc39">ECMAScript规范，由谁来定</h3>
答案：TC39（Technical Committee 39）。

[TC39](http://www.ecma-international.org/memento/TC39.htm)，是一个专注于推动JavaScript发展的技术委员会。（忘记说了），一些公司都是TC39的会员（当然，这其中也不乏一些主流的浏览器厂商）。另外，[TC39也会定期召开一些会议](http://www.ecma-international.org/memento/TC39-M.htm)，（在会议开始之前），TC39会邀请一些特邀专家，当然TC39会员也会选派代表出席这次会议。（在会议结束后），TC39会把会议记录放到[网上](https://github.com/tc39/tc39-notes)，以便于我们更好的了解TC39工作流程。

有时（甚至是在这书中），你会注意到，“TC39会员”词条经常会提到一些人。（不过，你也不用大惊小怪），这是因为：这些人其实是TC39会员公司自己选派出的代表。

需要说明的是，TC39采取协商一致的议事原则（operates by consensus）：提案能否通过，这取决于能否得到大多数人的支持，另外TC39非常鼓励大家去行使自己一票否决的权利。对一些浏览器厂商会员来说，（一些）共识的达成，这也就意味着责任才真正开始（一般来说，TC39制定出ECMAScript规范，然后由各大浏览器厂商来实现，既然都达成共识啦，浏览器厂商就必须去实现这些新特性）。

<h3 id="tc39-process">ECMAScript规范，如何制定</h3>
<p style="height: 5px;"></p>
<h4 id="_problem-ecmascript-2015-es6-was-too-large-a-release">ECMAScript 2015（ES6）遇到最大的问题：版本的发布</h4>
最近几次发布的ECMAScript版本（指的是ES6），存在的问题就有点大，要知道ES6（2015年6月）是在ES5（2009年12月）经过6年之后才被标准化的。而且就算是随着时间的推移，（你还是会发现），在这些发布的版本之间，还是会存在以下两个问题：  

1. 在（某个）ECMAScript release版本出来之前，就算有（一些浏览器已经实现）该特性，也必须要等到这个ECMAScript release版本完成之后，（该特性才会被写入标准里面）。  

2. （实现起来）耗时较长的特性，经常是在强大的压力之下而被砍掉，这是因为，（就算不砍掉），把这个特性推迟到下一个release版本，那也是需要等很长时间的。（再说严重一点），一些特性可能会导致整个ECMAScript release版本跳票。  

因此，从ECMAScript 2016（ES7）开始，ECMAScript版本的发布将会变得更加频繁，这样做的结果就是，ECMAScript版本的发布，将不再是困扰TC39的一大难题啦。另外，每年都会有一个（特殊的）ECMAScript release版本出炉，（忘了说啦），这个版本包含的都是在（临近）截止日期才实现的特性。

<h4 id="_solution-the-tc39-process">解决之道：TC39 process</h4>

针对ECMAScript特性的（每个）提案，都会经历下面列出的所有环节（maturity stages），（补充一句，流程是）从环节 0开始。另外，提案从一个环节过渡到下一个环节的这个过程，务必要经过TC39批准。  
<p style="height: 5px;"></p>
<h5 id="_stage-0-strawman">环节0：strawman</h5>


**strawman是啥玩意？（What is it）**，（说白了），strawman其实是一种不拘泥形式，但需要（头脑风暴的）内容是围绕ECMAScript话题展开的头脑风暴贡献方式。（在贡献头脑风暴之前，你需要了解的是），贡献头脑风暴的人必须是TC39会员或者是[已经登记为TC39贡献者的非TC39会员](http://www.ecma-international.org/memento/contribute_TC39_Royalty_Free_Task_Group.php)。

**（这时候），需要干啥？（What’s required）**，有关头脑风暴的一些细节（document），TC39工作组会专门开一次会来过一遍（[例如，常见的头脑风暴](https://github.com/tc39/ecma262/blob/master/FAQ.md)），（讨论过后，确定没有问题），然后才会把这个头脑风暴更新到（add）[提案页面上](https://github.com/tc39/ecma262/blob/master/stage0.md)。
<p style="height: 5px;"></p>
<h5 id="_stage-1-proposal">环节1：proposal</h5>

**proposal是啥玩意？（What is it）**，（说白了），proposal其实是针对（一些）ECMAScript特性所提出的正式提案。

**（这时候），需要干啥？（What’s required）**：

1. 首先，需要把评委（a so-called champion）确定好，（顺带提一下），这些评委将会负责与提案相关的事情。（最好的情况是），第一评委（champion）或者第二评委（co-champion）是TC39成员（[参考](https://github.com/tc39/ecma262/blob/master/FAQ.md)）。

2. 接着，需要如实记录下（described in prose）一些问题（指的是通过提案提到的特性，就能够解决的问题）。

3. （然后就是，所有的）解决方案，都必须附上例子、列出相关的API以及给出围绕语义、算法等相关话题的讨论。

最后，一定要确认（identified）该提案是否存在一些潜在问题，例如和其它特性配合使用是否存在问题以及实施起来是否存在挑战。比较聪明的做法是，（在提交提案材料的过程中），同时把针对该特性的polyfill以及demo准备好。

**接下来做什么呢？（What’s next）**，（其实也没什么啦，也就是）在环节1通过（accept）一些提案。另外，TC39也会主动去审核（declares its willingness to examine）、讨论一些提案，（间接的也会）促成提案的通过。所以说，从目前来看（Going forward），针对TC39（可能会）大改提案内容的这种情况，也是在我们意料之中。
<p style="height: 5px;"></p>
<h5 id="_stage-0-strawman">环节2：draft</h5>

**draft是啥玩意？（What is it）**，（说白了），draft其实是一些特性在被纳入规范之前的第一个（比较正式的）版本，也就是人们常说的草案。这时候，说明上述特性被纳入规范的（这个）可能性，已经很大啦。

**（这时候），需要干啥？（What’s required）**，到了现在这个阶段，就要求提案能够从（实现该特性的编程语言）语法以及语义的角度，给出一份正式的说明文档（补充一句，上述编程语言也是使用遵循ECMAScript规范的编程语言）。另外，上述文档应该尽可能地全面一点，（虽然说要全面），但是也不要把todo事项以及和上述内容无关的事项（placeholders）写在上面。对于ECMAScript特性来说，通过两种（不同的）方式来实现ECMAScript特性的这种做法还是需要的，不过要保证有一种实现方式能跑在Babel等类似的转换器里面。

**接下来做什么呢？（What’s next）**，从现在开始，我们更希望看到的是，能够渐进式地对提案提出修改。
<p style="height: 5px;"></p>
<h5 id="_stage-3-candidate">环节3：candidate</h5>

**candidate是啥玩意？（What is it）**，（通常，一般到了candidate这个阶段），说明提案都已经快结束啦，现在就需要一些有关于ECMAScript特性实现方面以及用户（期待哪些ECMAScript特性）能够走得更远（progress furthe）类似的反馈。

**（这时候），需要干啥？（What’s required）**，

1. 务必完成spec text

2. Designated reviewer（其实是由TC39任命，而不是由评委担任）以及ECMAScript的编辑都必须在spec text上签字

3. 对ECMAScript特性来说，必须要有两种都符合规范的实现方案（不过，在一般情况下，是没有必要这样做的）
**接下来做什么呢？（What’s next）**，（补充一句），从今以后，只有当提案内容出现关键性问题（指的是，在实现一些特性的过程中或者实际使用这些特性的过程中）之后，才能对上述提案进行修改。
<p style="height: 5px;"></p>

<h5 id="_stage-4-finished">环节4：finished</h5>
**finished是啥玩意？（What is it）**，（通常，一般到了finished这个阶段），说明TC39已经准备把上述提案给纳入规范啦。

**（这时候），需要干啥？（What’s required）**，
（接下来的这些内容，讲述的都是），一项提案能够走到finished环节所需要的条件：

1. 能够提供通过[Test 262](https://github.com/tc39/test262)测试全家桶的测试用例（简单来讲，其实就是用JavaScript实现能够针对语言特性进行单元测试的工具）
2. 两种实现方案都能通过Test 262测试
3. 对这些实现方案都有宝贵的实践经验
4. ECMAScript编辑必须在spec text上签字

**接下来做什么呢？（What’s next）**，TC39很快就会把这项提案，纳入到ECMAScript规范里面。换句话说，只要该规范能够通过ECMAScript的评审。那也就意味着，这次提案已经是新标准的一部分啦。

<h3 id="_dont-call-them-ecmascript-20xx-features">请你们不要把这些特性（随意）称为ECMAScript 20xx特性</h3>

正如你所看到的那样，你现在唯一能够确定一个事实，“只要（针对特性的）提案走到了stage 4环节，那么意味着，该特性将会被纳入规范”。（那也就是说），在下一个ECMAScript release版本极有可能看到该特性的身影，不过这也不能100%保证，或者也可能需要更长时间，该特性才能够被纳入规范。因此，你也就不能（贸然）把一些提案叫为“ES7特性”或者“ES2016特性”。下面所列举的（其实）是，在我写文章以及博客的过程中，最喜欢给文章起标题的两种方式：

- “ECMAScript提案：foo特性”。用这样的标题，就是用来暗示，在文章的开头会提到该提案到目前为止所处的阶段

- “ES.stage2：the foo特性”

如果一个提案处于stage 4阶段，把该提案所包含的特性称为ES20xx特性，没毛病，不过最保险的方式，还是要等到，ECMAScript编辑明确了哪些特性一定会被纳入规范之后，才决定是否把上述特性称为ES20xx特性。`Object.observe`就是个（很好的反面）例子，为啥酱紫说呢？该提案都到了stage 2阶段，（可惜的是），最终提案还是被驳回啦。

<h3 id="_further-reading">深入阅读</h3>
接下来的内容，可以说是本章信息参考的重要来源：

- [ecma262 Github repo（ECMA-262其实是ECMAScript规范的ID）](https://github.com/tc39/ecma262)，包括以下内容：
	- [readme文件](https://github.com/tc39/ecma262/blob/master/README.md)，（补充一句），上述readme文件只针对处于stage 1或者更高环节的提案
	
	- [提案（指的是处于stage 0环节的提案）列表](https://github.com/tc39/ecma262/blob/master/stage0.md)

	- [ECMA-262常见问题](https://github.com/tc39/ecma262/blob/master/FAQ.md)
- [TC39 process 文档](https://tc39.github.io/process-document/)

扩展阅读：

- [Kangax总结的ES7兼容性表](https://kangax.github.io/compat-table/es2016plus/)

- 更多有关于ES6规范制定流程的介绍：推荐大家去看“深入理解ES6”书中关于“ES6应该如何设计”的那一部分
