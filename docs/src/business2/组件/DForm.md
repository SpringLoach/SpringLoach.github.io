## Dform

### 位置

#### 全局按钮-跳转-镶嵌

> `Uts.renderGlobalBtn` - 跳转类型中渲染的弹窗内容子组件

:::code-group

```[纯净版]jsx
import { FormWrap, DForm } from "@root/components/ZenUI/DForm/DForm";

export default function DemoModal(props) {
	// type: edit-编辑；add-添加
	const { config, type, item = {} } = props;
	const { innerRef } = config || {};
    innerRef.waitingOk = waitingOk;

	const validateConfig = {
		isRequire: ["qq"]
	};

	// 初始化formData对象
	const initFormData = {
		qq: "",
	};

	if (type == "edit") {
		initFormData.qq = Number(item.qq);
	}
	
	const [currentState, updateCurrentState] = usePartState({
		validateConfig,
		formData: initFormData
	});
	const { formData } = currentState;

	const formDataBaseConfig = [
		{
			type: "input",
			name: "qq",
			label: "QQ",
			placeholder: "请输入",
			// 类名-整个表单项（最外层）
			className: "zen_bl zen_m-b-24 zen_p-h-12",
			// 类名-复选框外层
			wrapClass: "zen_w-360",
			maxLength: 30,
			disabled: false
		}
	];

	function waitingOk(ok, fail) {
		if (formData.$$valid) {
			doSave(ok);
		}
	}
	function doSave(ok) {
		let params = Uts.copyCleanFormData(formData);
		REST.XX.update.saveOrUpdate(params).then(
			function (res) {
				ZenUI.HL();
				if (res.code == 200) {
					ZenUI.ok(type == "add" ? "新增成功" : "保存成功");
					ok && ok();
					EventApi.emit("ListPageRefData");
				}
			},
			function (error) {
				console.log(error);
			}
		);
	}
	// 将表单配置转化为jsx
	function renderForm(form, index) {
		const { label, name = label, type, isHide, dataList } = form;
		if (isHide) {
			return null;
		}
		return <DForm key={name} {...form} />;
	}

	return (
		<div className="zen_m-t-24">
			<FormWrap
				// 可选，挂载后，触发waitingOk前会自动验证表单
				innerRef={innerRef}
				/* ===== 必填 =====  */
				// 表单数据
				formData={formData}
				// 更新表单状态的方法
				updateFormData={updateCurrentState}
				/* ===== 可选 =====  */
                // onSubmit={onSubmit}
				// 配置效验规则
				validateConfig={currentState.validateConfig}
				// 配置标签位置，默认top，可以配置left
				labelPS="left"
				// 配置标签前后缀，@代表原标签，如@：代表在原标签后增加冒号：
				labelWithSymbol="@："
				// 类名-添加到标签上，可设置标签高度，宽度等
				labelClass="label_title_md zen_w-120 zen_t-r"
			>
				{formDataBaseConfig.map(function (form, index) {
					return renderForm(form, index);
				})}
			</FormWrap>
		</div>
	);
}
```



