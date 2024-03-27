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



