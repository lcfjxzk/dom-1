window.dom = {
  //-->dom是一个全局变量。
  // create(tagName) {
  //   return document.createElement(tagName);
  // }
  //----以下为新增节点的五个函数----
  create(string) {
    //创建节点
    const container = document.createElement("template");
    container.innerHTML = string.trim(); //trim这个函数的功能是把字符串两边的空格去掉。
    return container.content.firstChild;
  },
  after(node, node2) {
    //添加节点
    //表示要在节点node后面加一个叫node2的节点。
    node.parentNode.insertBefore(node2, node.nextSibling);
    //找到这个节点的父节点-->node.parentNode，调用父节点的insertBefore的方法，然后把node2插到node的下一个节点(node.nextSibling)的前面,也就是插到node的后面。
    //网址：Google搜索：js dom insert after,抄别人的代码。尽量用古老的接口。不要用实验性的接口。
  },
  before(node, node2) {
    //添加节点
    //表示要在节点node前面加一个叫node2的节点。
    node.parentNode.insertBefore(node2, node);
  },
  append(parent, node) {
    //把node节点放在parent节点的里面
    parent.appendChild(node);
  },
  wrap(node, parent) {
    //把后者包在前者的外面
    dom.before(node, parent); //先把parent节点放在node节点的前面
    dom.append(parent, node); //再把node节点放在parent节点的里面
  },
  // find(selector, scope) {
  //   return (scope || document).querySelectorAll(selector);
  // } //如果有scope，就用scope调用querySelector。如果没有scope，就用document调用querySelector

  //----以下为删除节点两个函数----
  remove(node) {
    node.parentNode.removeChild(node); //让node的父节点删除它的子节点node。
    return node; //这样删掉节点的人还可以保留节点的引用。
  },
  empty(node) {
    //node.childNodes = node.childNodes
    //const { childNodes } = node; //从node获取它的子节点。
    const array = [];
    // for (let i = 0; i < childNodes.length; i++) {
    //   //遍历子节点。
    //   //遍历子节点是失败的，因为每删除一个childNodes,childNodes.length都会发生变化。因此empty(node)不能用for循环。
    //   console.log(childNodes.length);
    //   dom.remove(childNodes[i]); //删掉一个子节点
    //   array.push(childNodes[i]); //同时将删掉的子节点push到array里面。
    //}
    //return array; //返回array
    let x = node.firstChild;
    while (x) {
      //while(表达式){语句}
      //当表达式为真，执行语句，执行完再判断表达式真假。
      //当表达式为假，执行后面的语句。
      array.push(dom.remove(node.firstChild)); //调用上面的dom.remove，删除node的第一个子节点，同时将他push到数组array里面。下一次while循环时，x为最初的第二个子节点，直到子节点为空，while循环停止。
      x = node.firstChild;
    }
    return array;
  },

  //----以下为修改节点的函数----
  attr(node, name, value) {
    //attr---->改属性
    //重载---->根据参数的不同个数写不同的代码，就叫重载。
    //节点，属性名，属性值
    if (arguments.length === 3) {
      //如果arguments长度为3说明它想设置这个值。
      node.setAttribute(name, value); //设置
    } else if (arguments.length === 2) {
      //如果arguments长度为2说明它只是想获取title。
      return node.getAttribute(name); //获取
    }
    //node.setAttribute(name, value);
  },
  text(node, string) {
    //将string替换到node里面
    if (arguments.length === 2) {
      if ("innerText" in node) {
        //适配
        node.innerText = string; //IE浏览器适用
      } else {
        node.textContent = string; //firefox/chrome浏览器适用
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        node.innerText = string; //IE浏览器适用
      } else {
        node.textContent = string; //firefox/chrome浏览器适用
      }
    }
  },
  html(node, string) {
    //重载，根据参数的长度来实现不同的效果
    if (arguments.length === 2) {
      //如果长度为2，说明你想设置。
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    //用于修改dom的style属性
    if (arguments.length === 3) {
      //dom.style(div,'color','red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        //dom.style(div,'color')
        return node.style[name];
      } else if (name instanceof Object) {
        //dom.style(div,{color:'red'})
        const object = name;
        for (let key in object) {
          //key:border/color
          //node.style.border = ...
          //node.style.color = ...
          node.style[key] = object[key];
        }
      }
    }
  },
  class: {
    add(node, className) {
      //用于添加class
      node.classList.add(className);
    },
    remove(node, className) {
      //用于删除class
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    }
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn); //添加事件监听
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn); //移除事件监听
  },

  //----以下为查找节点的函数----
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  }, //如果有scope，我就在scope里面调用querySelectorAll，如果没有scope，我就在document里面调用querySelectorAll。
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter(n => n !== node);
  },
  next(node) {
    let x = node.nextSibling;
    //return node.nextSibling;
    while (x && x.nodeType === 3) {
      //如果x存在且x的节点等于3
      //网址：Google搜索“nodeType mdn”
      //当x.nodeType === 3说明x是一个文本
      //当x.nodeType === 1说明x是一个节点
      x = x.nextSibling;
    } //while循环的功能：防止获取的next节点为文本。当x!=3的时候，跳出while循环，这时候获取的为节点。
    return x;
  },
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  each(nodeList, fn) {
    //用于遍历所有节点
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  index(node) {
    //用于获取排行老几
    const list = dom.children(node.parentNode); //获取父节点的子节点们
    //node.parentNode.children;
    let i; //i防止for循环外面定义，可以保证i在整个函数范围内有效
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        //如果list[0]这个节点===我们要找的节点node，则让这个循环停下来。
        break; //停下来
      }
    }
    return i; //返回list[0]这个节点的下标i
  }
};
