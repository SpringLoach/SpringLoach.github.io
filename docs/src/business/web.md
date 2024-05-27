### 重要接口

订单详情-详情

```http
doQueryOrderInfo
```



### 索引

#### 首页&&支付成功集结弹窗

```
支付成功：
- src\views\placeOrderPlatform\success.vue

支付成功聚合弹窗:
- src\views\placeOrderPlatform\components\polymerization-dialog.vue


首页弹窗集结：
- src\views\layout\Layout.vue
- src\views\layout\components\activityAll.vue
```



### 业务

服务类型、服务品类枚举参考：

```
src\data\ptxdjson.js
```

流程字段判断：

```css
orderData.cId - 商品类目 (cate.catId)
  - 140 家具
  
orderData.serviceType - 服务类型
orderData.serviceTypeId - 服务类型

orderData.orderType - 下单模式(商家端平台端不同？)
  - 0 一口价
  - 1 报价
  - 3 自定义一口价订单
```

pt-orderType

| 平台 | **orderTypeCode** | **orderTypeName** |
| ---- | ----------------- | ----------------- |
| PT   | "0"               | 一口价模式        |
| PT   | "1"               | 比价模式          |
| PT   | "3"               | 议价模式          |
| PT   | "2"               | 优享服务          |
| SJ   |                   | 无                |



师傅详情-师傅报价tab：只有报价单 才会有



商家端下单-灯具类目特有页面出现条件：

erp-商家端商家列表-编辑对应的商家信息-商家配置-【灯具是否单个界面下单】选是



### 组件

#### 风格弹框

菜单-好评返现订单-批量审核好评

src\views\feedOrder\components\baseDialog.vue

下单流程-新增配件详情/配件返厂地址



商家端-下单-量尺安装提示

src\views\placeorderVip\popup\baseDialog.vue

src\views\order\popup\vip\baseDialog.vue

自定义padding边距，主题内容，按钮，可以插槽改



#### 活动(自定义)弹窗

src\views\home\components\kitchenAppliancesPopup.vue

src\views\placeOrderPlatform\popup\cookieRechargePopup.vue



### 特殊实现

#### 跳转到下单并选中特定商品类目

平台-下单页默认选中某商品类目：

```
/placeorder/index?furnitureActive=true&cId=148
```

组件下默认有处理：

```
src\views\placeOrderPlatform\index.vue
```

跳转方式参考系统消息，家具亿元补贴那块

```
src\views\person\mymessage\list.vue
```





#### 活动落地页web/h5-纯图片布局

> 均存在一个问题：在特定机型下(如1179*2556)，图片间会存在间隔，难以完美消除
>
> 图片宽度与屏幕一致，高度自适应

```html
<div class="page">
	<img class="ac-img" src="xx1" />
	<img class="ac-img" src="xx2" />
	<img class="ac-img" src="xx3" />
	<img class="ac-img" src="xx4" />
</div>

<style lang="scss" scoped>
.page {
    height: 100%;
    margin: 0 auto;
    .ac-img {
        width: 100%;
        vertical-align: middle;
    }
}
</style>
```

> 图片宽度固定，缩放滚轮，图片也会缩放。web要求如此。

```html
<div class="page">
	<div class="ac-img-1" ></div>
    <div class="ac-img-2" ></div>
    <div class="ac-img-3" ></div>
</div>

<style lang="scss" scoped>
.page {
    height: 100%;
    margin: 0 auto;
    .ac-img-1 {
    	height: 440px; // 实际高度
        background:url(images/bgbg.jpg) no-repeat center 0;
    }
    .ac-img-2 {
        // 缩放时，偶尔出现1像素空白
        margin-top: -1px;
    	height: 240px; // 实际高度
        background:url(images/bgbg.jpg) no-repeat center 0;
    }
    .ac-img-3 {
    	height: 240px; // 实际高度
        background:url(images/bgbg.jpg) no-repeat center 0;
    }
}
</style>
```

