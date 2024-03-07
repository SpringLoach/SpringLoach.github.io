import{_ as s,c as a,o as n,V as i}from"./chunks/framework.DIvs8UGF.js";const p=""+new URL("pure-border.D5HcJmoN.png",import.meta.url).href,l=""+new URL("clamp-test.Cbr07Dhz.png",import.meta.url).href,t=""+new URL("search-animation.Cv4mBxut.png",import.meta.url).href,b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/样式.md","filePath":"guide/样式.md"}'),e={name:"guide/样式.md"},h=i(`<h3 id="覆盖元素背景图" tabindex="-1">覆盖元素背景图 <a class="header-anchor" href="#覆盖元素背景图" aria-label="Permalink to &quot;覆盖元素背景图&quot;">​</a></h3><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.bg</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    background-image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">url</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;https://xxx.png&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    background-repeat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">no-repeat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    background-size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 100</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="最后一个元素设置特别样式" tabindex="-1">最后一个元素设置特别样式 <a class="header-anchor" href="#最后一个元素设置特别样式" aria-label="Permalink to &quot;最后一个元素设置特别样式&quot;">​</a></h3><div class="language-less vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">less</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    padding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">24</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    border-bottom</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> dashed</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> #e5e5ea</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    &amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">last-child</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        border-bottom</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">none</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="css文字渐变" tabindex="-1">css文字渐变 <a class="header-anchor" href="#css文字渐变" aria-label="Permalink to &quot;css文字渐变&quot;">​</a></h3><blockquote><p>链接里也有带阴影文字渐变效果</p></blockquote><p><a href="https://zhuanlan.zhihu.com/p/643134748" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/643134748</a> 那个阴影，用蓝湖样式有问题的，不能直接用 text-shadow</p><p>一般把蓝湖的背景色属性值复制到下面 <code>background-image</code> 中</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">transparent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  background-image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">linear-gradient</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">45</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">deg</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">gold</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">purple</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cyan</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">deeppink</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -webkit-background-clip</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  background-clip</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="原生不规律表格添加内外border" tabindex="-1">原生不规律表格添加内外border <a class="header-anchor" href="#原生不规律表格添加内外border" aria-label="Permalink to &quot;原生不规律表格添加内外border&quot;">​</a></h3><p><img src="`+p+`" alt="image-20240122200706719"></p><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;!-- 申诉信息 --&gt;</span></span>
<span class="line"><span>&lt;div class=&quot;main-box&quot;&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;box-title&quot;&gt;申诉信息&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;appeal-box&quot;&gt;</span></span>
<span class="line"><span>        &lt;div class=&quot;appeal-item appeal-8&quot;&gt;</span></span>
<span class="line"><span>            &lt;div class=&quot;label&quot;&gt;申诉状态&lt;/div&gt;</span></span>
<span class="line"><span>            &lt;div class=&quot;value&quot;&gt;待处理&lt;/div&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div class=&quot;appeal-item appeal-8&quot;&gt;</span></span>
<span class="line"><span>            &lt;div class=&quot;label&quot;&gt;申诉发起人&lt;/div&gt;</span></span>
<span class="line"><span>            &lt;div class=&quot;value&quot;&gt;李四&lt;/div&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div class=&quot;appeal-item appeal-8&quot;&gt;</span></span>
<span class="line"><span>            &lt;div class=&quot;label&quot;&gt;申诉发起时间&lt;/div&gt;</span></span>
<span class="line"><span>            &lt;div class=&quot;value&quot;&gt;xx&lt;/div&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div class=&quot;appeal-item appeal-8&quot;&gt;</span></span>
<span class="line"><span>            &lt;div class=&quot;label&quot;&gt;申诉原因&lt;/div&gt;</span></span>
<span class="line"><span>            &lt;div class=&quot;value&quot;&gt;无法联系到项目方&lt;/div&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div class=&quot;appeal-item appeal-16&quot;&gt;</span></span>
<span class="line"><span>            &lt;div class=&quot;label&quot;&gt;申诉内容&lt;/div&gt;</span></span>
<span class="line"><span>            &lt;div class=&quot;value&quot;&gt;xx&lt;/div&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div class=&quot;appeal-item appeal-24&quot;&gt;</span></span>
<span class="line"><span>            &lt;div class=&quot;label&quot;&gt;申诉凭证&lt;/div&gt;</span></span>
<span class="line"><span>            &lt;div class=&quot;value&quot;&gt;xx&lt;/div&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;style lang=&quot;scss&quot;&gt;</span></span>
<span class="line"><span>.appeal-box {</span></span>
<span class="line"><span>    display: flex;</span></span>
<span class="line"><span>    flex-wrap: wrap;</span></span>
<span class="line"><span>    border-bottom: 1px solid #ccc;</span></span>
<span class="line"><span>    border-left: 1px solid #ccc;</span></span>
<span class="line"><span>    .appeal-item {</span></span>
<span class="line"><span>        display: flex;</span></span>
<span class="line"><span>        align-items: flex-start;</span></span>
<span class="line"><span>        padding: 16px;</span></span>
<span class="line"><span>        border-top: 1px solid #ccc;</span></span>
<span class="line"><span>        border-right: 1px solid #ccc;</span></span>
<span class="line"><span>        .label {</span></span>
<span class="line"><span>            white-space: nowrap;</span></span>
<span class="line"><span>            &amp;::after {</span></span>
<span class="line"><span>                content: &#39;：&#39;;</span></span>
<span class="line"><span>                display: inline;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        .value {</span></span>
<span class="line"><span>            word-break: break-all;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    .appeal-8 {</span></span>
<span class="line"><span>        width: 33.33%;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    .appeal-16 {</span></span>
<span class="line"><span>        width: 66.66%;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    .appeal-24 {</span></span>
<span class="line"><span>        width: 99.99%;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/style&gt;</span></span></code></pre></div><ul><li>最后一项自适应占据剩余宽度</li></ul><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.appeal-box</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">appeal-item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:last-child {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    	flex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="vue引入并使用字体示例" tabindex="-1">vue引入并使用字体示例 <a class="header-anchor" href="#vue引入并使用字体示例" aria-label="Permalink to &quot;vue引入并使用字体示例&quot;">​</a></h3><p><a href="https://blog.csdn.net/Orange71234/article/details/131323105" target="_blank" rel="noreferrer">https://blog.csdn.net/Orange71234/article/details/131323105</a></p><p><a href="https://font.chinaz.com/22110701153.htm" target="_blank" rel="noreferrer">https://font.chinaz.com/22110701153.htm</a></p><h3 id="文字大小自适应文字宽度" tabindex="-1">文字大小自适应文字宽度 <a class="header-anchor" href="#文字大小自适应文字宽度" aria-label="Permalink to &quot;文字大小自适应文字宽度&quot;">​</a></h3><blockquote><p>场景：图片占满屏幕宽度(高度自适应)，需要添加文字到图片中；对于不同尺寸屏幕，希望字体大小不同。</p></blockquote><p>可以使用 clamp 函数<a href="https://blog.csdn.net/qq_44793507/article/details/129629040" target="_blank" rel="noreferrer">实现</a>，具体参数可以<a href="https://min-max-calculator.9elements.com/" target="_blank" rel="noreferrer">调试</a></p><p>如果使用了 sass，注意一些计算单位（如 <code>vw</code>）要用 <code>calc()</code> <a href="https://www.likecs.com/ask-6566627.html" target="_blank" rel="noreferrer">包裹</a></p><p>示例：设计稿为1920px，字体30px，需要适配比它小的屏幕，那么按照下面来，然后调另外两个数字就好</p><p><img src="`+l+'" alt="image-20230912113737717"></p><h3 id="网页-查看动画代码" tabindex="-1">网页-查看动画代码 <a class="header-anchor" href="#网页-查看动画代码" aria-label="Permalink to &quot;网页-查看动画代码&quot;">​</a></h3><p><img src="'+t+'" alt="image-20230911181257444"></p><h3 id="保留模板中的换行" tabindex="-1">保留模板中的换行 <a class="header-anchor" href="#保留模板中的换行" aria-label="Permalink to &quot;保留模板中的换行&quot;">​</a></h3><p><a href="https://www.python100.com/html/7Z8GF38YV4W3.html" target="_blank" rel="noreferrer">https://www.python100.com/html/7Z8GF38YV4W3.html</a></p>',27),k=[h];function r(c,d,o,g,E,u){return n(),a("div",null,k)}const m=s(e,[["render",r]]);export{b as __pageData,m as default};
