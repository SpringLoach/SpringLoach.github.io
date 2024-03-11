---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "power"
  text: "Accumulate Steadily"
  tagline: My great project tagline
  actions:
    - theme: brand
      text: Guide
      link: /guide/待整理
    - theme: alt
      text: Business
      link: /business/test

features:
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elitpafu
---







点击复选框无法选中值：

```html
<div @click="handleChangeValue">
	<el-checkbox v-model="select" :true-label="1" :false-label="0" />
	<span>选中值</span>
</div>

<script>
function handleChangeValue() {
	if (this.select == 0) {
        this.select = 1
        // to other..
    } else {
        this.select = 0
    }
}
</script>
```

修复：

```html
<div>
	<el-checkbox :value="select" :true-label="1" :false-label="0" @cahnge="handleChangeValue" />
	<span @click="handleChangeValue">选中值</span>
</div>

<script>
function handleChangeValue() {
	if (this.select == 0) {
        this.select = 1
        // to other..
    } else {
        this.select = 0
    }
}
</script>
```



