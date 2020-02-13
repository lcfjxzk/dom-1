// const div = dom.create("<div>newDiv</div>");
// console.log(div);

// dom.after(test, div);

// const div3 = dom.create('<div id="parent"></div>');
// dom.wrap(test, div3);

// const nodes = dom.empty(window.empty);
// console.log(nodes);

// dom.attr(test, "title", "Hi,I am xzk"); //在id为test的节点上加一个title，title="Hi,I am xzk"
// const title = dom.attr(test, "title"); //用dom.attr这个函数获取test这个div的"title"属性，然后把这个"title"属性放在title变量里面。

// //问题：dom.attr函数要接收三个参数，为什么在const title这一行只接收了两个参数？
// //答：JS的一个函数是可以接收多种参数，可以是三个参数，也可以是两个参数。
// console.log(`title:${title}`);

// dom.text(test, "你好，这是新的内容");
// //dom.text(test);

// dom.style(test, { border: "1px solid red", color: "blue" }); //节点为test，对象为{}.border为红色，内容为蓝色
// console.log(dom.style(test, "color")); //用dom.style调用元素test的'border'内容并打印出来。
// //如果是字符串''就是get获取它的值
// //如果是对象{}就是set设置它的值
// dom.style(test, "border", "1px solid black");
// //如果是三个参数，也是set设置它的值

// dom.class.add(test, "red"); //添加红色
// dom.class.add(test, "blue");
// dom.class.remove(test, "blue");
// console.log(dom.class.has(test, "blue"));

// const fn = () => {
//   console.log("点击了");
// };
// dom.on(test, "click", fn); //添加点击函数
// dom.off(test, "click", fn); //移除点击函数

// const testDiv = dom.find("#test")[0];
// //dom.find(".red", testDiv); //前面一个参数是找的内容，后面一个参数是找的范围。
// console.log(testDiv);

// const test2 = dom.find("#test2")[0];
// console.log(dom.find(".red", test2)[0]);

// console.log(dom.parent(test));

// const s2 = dom.find("#s2")[0];
// console.log(dom.siblings(s2)); //获取节点s2的兄弟节点
// console.log(dom.next(s2)); //获取节点s2的下一个节点
// console.log(dom.previous(s2)); //获取节点s2的上一个节点

// const t = dom.find("#travel")[0]; //travel是遍历
// dom.each(dom.children(t), n => dom.style(n, "color", "red"));

// console.log(dom.index(s2));

const div = dom.find("#test>.red")[0]; // 获取对应的元素
dom.style(div, "color", "red"); // 设置 div.style.color

const divList = dom.find(".red"); // 获取多个 div.red 元素
dom.each(divList, n => console.log(n)); // 遍历 divList 里的所有元素