```[详细备注]jsx
import { FormWrap, DForm } from "@root/components/ZenUI/DForm/DForm";

export default function DemoModal(props) {
	// type: edit-编辑；add-添加
	const { config, type, item = {} } = props;
	const { innerRef } = config || {};
    innerRef.waitingOk = waitingOk;

	// validateConfig需要定义为状态，不能是普通变量
	const validateConfig = {
		// 设置必填的表单属性（formData的具体属性）
		isRequire: ["qq"]
	};

	// 初始化formData对象
	const initFormData = {
		qq: "",
		email: ""
	};

	if (type == "edit") {
		initFormData.qq = Number(item.qq);
		initFormData.email = item.email;
	}
	
	const [currentState, updateCurrentState] = usePartState({
		validateConfig,
		formData: initFormData
	});
	const { formData } = currentState;

	const formDataBaseConfig = [
		{
			// 类型
			type: "input",
			// 对应表单属性
			name: "qq",
			// 标签名
			label: "QQ",
			// 提示语
			placeholder: "请输入",
			// 类名-整个表单项（最外层）
			className: "zen_bl zen_m-b-24 zen_p-h-12",
			// 类名-复选框外层
			wrapClass: "zen_w-360",
			// 最大字数限制
			maxLength: 30,
			// 禁用条件
			disabled: false
		},
		{
			type: "input",
			name: "email",
			label: "邮箱",
			placeholder: "请输入",
			className: "zen_bl zen_m-b-24 zen_p-h-12",
			wrapClass: "zen_w-360",
			// 与validateConfig.isRequire很像，添加必填星号，提交时校验
			isRequire: true
		}
	];

	// 处理入参
	function handleParams(params) {
		params.qqStr = `QQ:${params.qq}`;
		if (type == "edit") {
			params.id = item.id;
		}
	}

	function waitingOk(ok, fail) {
		if (formData.$$valid) {
			doSave(ok);
		}
	}
	function doSave(ok) {
		let params = Uts.copyCleanFormData(formData);
		// 处理参数
		handleParams(params);
		REST.XX.update.saveOrUpdate(params).then(
			function (res) {
				ZenUI.HL();
				if (res.code == 200) {
					ZenUI.ok(type == "add" ? "新增成功" : "保存成功");
					ok && ok();
					EventApi.emit("ListPageRefData");
				}
			},
			function (error) {
				console.log(error);
			}
		);
	}
	function onChange() {}
	// 表单校验
	function onSubmit(name) {}
    // 将表单配置转化为jsx
	function renderForm(form, index) {
		const { label, name = label, type, isHide, dataList } = form;
		if (isHide) {
			return null;
		}
		return <DForm key={name} {...form} />;
	}

	return (
		<div className="zen_m-t-24">
			<FormWrap
				// 可选，挂载后，触发waitingOk前会自动验证表单
				innerRef={innerRef}
				/* ===== 必填 =====  */
				// 表单数据
				formData={formData}
				// 更新表单状态的方法
				updateFormData={updateCurrentState}
				/* ===== 可选 =====  */
				// 内部按钮 <DForm type="button" name="xxx" /> 的点击回调，参数即name值
				onSubmit={onSubmit}
				// 配置效验规则
				validateConfig={currentState.validateConfig}
				// 配置标签位置，默认top，可以配置left
				labelPS="left"
				// 任意表单内容改变时触发
				onChange={onChange}
				// 配置标签前后缀，@代表原标签，如@：代表在原标签后增加冒号：
				labelWithSymbol="@："
				// 类名-添加到标签上，可设置标签高度，宽度等
				labelClass="label_title_md zen_w-120 zen_t-r"
			>
				{formDataBaseConfig.map(function (form, index) {
					return renderForm(form, index);
				})}
			</FormWrap>
		</div>
	);
}
```

:::



#### 页面表单

:::code-group

