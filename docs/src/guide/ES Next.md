## ES8

### padStart()

> 可以在字符串的开头添加指定的字符，直到字符串达到指定的长度。如果字符串的长度已经达到或超过了指定的长度，则不会进行任何填充。

```javascript
let phoneNumber = "18912345677"; // 电话号码

// 将电话号码填充到11位，使用*进行填充，并且只保留后四位数
let paddedPhoneNumber = phoneNumber.slice(-4).padStart(11, "*");
console.log(paddedPhoneNumber); // *******5677
```



### padEnd()

与 `padStart()` 类似，在字符串的结尾添加指定的字符，直到字符串达到指定的长度

```javascript
const text = 'Hello';
console.log(text.padEnd(8, '!')); // 'Hello!!!'
```



## ES9

### Rest/Spread 属性

对扩展运算符的一种扩展。

- `Rest` 属性用于从对象中提取剩余的属性，并将它们作为新的对象返回

  ```javascript
  const obj = { name: 'hhh', age: 18, sex: '男', city: '上海' }
  const { name, age, ...other } = obj;
  console.log(other); // { sex: '男', city: '上海 }
  ```

- `Spread` 属性用于将一个对象的属性扩展到另一个对象中

  ```javascript
  const obj1 = { name: 'hhh', age: 18 };
  const obj2 = { sex: '男', city: '上海' };
  const mergedObj = { ...obj1, ...obj2 };
  console.log(mergedObj); // { name: 'hhh', age: 18, sex: '男', city: '上海' }
  ```



### Promise.finally()

```javascript
const promise = new Promise((resolve, reject) => {
  // 异步操作
  resolve(value); // 或 reject(reason);
});

promise
  .then(result => {
    // 处理成功的情况
  })
  .catch(error => {
    // 处理失败的情况
  })
  .finally(() => {
    // 无论成功或失败都会执行的回调函数
  });
```

:turtle: finally 中的回调函数不接受任何参数









## ES10

### Array.prototype.flat()

数组扁平化方法。按照一个可指定的深度遍历递归数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

```javascript
const arr = [[1, 2], [3, [4, 5]]];
console.log(arr.flat(1)); // 输出: [1, 2, 3, [4, 5]]

const deeplyNestedArr = [[1, [2, [3, [4, [5]]]]]];
console.log(deeplyNestedArr.flat(Infinity)); // 输出: [1, 2, 3, 4, 5]
```



### Array.prototype.flatMap()

结合了 `map()` 和 `flat()` 两个方法的功能。它首先对数组的每个元素执行一个映射函数，然后将结果扁平化为一维数组。

```javascript
const arr = [1, 2, 3, 4, 5];
console.log(arr.flatMap(num => [num * num])); // 输出: [1, 4, 9, 16, 25]

const words = ["Hello", "World"];
console.log(words.flatMap(word => word.split(""))); // 输出: ["H", "e", "l", "l", "o", "W", "o", "r", "l", "d"]
```



### String.prototype.trimStart()

去除字符串开头的空白字符，返回一个新的字符串，原始字符串不受影响

```javascript
const str = "   Hello, world!   ";
console.log(str.trimStart()); // "Hello, world!   "
```



### String.prototype.trimEnd()

去除字符串结尾的空白字符

```javascript
const str = "   Hello, world!   ";
console.log(str.trimEnd()); // "   Hello, world!"
```



### Object.fromEntries()

用于将一个包含键值对的可迭代对象 转换为新的对象

```javascript
const entries = [['name', 'hhh'], ['age', 25], ['city', '上海']];
const obj = Object.fromEntries(entries);
console.log(obj); // { name: 'hhh', age: 25, city: '上海' }
```



### catch 绑定

在 ES10 中，允许在 `catch` 语句中绑定错误对象，而不需要通过 `catch` 语句的参数来引用它

```javascript
/***** 在 ES10 之前 *****/
try {
  // 一些可能抛出错误的代码
} catch (error) {
  // 处理错误的代码
}

/***** 在 ES10 中，允许 *****/
try {
  // 一些可能抛出错误的代码
} catch {
  // 处理错误的代码
}
```



### JSON.stringify() 增强

修复了之前版本中对于一些超出范围的 Unicode 字符的展示错误的问题

```
console.log(JSON.stringify('🥰')); // "🥰"
```



