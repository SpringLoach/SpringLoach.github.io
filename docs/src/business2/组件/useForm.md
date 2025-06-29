## useForm

### 简单示例

```jsx
import useForm from "@module/useForm";
import { Input, Button } from "@root/components/ZenUI/ZenForm/ZenForm";

export default function SignUp(props) {
    // 入参
    // ①表单提交方法
    // ②表单初始值
    // ③绑定搭配表单的name
    const { formData, handleChange, handleSubmit, updateFormData, addValidateMulti } = useForm(
        doSubmit,
        {
            validateFormBeforeSubmit: true
        },
        "loginForm"
    );
    // 校验表单是否填写规范
    addValidateMulti({
        email: [checkEmail]
    });
    function checkEmail(val) {
        if (!val) {
            return "请输入邮箱";
        } else {
            //去掉首尾空格
            val = val.replace(/(^\s*|\s*$)/g, "");
            updateFormData({ name: val });
        }
        return "";
    }
    
    // 提交表单
    function doSubmit() {
        if (!formData.$$valid) {
            return;
        }
        // ...
    }
    
    return (
        <form
            onClick={e => {
                e.stopPropagation();
            }}
            name="loginForm"
            // onSubmit={handleSubmit}
        >
            <Input
                formData={formData}
                name="email"
                value={formData.email}
                handleChange={handleChange}
            />
            <Button onClick={handleSubmit}>
                提交
            </Button>
        </form>
    )
}
```





### 组件访问

#### 表单校验失败

```jsx
// =====示例：校验失败时 formData值===== 
{
	$$valid: false,
    $$status: {
    	email: '请输入邮箱'
    },
    ...
}
```

