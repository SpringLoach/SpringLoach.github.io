## ListPage

### 简单示例

:::code-group

```[无tab]jsx
import ListPage from "@root/components/PageComps/ListPage/ListPage";

export default function DemoList(props) {
	const searchConfig = {
		componentList: [
			{
				componentName: "input",
				attributeConfig: {
					labelName: "真实姓名",
					name: "name"
				}
			},
			{
				componentName: "select",
				attributeConfig: {
					labelName: "状态",
					name: "status",
					dataList: [
						{
							name: "未上线",
							value: "1"
						},
						{
							name: "已上线",
							value: "10"
						}
					]
				}
			},
			{
				componentName: "datePicker",
				attributeConfig: {
					title: "考试时间",
					// 开始时间、结束时间表单属性
					startTime: "startTime",
					endTime: "endTime",
					// 为两个时间自动加上时分秒 xxxx-xx-xx 00:00:00
					needSpecificTime: true
				}
			}
		]
	};

	const column = [
		{
			title: "项目名称", // 列表标题
			ppt: "brand" // 列表默认渲染属性
		},
		{
			title: "部门名称",
			ppt: "material",
			render: function (text, index, item) {
				return <div>{text}</div>;
			}
		},
		{
			title: "创建时间",
			ppt: "scrapDate",
			columnClass: "zen_w-p20", // 类名-对应列 可以限制列宽度
			render: function (text, index, item) {
				return <div className="oms_break-all">{text && Filter.formatDate(text, "Y-m-d H:i:s")}</div>;
			}
		}
	];
	
	const mockData = [
		{ name: 123 }
	];

	return (
		<div>
			<ListPage
				className="f_sp-xx-list-page"
				// 必传，列表请求方法
				endPoint={REST.airBottle.list.queryPage}
				// 必删，提供给列表的假数据，不再触发请求
                // todoMaster
                initList={mockData}
				// 可选，搜索控件配置
				searchConfig={searchConfig}
				// 必传，表格的相关配置
				tableConfig={tableConfig}
				// 可选，页面标题
				pageTitle="页面标题"
				// 可选，列表标题
				listTitle={"单位列表"} // 可选
				// 可选，将搜索参数转化为时间戳形式
				formDataType={{
					startTime: "timeStamp",
					endTime: "timeStamp"
				}}
			/>
		</div>
	);
}
```





```[带tab]jsx
import ListPage from "@root/components/PageComps/ListPage/ListPage";

export default function DemoList(props) {
	const [currentState, updateCurrentState] = usePartState({
		activeValue: "10"
	});
	const { activeValue } = currentState;
	
	const tabConfig = {
		activeValue: activeValue,
		tabList: [
			{
				name: "未上线",
				value: "1"
			},
			{
				name: "已上线",
				value: "10"
			},
			{
				name: "已下线",
				value: "20"
			}
		]
	};
	
	const searchConfig = {
		componentList: [
			{
				componentName: "input",
				attributeConfig: {
					labelName: "真实姓名",
					name: "name"
				}
			},
			{
				componentName: "select",
				attributeConfig: {
					labelName: "状态",
					name: "status",
					dataList: [
						{
							name: "未上线",
							value: "1"
						},
						{
							name: "已上线",
							value: "10"
						}
					]
				}
			},
			{
				componentName: "datePicker",
				attributeConfig: {
					title: "考试时间",
					// 开始时间、结束时间表单属性
					startTime: "startTime",
					endTime: "endTime",
					// 为两个时间自动加上时分秒 xxxx-xx-xx 00:00:00
					needSpecificTime: true
				}
			}
		]
	};

	const column = [
		{
			title: "项目名称", // 列表标题
			ppt: "brand" // 列表默认渲染属性
		},
		{
			title: "部门名称",
			ppt: "material",
			render: function (text, index, item) {
				return <div>{text}</div>;
			}
		},
		{
			title: "创建时间",
			ppt: "scrapDate",
			columnClass: "zen_w-p20", // 类名-对应列 可以限制列宽度
			render: function (text, index, item) {
				return <div className="oms_break-all">{text && Filter.formatDate(text, "Y-m-d H:i:s")}</div>;
			}
		}
	];
	
	function clickTab(index, item) {
		updateCurrentState({
			activeValue: item.value
		});
	}
	
	const mockData = [
		{ name: 123 }
	];

	return (
		<div>
			<ListPage
				className="f_sp-xx-list-page"
				// 可选，列表页没有tab可以不传
				tabConfig={tabConfig}
				// 切换tab回调
				clickTab={clickTab}
				// 必传，列表请求方法
				endPoint={REST.airBottle.list.queryPage}
				// 必删，提供给列表的假数据，不再触发请求
                // todoMaster
                initList={mockData}
				// 可选，搜索控件配置
				searchConfig={searchConfig}
				// 必传，表格的相关配置
				tableConfig={tableConfig}
				// 可选，页面标题
				pageTitle="页面标题"
				// 可选，列表标题
				listTitle={"单位列表"} // 可选
				// 可选，将搜索参数转化为时间戳形式
				formDataType={{
					startTime: "timeStamp",
					endTime: "timeStamp"
				}}
			/>
		</div>
	);
}
```



