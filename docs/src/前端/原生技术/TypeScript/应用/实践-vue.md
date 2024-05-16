## 编写规范

1. 何时用类型，何时用声明

2. 类型/声明命名习惯 函数/简单类型/实例用类型；对象用接口

   - 大写开头的驼峰
   - 组件-xxComponent 实例-xxInstance 方法-xxFn、自定义属性-xxProps 数组项-xxItem 配置-xxOptions 状态-xxStatus 列表-xxList、xxs





## 常用类型

```typescript
// 期约
Promise<unknown>
```



## 高频场景

### 定义固定的状态值

```typescript
declare type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'
```



### 定义实例类型

```typescript
declare class Demo {}

declare type OSSInstance = InstanceType<typeof Demo>
```



### 获取方法返回值类型

> 示例：已有方法；创建一个变量，定义为方法返回值的类型

```typescript
function test(str: string) {
    return str.split('')
}
type TestResultType = ReturnType<typeof test>
let result: TestResultType
```



### 类的类型&类实例的类型

> 类的类型定义名为类名本身

`global.d.ts`

```typescript
declare class OSS {
    options: object
    constructor(o?: object) {
        Object.assign(this.options, o)
    }
    static Wrapper: function
    multipartUpload: function
}

// 已知类的实例类型
type OSSInstance = InstanceType<typeof OSS>
```

`使用例子`

```typescript
let client: OSSInstance | null = null

client = new OSS.Wrapper({
    bucket: "xxx",
    secure: true
})

client!.multipartUpload()
```



## 低频情景

### 给对象的动态属性赋值

```javascript
const posterForm = ref({
  avatorUrl: '',
  posterUrl: '',
  other: 123
})

// 写法一
function change(type: 'avatorUrl' | 'posterUrl') {
  posterForm.value[type] = 'demo'
}
// 写法二
function change(type) {
  posterForm.value[type as 'avatorUrl' | 'posterUrl'] = 'demo'
}
```

>  可以添加定义的时候存在的属性来进行类型收缩。



### 引用表单组件

> 引用 ant-design-vue 的表单组件，并使用它的重置方法。

初始为 null

```javascript
const formRef = ref(null);

function closeDrawer() {
  formRef.value!.resetFields() // 会报错 Property 'resetFields' does not exist on type 'never'
}
```

初始为空/any

```javascript
const formRef = ref();

// 关闭抽屉
function closeDrawer() {
  formRef.value!.resetFields() // 不会报错
}
```

提供对应类型

```javascript
import type { FormInstance } from 'ant-design-vue';

const formRef = ref<FormInstance>();

// 关闭抽屉
function closeDrawer() {
  formRef.value!.resetFields() // 会有提示
}
```



## 拓展方法

```typescript
declare type Nullable<T> = T | null;
declare type Arrayable<T> = T | T[];
declare type Awaitable<T> = Promise<T> | T;
```

```typescript
// 定义一个可以接收值为Awaitable类型的方法
async function processData(data: Awaitable<string>): Promise<void> {
    const resolvedData = await data; // 既可以接收原始值，也可以接收期约
    console.log(resolvedData);
}

// 使用
processData("Hello, world!"); // Regular value
processData(fetchData()); // Promise returned from fetchData function
```



## 从lib积累

### 将接口特定属性设置为可选

```typescript
export interface UploadFile {
    name: string;
    percentage?: number;
    status: UploadStatus;
    size?: number;
    response?: unknown;
    uid: number;
    url?: string;
    raw?: UploadRawFile;
}
export declare type UploadUserFile = Omit<UploadFile, 'status' | 'uid'> & Partial<Pick<UploadFile, 'status' | 'uid'>>;
```







## 等价的写法

```typescript
declare type DemoType =
  | 'demo'
  | 'master'
  
declare type DemoType = 'demo' | 'master'
```