```[带提交流程]jsx
import { FormWrap, DForm } from "@root/components/ZenUI/DForm/DForm";

export default function Demo(props) {
	const validateConfig = {
		// 设置必填的表单属性（formData的具体属性）
		isRequire: ["userName", "userId", "userPhone", "invoiceType", "dangerousType"],
		format: {
			// 支持特定的校验格式，目前支持mobile/eamil，值为需要校验的表单属性
			mobile: ["userPhone"]
		}
	};

	const [currentState, updateCurrentState, Data, updateData] = usePartState({
		validateConfig,
		formData: {
			userName: "示例"
		}
	});

	const { formData } = currentState;

	// 表单项配置
	const formDataConfigList = [
		{
			type: "input",
			name: "userId",
			label: "用户Id",
			// 提示语
			placeholder: "请输入id",
			// 最大字数限制
			maxLength: 10,
			// 禁用条件
			disabled: false,
			// 类名-整个表单项（最外层）
			className: "zen_m-b-24",
			// 类名-控件
			wrapClass: "zen_il-bl zen_w-400"
		},
		{
			type: "select",
			label: "试剂类型",
			name: "dangerousType",
			dataList: [
				{ name: "其他", value: 2 },
				{ name: "易制毒", value: 3 },
			],
			wrapClass: "zen_w-300"
		}
	];

	// 渲染表单项
	function renderFormConfig(form) {
		const { isHide, name } = form;
		if (isHide) {
			return null;
		}
		return <DForm key={name} {...form} />;
	}

	// 校验更多内容
	function verifyMore() {
		let errorTypeMap = {
			1: "请选择发放对象",
			2: "请选择适用商品"
		};
		if (true) {
			ZenUI.warning(errorTypeMap[1]);
			return false;
		}
		return true;
	}

	// 获取参数
	function getParams() {
		const params = Uts.copyCleanFormData(formData);
		// ...
		return params;
	}

	// 执行保存
	function save(params) {
		// ...
	}

	const onSubmit = function (name) {
		if (Uts.contain(["submit"], name)) {
			if (!formData.$$valid) {
				ZenUI.warning("请完善必填项信息");
				return;
			}
			// 更多校验
			if (!verifyMore()) {
				return;
			}
			// 获取参数
			const params = getParams();
			// 触发保存等
			save(params);
        // 返回
		} else if (name == "back") {
			$state.go({
				name: "couponSummary",
				params: {
					activeTab: 2
				}
			});
		}
	};

	return (
		<div>
			<FormWrap
				/* ===== 必填 =====  */
				// 表单数据
				formData={formData}
				// 更新表单状态的方法
				updateFormData={updateCurrentState}
				/* ===== 可选 =====  */
				onSubmit={onSubmit}
				// 效验规则
				validateConfig={currentState.validateConfig}
				// 标签位置，默认top，可以配置left
				labelPS="left"
				// 配置标签前后缀，@代表原标签，如@：代表在原标签后增加冒号：
				labelWithSymbol="@："
				// 类名-添加到标签上，可设置标签高度，宽度等
				labelClass="label_title_md zen_w-120 zen_t-r"
			>
				{formDataConfigList.map(function (form, index) {
					return renderFormConfig(form, index);
				})}
				{/* 底部按钮 */}
				<div className="bar-footer zen_t-r zen_p-v-48">
					<DForm type="button" className="zen_il-bl zen_m-r-12" wrapClass="gray_btn" buttonType="default" name="back">
						返回
					</DForm>
					<DForm type="button" className="zen_il-bl" buttonType="primary" name="submit">
						保存
					</DForm>
				</div>
			</FormWrap>
		</div>
	);
}
```