## ES11

### globalThis

JavaScript 的全局对象名称在不同的平台上有所不同，如在浏览器中是 `window`，在 Node.js 中则为 `global`，

这导致了在跨平台开发时需要针对不同的环境使用不同的全局对象，为了解决这个问题引入的 `globalThis`，为统一的全局对象。



### BigInt

> 能表示更广泛的整数范围，并且可以进行算数运算。

- `BigInt`在`Math`对象中的方法不可用；

- `BigInt`与`Number`实例不能混合运算，需要转换为相同类型；

- `BigInt`在转换为`Number`时可能会丢失精度；

- 使用`BigInt`进行带小数的运算会向下取整；

- `BigInt`和`Number`不是严格相等，但是宽松相等。

```javascript
// 通过添加后缀 n 或 调用构造函数 BigInt() 创建
const maxSafeInteger = BigInt(Number.MAX_SAFE_INTEGER);
const bigNumber = BigInt("123456789012345678901234567890");
const bigNumber2 = 123456789012345678901234567890n;

console.log(maxSafeInteger);  // 9007199254740991n
console.log(bigNumber);       // 123456789012345678901234567890n
console.log(bigNumber2);      // 123456789012345678901234567890n

const sum = maxSafeInteger + bigNumber;
console.log(sum);              // 123456789012345678901234576981n

console.log(2n > 2,2n > 1);    // false true
console.log(0n === 0,0n == 0); // false true
```



### 可选链操作符

> 通过 `?.` 用于简化访问嵌套对象属性或方法时的安全性检查，如果不存在属性/方法会返回 `undefined`

```javascript
if (obj?.prop?.method) {
  // 访问obj.prop.method
}
```



### 空值合并操作符

| 名称           | 符号 | 说明                                 |
| -------------- | ---- | ------------------------------------ |
| 逻辑或运算符   | `||` | 左侧值为假值时，选择右侧值           |
| 空值合并操作符 | `&&` | 左侧值为null/undefined时，选择右侧值 |

不可以将 `??` 与 AND（`&&`）OR（`||`）混用，会报错。

```javascript
const x = ''
const defaultValue = 'abc'

const value1 = x || defaultValue; // 'abc'
const value2 = x ?? defaultValue; // ''
```



### String.prototype.matchAll()

> 返回一个包含所有匹配正则表达式的迭代器对象，可以通过 `for...of` 循环，或通过 `Arrary.from()` 转换为元素为数组的数组。

```javascript
const str = 'He';
const regex = /[a-z]/gi;
const matches = str.matchAll(regex);

for (const match of matches) {
  console.log(match);
}
// 输出
// [ 'H', index: 0, input: 'He', groups: undefined ]
// [ 'e', index: 1, input: 'He', groups: undefined ]
```



### import()

> 允许<span style="color: red">在代码运行时</span>根据需要动态地加载模块，返回 Promise。基于此可以实现条件导入、延迟加载。
>
> 在此以前的 ES6 模块系统中，所有的导入语句都必须在代码的头部静态编译。

```javascript
import('./module.js')
  .then((module) => {
    // 使用模块中的内容
    module.default();
  })
  .catch((error) => {
    // 处理加载模块失败的情况
    console.error('模块加载失败', error);
  });
```



### Promise.allSettled()

> 接受 Promise 对象组成的可迭代对象，并返回一个新的 `Promise` 对象，待传入对象都解决/拒绝后 解决。

| --                   | --                                                           |
| -------------------- | ------------------------------------------------------------ |
| Promise.allSettled() | 需要等到所有传入 `Promise` 解决/拒绝后，返回的 `Promise` 才解决 |
| Promise.all()        | 需要等到所有传入 `Promise` 解决后，返回的 `Promise` 才解决   |

```javascript
const promises = [
  Promise.resolve("Resolved"),
  Promise.reject("Rejected"),
  Promise.resolve("Resolved"),
];

Promise.allSettled(promises).then((results) => {
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      console.log(`Promise resolved: ${result.value}`);
    } else if (result.status === "rejected") {
      console.log(`Promise rejected: ${result.reason}`);
    }
  });
});
```











## ES12

### 数值分隔符

> 允许在数字中使用下划线 `_` 进行分隔，以提高数字的可读性。

```javascript
const billion = 1_000_000_000;
console.log(billion); // 输出 1000000000
```

