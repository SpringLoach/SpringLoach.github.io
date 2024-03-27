#### bug总结

1. 没测试到的位置，85%的概率出bug（哪怕是添加的刷新、提示报错这种看似合乎常理的处理，依赖别人的代码，永远不知道什么时候会被坑。。）

2. 同一项目多个备份，交错处理，提交代码时很容易合漏

3. 后端返回JSON格式的字段，数组，需要判空，否则容易处理报错

4. 一些留意到的有问题的点还是最好记录下来，忙起来容易忘

5. 某些需求添加的字段，如果限制了特定类型生效，一定要注意各个位置的生效条件

   > 这里只有量尺安装订单才会校验关单条件，后端给了 measureClose 对象判断，非量尺安装类型该字段为null，这样某些位置不加条件就会出bug了

   ```javascript
   // 关闭订单
   closeOrderHandler() {
       if (this.orderBaseDataVo.servicetype == 'lz' && !this.measureClose.canClos) {
           layer.msg('未审核量尺数据时不可关闭订单')
           return
       }
       // todo
   }
   ```

6. 如果是小程序/APP内嵌h5，涉及到跳转/截图/分享相关的功能，两个端都要测试，实际效果可能会有差异





#### 连续英文允许换行

```css
word-break: break-all;
```

#### 不允许文字换行

```css
white-space: nowrap;
```

onChangeTab

celoTabs