```[详细备注]jsx
import { FormWrap, DForm } from "@root/components/ZenUI/DForm/DForm";

const invoiceTypeList = [
	{
		name: "电子发票（普通发票）",
		value: 4
	},
	{
		name: "电子发票（增值税专用发票）",
		value: 5
	}
];

export default function Demo(props) {
	const validateConfig = {
		// 设置必填的表单属性（formData的具体属性）
		isRequire: ["userName", "userId", "userPhone", "invoiceType", "dangerousType"],
		format: {
			// 支持特定的校验格式，目前支持mobile/eamil，值为需要校验的表单属性
			mobile: ["userPhone"]
		}
	};

	const [currentState, updateCurrentState, Data, updateData] = usePartState({
		validateConfig,
		formData: {
			userName: "示例"
		}
	});

	const { formData } = currentState;

	// 表单项配置
	const formDataConfigList = [
		{
            /* ===== 一般情况必填 =====  */
			// 控件类型
			type: "input",
			// 表单属性
			name: "userName",
			// 标签名
			label: "用户名",
            
            /* ===== 选填 =====  */
			// 类名-整个表单项（最外层）
			className: "zen_m-b-24",
			// 类名-控件
			wrapClass: "zen_il-bl zen_w-400"
		},
		{
			type: "input",
			name: "userId",
			label: "用户Id",
			// 提示语
			placeholder: "请输入id",
			// 最大字数限制
			maxLength: 10,
			// 禁用条件
			disabled: false,

			className: "zen_m-b-24",
			wrapClass: "zen_il-bl zen_w-400"
		},
		{
			type: "input",
			name: "nickName",
			label: "昵称",
			// 与validateConfig.isRequire类似，添加必填星号，提交时校验，提交报错自动定位
			// validateConfig.isRequire非空时，又设置表单项的isRequire会有问题：isRequire无法在表单提交时自动定位
			isRequire: true,

			className: "zen_m-b-24",
			wrapClass: "zen_il-bl zen_w-400"
		},
		{
			type: "input",
			name: "userPhone",
			label: "手机号",
			className: "zen_m-b-24",
			wrapClass: "zen_il-bl zen_w-400"
		},
		{
			type: "radio",
			name: "invoiceType",
			label: "发票类型",
			// 枚举列表
			dataList: invoiceTypeList,
			className: "zen_m-b-24",
			// 类名-单个选项容器
			listClass: "zen_m-r-24"
		},
		{
			type: "select",
			label: "试剂类型",
			name: "dangerousType",
			dataList: [
				{ name: "其他危化品", value: 2 },
				{ name: "易制毒", value: 3 },
				{ name: "易制爆", value: 4 }
			],
			onChange: changeType,

			wrapClass: "zen_w-300"
		}
	];

    /* ===== 表单控件相关的方法 =====  */
	const changeType = function (e) {
		console.log("changeType---", e);
	};

	// 渲染表单项
	function renderFormConfig(form) {
		const { isHide, name } = form;
		// console.log("--form", form);
		if (isHide) {
			return null;
		}
		return <DForm key={name} {...form} />;
	}

	// 校验更多内容
	function verifyMore() {
		let errorTypeMap = {
			1: "请选择发放对象",
			2: "请选择适用商品"
		};
		if (true) {
			ZenUI.warning(errorTypeMap[1]);
			return false;
		}
		return true;
	}

	// 获取参数
	function getParams() {
		const params = Uts.copyCleanFormData(formData);
		// ...
		return params;
	}

	// 执行保存
	function save(params) {
		// ...
	}

	const onSubmit = function (name) {
		if (Uts.contain(["submit"], name)) {
			if (!formData.$$valid) {
				ZenUI.warning("请完善必填项信息");
				return;
			}
			// 更多校验
			if (!verifyMore()) {
				return;
			}
			// 获取参数
			const params = getParams();
			// 触发保存等
			save(params);
		} else if (name == "back") {
			// 感觉不太好，跳转后还能通过浏览器返回
			$state.go({
				name: "couponSummary",
				params: {
					activeTab: 2
				}
			});
		}
	};

	return (
		<div>
			<FormWrap
				/* ===== 必填 =====  */
				// 表单数据
				formData={formData}
				// 更新表单状态的方法
				updateFormData={updateCurrentState}
				/* ===== 可选 =====  */
				// 内部按钮 <DForm type="button" name="xxx" /> 的点击回调，参数即name值
				onSubmit={onSubmit}
				// 效验规则
				validateConfig={currentState.validateConfig}
				// 标签位置，默认top，可以配置left
				labelPS="left"
				// 配置标签前后缀，@代表原标签，如@：代表在原标签后增加冒号：
				labelWithSymbol="@："
				// 类名-添加到标签上，可设置标签高度，宽度等
				labelClass="label_title_md zen_w-120 zen_t-r"
			>
				{formDataConfigList.map(function (form, index) {
					return renderFormConfig(form, index);
				})}
				{/* 底部按钮 */}
				<div className="bar-footer zen_t-r zen_p-v-48">
					{/* 所有的 <DForm type="button" /> 在点击时默认校验、定位到首个报错  */}
					<DForm type="button" className="zen_il-bl zen_m-r-12" wrapClass="gray_btn" buttonType="default" name="back">
						返回
					</DForm>
					<DForm type="button" className="zen_il-bl" buttonType="primary" name="submit">
						保存
					</DForm>
				</div>
			</FormWrap>
		</div>
	);
}
```

:::





### 通用


#### 移除某项校验报错结果

```jsx
const [currentState, updateCurrentState] = usePartState({
    formData: {},
});
const { formData } = currentState;

function demoFuc() {
    formData.$$status.表单属性 = "";
    updateCurrentState({formData});
}

<FormWrap
	formData={formData}
>
	...
</FormWrap>
```



### 先记录吧

#### 其他

| --       | --                |
| -------- | ----------------- |
| 查看模式 | FormWrap.viewMode |

#### 表单项配置

> todo 见新增优惠券、新增推广