> 数值分隔符可以在整数和浮点数中使用，但不能在数字的开头或结尾使用，也不能在小数点前后使用

```javascript
const number = 1_234.567_89;
console.log(number); // 输出 1234.56789
```



### 逻辑赋值运算符

| 运算符 | 名称               | 说明                                                         |
| ------ | ------------------ | ------------------------------------------------------------ |
| \|\|=  | 逻辑或赋值运算符   | 如果左侧的操作数为假，则将右侧的操作数赋值给左侧的变量       |
| &&=    | 逻辑与赋值运算符   | 如果左侧的操作数为真，则将右侧的操作数赋值给左侧的变量       |
| ??=    | 空值合并赋值运算符 | 如果左侧的操作数为 `null` 或 `undefined`，则将右侧的操作数赋值给左侧的变量 |

`例子`

```javascript
/***************** ||= *****************/
let x = '';
x ||= 5;
console.log(x) // 5

/***************** &&= *****************/
let y = 10;
y &&= 7;
console.log(y); // 7

/***************** ??= *****************/
let z = null;
z ??= 3;
console.log(z);
```



### String.prototype.replaceAll()

> 用指定的字符串替换字符串中的所有匹配项

```javascript
const test = "Hello, world!".replaceAll("o", "x")  // "Hellx, wxrld!"
/* 等价于 */
const test2 = "Hello, world!".replace(/o/g, "x")   // "Hellx, wxrld!"
```



### Promise.any()

> 任一 `Promise` 解决后执行 `then` 回调。
>
> 接收一个 `Promise` 对象的可迭代参数（如数组），并返回一个新的 `Promise` 对象。

```javascript
const promise1 = Promise.resolve(1);
const promise2 = Promise.reject(2);
const promise3 = Promise.resolve(3);

Promise.any([promise1, promise2, promise3])
  .then((value) => {
    console.log(value); // 1
  })
  .catch((error) => {
    // 全部请求失败时才会执行这里的代码
    console.log(error);
  });
```

<span style="color: #b962ea; background: #f9f7ff">`asd`</span>



## ES13

### 全局await

> 以前只能在 async 函数中使用该运算符，现在可以在全局使用。

```javascript
function setTimeoutAsync(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

await setTimeoutAsync(3000);
```



### Array.prototype.at() 

> 用于访问数组末尾的第 N 个元素；
>
> 数组、字符串、TypedArray 现在都有这个方法。

```javascript
const arr = ['a', 'b', 'c', 'd'];

console.log('====----------====', arr.at(1))  // b
console.log('====----------====', arr.at(-2)) // c (倒数第二个)
// 等价于
console.log('====----------====', arr[arr.length - 2])  // c
```



### Object.hasOwn()

> 检查对象是否具有给定的属性

```javascript
const obj = {
  name: 'weida',
  age: 12
}

Object.hasOwn(obj, 'name')
// 等价于
Object.prototype.hasOwnProperty.call(obj, 'name')
// 使用上面的方法主要是为了避免方法复写(实际很少发生吧..)
obj.hasOwnProperty('name')
```



### Array.prototype.findLast()

> 如果目标对象更接近数组的末尾，从末尾开始搜索数组将使程序更快完成。

- find()
- findIndex()
- findLast()
- findLastIndex()



### error.cause

> 用于指定导致即将抛出的错误的原始错误，帮助排错用的。

```javascript
function userAction() {
  try {
    apiCallThatCanThrow();
  } catch (err) {
    throw new Error('New error message', { cause: err });
  }
}
try {
  userAction();
} catch (err) {
  // New error message
  console.log(err);
  // Cause by: ReferenceError: apiCallThatCanThrow is not defined
  console.log(`Cause by: ${err.cause}`);
}
```









## about

https://mp.weixin.qq.com/s?__biz=MzAxODE4MTEzMA==&mid=2650101326&idx=1&sn=4d40e56ef9ee74223173307b382d6435&chksm=83dbcb2bb4ac423df31a7fa2f0807d0a7bd1b4e3ea2d546ba047e98f2650678d233f695c1b56&scene=27

https://juejin.cn/post/7129345014127132680?searchId=20240207150553E88175AB8029A35A5EB3#heading-9

https://juejin.cn/post/7272176270808137783?from=search-suggest#heading-51