```[详细备注]jsx
import ListPage from "@root/components/PageComps/ListPage/ListPage";

export default function DemoList(props) {
	const [currentState, updateCurrentState] = usePartState({
		activeValue: "10"
	});
	const { activeValue } = currentState;

	const tabConfig = {
		activeValue: activeValue,
		tabList: [
			{
				name: "未上线",
				value: "1"
			},
			{
				name: "已上线",
				value: "10"
			},
			{
				name: "已下线",
				value: "20"
			}
		]
	};

	const searchConfig = {
		componentList: [
			{
				// 控件类型
				// input-输入框
				// select-下拉框
				// levelSelect-级联下拉框
				// dateFilter-日期过滤组件
				// datePicker-时间范围
				// inputRang-输入框范围
				componentName: "input",
				attributeConfig: {
					// 标签名称
					labelName: "真实姓名",
					// 表单属性
					name: "name"
				}
			},
			{
				componentName: "select",
				attributeConfig: {
					labelName: "状态",
					name: "status",
					// 映射枚举数据的键值属性名
					// nameProp: "name",
					// valueProp: "value",
					// 枚举数据
					dataList: [
						{
							name: "未上线",
							value: "1"
						},
						{
							name: "已上线",
							value: "10"
						},
						{
							name: "已下线",
							value: "20"
						}
					],
                    // 是否可输入筛选
                    allowSearch: true,
				}
			},
			{
				componentName: "levelSelect",
				attributeConfig: {
					labelName: "分类",
					name: "classId",
					// 可选，限制最大层级
					limitDeep: 2,
					dataList: [
						{
							id: 2,
							name: "安全类试题",
							parentId: 1,
							children: [
								{ id: 5, name: "医学生物类安全", parentId: 2, children: [{ id: 227, name: "dfdfdfdf", parentId: 5, children: [] }] },
								{ id: 4, name: "化学类安全", parentId: 2, children: [] },
								{ id: 3, name: "通识类安全", parentId: 2, children: [] }
							]
						},
						{ id: 226, name: "学科类试题", parentId: 1, children: [] }
					]
				}
			},
			{
				componentName: "datePicker",
				attributeConfig: {
					// 标签名称
					title: "考试时间",
					// 开始时间、结束时间表单属性
					startTime: "startTime",
					endTime: "endTime",
					// 为两个时间自动加上时分秒 xxxx-xx-xx 00:00:00
					needSpecificTime: true
				}
			},
			{
				componentName: "inputRang",
				attributeConfig: {
					labelName: "商品价格",
					// 两个输入框的表单属性
					firstInputConfig: {
						name: "minPrice"
					},
					lastInputConfig: {
						name: "maxPrice"
					}
				}
			},
			{
				componentName: "select",
				attributeConfig: {
					labelName: "单位",
					name: "org",
					dataList: [
						{
							name: "未上线",
							value: "1"
						},
						{
							name: "已上线",
							value: "10"
						},
						{
							name: "已下线",
							value: "20"
						},
						{
							name: "asd",
							value: "20"
						}
					],
					// showCleanIcon: false,
					// shouldReselectAgain: false,
					config: {
						// 隐藏【全部】选项
						isHideAllOption: false
					},
					// 允许输入搜索
					allowSearch: true,
					// 为真时搜索忽略大小写
					searchIgnoreCase: true,
					// 搜索最大上限
					searchMaxLength: 10
				}
			}
		]
	};

	const column = [
		{
			title: "项目名称", // 列表标题
			ppt: "brand" // 列表默认渲染属性
		},
		{
			title: "部门名称",
			ppt: "material",
			render: function (text, index, item) {
				return <div>{text}</div>;
			}
		},
		{
			title: "创建时间",
			ppt: "scrapDate",
			columnClass: "zen_w-p20", // 类名-对应列 可以限制列宽度
			render: function (text, index, item) {
				return <div className="oms_break-all">{text && Filter.formatDate(text, "Y-m-d H:i:s")}</div>;
			}
		}
	];
	const tableConfig = {
		column,
		config: {
			dataKey: "id", // 设置为key的属性
			wrapClass: "", // 类名-表格容器
			bodyClass: "",
			trClass: "", // 类名-每行
			tdClass: "zen_p-16" // 类名-每个单元格
		}
	};

	function clickTab(index, item) {
		updateCurrentState({
			activeValue: item.value
		});
	}
	
	const mockData = [
		{ name: 123 }
	];

	return (
		<div>
			<ListPage
				className="f_sp-xx-list-page"
				// 可选，列表页没有tab可以不传
				tabConfig={tabConfig}
				// 切换tab回调
				clickTab={clickTab}
                // 必删，提供给列表的假数据，不再触发请求
                // todoMaster
                initList={mockData}
				// 必传，列表请求方法
				endPoint={REST.airBottle.list.queryPage}
				// 可选，搜索控件配置
				searchConfig={searchConfig}
				// 可选，操作区域按钮配置
				// btnOperatorConfig={btnOperatorConfig}
				// 必传，表格的相关配置
				tableConfig={tableConfig}
				// 可选，页面标题
				pageTitle="页面标题"
				// 可选，列表标题
				listTitle={"单位列表"} // 可选
				// 可选，将搜索参数转化为时间戳形式
				formDataType={{
					startTime: "timeStamp",
					endTime: "timeStamp"
				}}
				// pagination={{
				// 	showPagination: false // 默认true，显示翻页组件
				// }}
			/>
		</div>
	);
}
```



