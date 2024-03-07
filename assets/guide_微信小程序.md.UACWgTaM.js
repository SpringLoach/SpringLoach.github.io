import{_ as a,c as s,o as e,V as t}from"./chunks/framework.DIvs8UGF.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/微信小程序.md","filePath":"guide/微信小程序.md"}'),i={name:"guide/微信小程序.md"},n=t(`<h3 id="wx-showtoast-在真机中一闪而过" tabindex="-1">wx.showToast() 在真机中一闪而过 <a class="header-anchor" href="#wx-showtoast-在真机中一闪而过" aria-label="Permalink to &quot;wx.showToast() 在真机中一闪而过&quot;">​</a></h3><p>大概率是哪里调用了 wx.hideLoading() <a href="https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.hideLoading.html" target="_blank" rel="noreferrer">导致</a>的</p><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 2.22.1 以上可以加配置解决</span></span>
<span class="line"><span>wx.hideLoading({</span></span>
<span class="line"><span>  noConflict: true</span></span>
<span class="line"><span>})</span></span></code></pre></div><blockquote><p>注意wx.showToast有最大字数限制，溢出会隐藏</p></blockquote><h3 id="隐藏滚动条" tabindex="-1">隐藏滚动条 <a class="header-anchor" href="#隐藏滚动条" aria-label="Permalink to &quot;隐藏滚动条&quot;">​</a></h3><p><a href="https://blog.csdn.net/weixin_43166227/article/details/112388827" target="_blank" rel="noreferrer">https://blog.csdn.net/weixin_43166227/article/details/112388827</a></p><h3 id="vant-popup-组件自定义样式" tabindex="-1">vant-popup 组件自定义样式 <a class="header-anchor" href="#vant-popup-组件自定义样式" aria-label="Permalink to &quot;vant-popup 组件自定义样式&quot;">​</a></h3><p>可以通过 custom-class 属性添加类，在对应的 wxss 即可改动（在模板中类名体现为 custom-class 本身）</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">van-popup</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> custom-class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;tip-popup&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> show</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{{ showCloseDialog }}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;内容&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">van-popup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h3 id="点击卡片-卡片上的某按钮-交互不同" tabindex="-1">点击卡片/卡片上的某按钮，交互不同 <a class="header-anchor" href="#点击卡片-卡片上的某按钮-交互不同" aria-label="Permalink to &quot;点击卡片/卡片上的某按钮，交互不同&quot;">​</a></h3><p>外层标签用 bindtap</p><p>内层标签用 catchtap</p><h3 id="使用less" tabindex="-1">使用less <a class="header-anchor" href="#使用less" aria-label="Permalink to &quot;使用less&quot;">​</a></h3><p><a href="https://developers.weixin.qq.com/community/develop/article/doc/0008a475b40fd0c53c4bd0f905bc13" target="_blank" rel="noreferrer">https://developers.weixin.qq.com/community/develop/article/doc/0008a475b40fd0c53c4bd0f905bc13</a></p><p><a href="https://blog.csdn.net/qq_40348833/article/details/124300655" target="_blank" rel="noreferrer">https://blog.csdn.net/qq_40348833/article/details/124300655</a></p>`,15),p=[n];function l(o,r,h,c,d,k){return e(),s("div",null,p)}const _=a(i,[["render",l]]);export{g as __pageData,_ as default};
