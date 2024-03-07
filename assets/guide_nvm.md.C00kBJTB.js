import{_ as s,c as a,o as e,V as i}from"./chunks/framework.DIvs8UGF.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/nvm.md","filePath":"guide/nvm.md"}'),t={name:"guide/nvm.md"},l=i('<h3 id="安装教程" tabindex="-1">安装教程 <a class="header-anchor" href="#安装教程" aria-label="Permalink to &quot;安装教程&quot;">​</a></h3><p><a href="https://blog.csdn.net/qq_22182989/article/details/125387145" target="_blank" rel="noreferrer">https://blog.csdn.net/qq_22182989/article/details/125387145</a></p><h3 id="安装node-js官方包" tabindex="-1">安装node.js官方包 <a class="header-anchor" href="#安装node-js官方包" aria-label="Permalink to &quot;安装node.js官方包&quot;">​</a></h3><blockquote><p>根据<a href="https://zhuanlan.zhihu.com/p/558784826" target="_blank" rel="noreferrer">教程</a>，可以从<a href="https://nodejs.org/download/release/" target="_blank" rel="noreferrer">官方</a>上找到任意版本的包进行安装，window 版本的命名如下：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">node-v14.20.0-x64.msi</span></span></code></pre></div></blockquote><h3 id="常用命令" tabindex="-1">常用命令 <a class="header-anchor" href="#常用命令" aria-label="Permalink to &quot;常用命令&quot;">​</a></h3><p>查看所有安装的 node.js 版本</p><div class="language-elm vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">elm</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nvm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ls</span></span></code></pre></div><p>查看所有可以直接（通过命令行）安装的 node.js 版本</p><div class="language-elm vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">elm</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nvm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> list available</span></span></code></pre></div><p>安装 16.15.0 版本的 node.js</p><div class="language-elm vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">elm</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nvm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> install </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">16.15</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span></span></code></pre></div><p>切换当前使用的 node.js 版本</p><div class="language-elm vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">elm</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nvm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> use </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">16.15</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span></span></code></pre></div><p>查看当前 node.js 版本</p><div class="language-elm vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">elm</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">node</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">v</span></span></code></pre></div><p>卸载 16.15.0 版本的 node.js</p><div class="language-elm vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">elm</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nvm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> uninstall </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">16.15</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span></span></code></pre></div><h3 id="nvm下npm安装yarn-找不到程序" tabindex="-1">nvm下npm安装yarn，找不到程序 <a class="header-anchor" href="#nvm下npm安装yarn-找不到程序" aria-label="Permalink to &quot;nvm下npm安装yarn，找不到程序&quot;">​</a></h3><blockquote><p>想使用<code>pnpm</code> ，也可以进行类似的处理</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>无法将“yarn”项识别为 cmdlet、函数、脚本文件或可运行程序的名称</span></span></code></pre></div><ol><li>先尝试在某个node版本下安装 <code>yarn</code></li></ol><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install yarn -g</span></span></code></pre></div><ol start="2"><li><p>在 nvm 的安装目录下，在 <code>nvm/nodejs</code> 文件夹中找到了对应的一些 yarn 文件（不同于教程中的 <code>node_global </code>），将它们复制到了上一层 <code>nvm</code></p></li><li><p>在 <code>nvm/nodejs/node_modules</code> 中将 yarn 文件夹复制到了 <code>nvm/node_modules</code> （我是新增的）中</p></li><li><p>在命令行可以正常查看到 <code>yarn</code> 版本</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -v</span></span></code></pre></div></li></ol>',23),n=[l];function p(h,d,o,c,r,k){return e(),a("div",null,n)}const m=s(t,[["render",p]]);export{u as __pageData,m as default};