:::



### tab配置

```jsx
const [currentState, updateCurrentState] = usePartState({
	// 激活tab
	activeValue: 99,
});
const { activeValue } = currentState;

const pageTabList = [
    {
        name: `全部(${stateA || 0})`,
        value: 99
    },
    {
        name: `待使用(${stateA.xx || 0})`,
        value: 1
    },
    {
        name: "使用中",
        value: 2
    }
];

const tabConfig = {
    tabList: pageTabList,
    activeValue
};

function clickTab(index, item, configData) {
    // 可以手动修改入参
	outsideRef.current.formData.usageStatus = item.value == 99 ? "" : item.value;
	updateCurrentState({
		activeValue: item.value,
	});
}

// 处理入参，tab对应属性需要从这里传入
function dealParams(resData) {
	if (activeValue != 99) {
		resData.usageStatus = activeValue;
	}
}

<ListPage
    tabConfig={tabConfig}
    // 切换tab回调
    clickTab={clickTab}
    // 处理列表请求入参
	dealParams={dealParams}
/>
```



### 搜索配置

```jsx
let xxYyData = {
	stateList: [
		{
			name: "AAA",
			value: "AAA"
		},
		{
			name: "BBB",
			value: "BBB"
		},
	],
};

export default xxYyData;
```

```jsx
import xxYyData from "@root/DataInit/xx/xxYyData.js";

const searchConfig = {
    // 配置搜索项
	componentList: [
		{
            // 控件类型
			componentName: "select",
            // 隐藏条件
            // isHide: true,
            // 禁用条件
            // disabled: true,
			attributeConfig: {
                // 标签名称
				labelName: "状态类型",
                // 表单属性
				name: "gasBottleType",
                // 映射枚举数据的键值属性名
				// nameProp: "name",
				// valueProp: "value",
                // 类-控件
				wrapClass: "zen_w-330",
                // 类-标签
				labelClass: "zen_w-88",
                // 枚举数据
				dataList: xxYyData.stateList
			}
		},
		{
			componentName: "input",
			attributeConfig: {
				labelName: "品牌",
				name: "brand",
				wrapClass: "zen_w-330",
				labelClass: "zen_w-88"
			}
		}
	],
    // 重置回调，这里可以调整参数
	handleReset: formData => {
		formData.usageStatus = activeValue == 99 ? "" : activeValue;
	}
};

<ListPage
    searchConfig={searchConfig}
/>
```



### 表格配置

```jsx
const column = [
	{
		title: "示例一",
		ppt: "test1",
        // 设置为百分比较多，也可以设置具体宽度
		columnClass: "zen_w-p20"
	},
	{
		title: "示例二",
		ppt: "test2",
		columnClass: "zen_w-p45"
	},
	{
		title: "示例三",
		ppt: "test3",
		columnClass: "zen_w-p35"
	},
];
```



#### 单行溢出隐藏&&Tip

```jsx
{
	title: "型号规格",
	ppt: "ii",
	columnClass: "zen_w-p15",
	render: function (text, index, item) {
		return (
			<div>
				<ZenTips text={item.pp} offsetLeft={0}>
                    {/* 需要配置宽度，否则内容能够无限长 */}
					<div className="zen_elli zen_w-200">规格编码：{item.pp}</div>
				</ZenTips>
			</div>
		);
	}
},
```



#### 表格内容垂直居中

```less
.f_sp-xx-list-page {
    .ZenTable-table-td {
        vertical-align: middle;
    }
}
```



### 参数处理

#### 添加请求参数

```jsx
import ListPage from "@root/components/PageComps/ListPage/ListPage";

export default function DemoList(props) {
	const { item } = props;

	const tableConfig = {
		config: {
			dataKey: "id"
		},
		column: [
			{
				title: "操作人",
				ppt: "operator",
				columnClass: "zen_w-p30"
			},
			{
				title: "操作时间",
				ppt: "createTime",
				columnClass: "zen_w-p30",
				render: (text, record) => <span>{Filter.formatDate(new Date(text), "Y-m-d H:i:s")}</span>
			},
			{
				title: "操作内容",
				ppt: "content",
				columnClass: "zen_w-p40"
			}
		]
	};

	return (
		<div>
			<ListPage
				endPoint={REST.airBottle.detail.queryLog}
				// 接口入参添加属性（自带pageNo和pageSize）
				paramsConfig={{ id: item.id }}
				tableConfig={tableConfig}
			/>
		</div>
	);
}
```



#### 列表入参出参处理

> 更加灵活

```jsx
// 处理入参，如额外添加入参
function dealParams(resData) {
	resData.xx = 123
}

// 处理列表的返回数据
function dealGetListData(res) {
	if (!res.data) {
		res.data = {};
	}
}

<ListPage
    // 处理列表接口的入参
	dealParams={dealParams}
    // 处理列表接口的返回
	dealGetListData={dealGetListData}
/>
```



### 组件访问

#### 访问搜索条件表单

```jsx
export default function XXX(props) {
	const outsideRef = React.useRef({});

    // 封装：访问特定属性
    function getFormdata(name = 'status') {
		let _formData = outsideRef.current.formData || {}; // [!code warning]
		return _formData[name]
	}
    
    function demoFunc() {
        // 获取
        const params = outsideRef.current.formData; // [!code warning]
        // 修改
        outsideRef.current.formData.xx = 1
    }
    
    return (
        <ListPage
            outsideRef={outsideRef}
        />
    )
}
```



#### 重新获取列表数据

```jsx
export default function demoList(props) {
	const outsideRef = React.useRef({});

    // 更新当前页面的所有 ListPage
	function demoFunc() {
		EventApi.emit("ListPageRefData");
	}

	// 仅更新目标 ListPage
	function demoFunc() {
		outsideRef.current.ListPageRefData();
	}
    
    return (
        <ListPage
            outsideRef={outsideRef}
        />
    )
}
```



### 先记录吧

> 可能缺了点什么，没完全梳理完，但是有参考价值

#### 点击筛选项回调

```jsx
// 根据选择更新列表
// 参数一：当前选中项数组
// 进行全选操作时，隐藏了复选框的数据项也会包含其中(奇怪)
// 参数二：点击单选时，{ isAll: true/false, item: obj } isAll在达成全选时返回true，否则返回false
// obj 对应的数据项，会额外添加属性：
//     __selected   布尔值，是否选中 
//    _hideCheckbox 布尔值，该项的复选框是否隐藏
// 参数二：点击全选时，{ isAll: true, isCheck: true/false } isAll 始终为true(奇怪)  isCheck在全选时返回true，取消全选时返回false
function selectChange(selectList, currentItem, currentIndex) {
	// 全选时（点击全选时 / 单选达成全选时），将没有复选框的项选中属性设置为false，否则设置为true
	if (currentItem.isAll) {
		Uts.each(selectList, function (item, index) {
			item.__selected = item.isCheck = item._hideCheckbox == true ? false : true; // 过滤没有复选框的数据
		});
	}
	// 点击全选时
	if (currentItem.isAll && Uts.isDefined(currentItem.isCheck)) {
		// 如果全部选中，筛选出(当前页)选中数据，添加到【选中项列表】？
		if (currentItem.isCheck) {
			let _selectDataList = Uts.filterObjByCondition(selectList, { isCheck: true });
			Uts.mergeArray(selectDataList, _selectDataList);
		// 否则为全部取消，清空【选中项列表】
		} else {
			updateCurrentState({ selectDataList: [] });
			return false;
		}
	// 点击单选时
	} else {
		// 如果是选中，将该项添加到【选中项列表】
		if (currentItem.item.__selected) {
			selectDataList.push(currentItem.item);
		} else {
			// 否则，从【选中项列表】移除该项
			const delIndex = Uts.findIndex(selectDataList, null, (item) => {
				return item.id == currentItem.item.id
			})
			if (delIndex !== -1) {
				selectDataList.splice(delIndex, 1)
			}
		}
	}
	updateCurrentState({ selectDataList });
}
```

