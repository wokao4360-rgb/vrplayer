var x=Object.defineProperty;var y=(g,e,t)=>e in g?x(g,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):g[e]=t;var d=(g,e,t)=>y(g,typeof e!="symbol"?e+"":e,t);import{n as w,v as T,s as p,g as f}from"./index-B41CKJJF.js";import{E as S,a as E}from"./errorMessages-B9tTBARV.js";import{l as b,c as C,s as k}from"./draftStorage-Be1LM_rK.js";import{c as I}from"./copyText-CwU0x1sN.js";const v="vrplayer_config_draft_ignore_session";class ${constructor(e,t){d(this,"element");d(this,"config");d(this,"initialConfig");d(this,"editingTarget",{type:"global"});d(this,"simpleMode",!0);d(this,"validationErrors",[]);d(this,"validationDebounceTimer",null);d(this,"draftSaveTimer",null);d(this,"draftLoaded",!1);d(this,"draftIgnoreSession",!1);d(this,"draftBannerMessage",null);d(this,"onConfigChange");this.config=JSON.parse(JSON.stringify(e)),this.initialConfig=JSON.parse(JSON.stringify(e)),this.onConfigChange=t;try{this.draftIgnoreSession=sessionStorage.getItem(v)==="1"}catch(i){console.warn("读取草稿忽略状态失败",i),this.draftIgnoreSession=!1}this.tryRestoreDraft(),this.element=document.createElement("div"),this.element.className="config-studio",this.render(),this.applyStyles(),this.renderDraftBanner(),this.validateConfig()}tryRestoreDraft(){if(this.draftIgnoreSession)return;const e=b();e&&(this.config=JSON.parse(JSON.stringify(e)),this.draftLoaded=!0,this.draftBannerMessage="检测到未导出的草稿，已自动恢复。",this.onConfigChange&&this.onConfigChange(this.config))}renderDraftBanner(){const e=this.element.querySelector("#draft-banner");if(!e)return;if(!this.draftLoaded||this.draftIgnoreSession){e.innerHTML="",e.style.display="none";return}const t=this.draftBannerMessage||"检测到未导出的草稿，已自动恢复。";e.innerHTML=`
      <div class="draft-banner-content">
        <span class="draft-banner-text">${this.escapeHtml(t)}</span>
        <div class="draft-banner-actions">
          <button class="banner-btn" data-banner-action="export">导出</button>
          <button class="banner-btn" data-banner-action="clear">清空草稿</button>
          <button class="banner-btn" data-banner-action="ignore">忽略本次</button>
        </div>
      </div>
    `,e.style.display="flex",this.bindDraftBannerEvents()}bindDraftBannerEvents(){const e=this.element.querySelector("#draft-banner");e&&e.querySelectorAll("[data-banner-action]").forEach(t=>{t.addEventListener("click",i=>{const s=i.currentTarget.getAttribute("data-banner-action");s==="export"?this.handleExport():s==="clear"?this.handleClearDraft():s==="ignore"&&this.handleIgnoreDraft()})})}handleIgnoreDraft(){this.draftIgnoreSession=!0;try{sessionStorage.setItem(v,"1")}catch(e){console.warn("记录忽略草稿状态失败",e)}this.config=JSON.parse(JSON.stringify(this.initialConfig)),this.draftLoaded=!1,this.draftBannerMessage=null,this.renderSidebar(),this.renderEditor(),this.bindEvents(),this.debouncedValidate(),this.notifyChange({skipDraftSave:!0}),this.renderDraftBanner(),this.showToast("已忽略草稿，本次会话使用默认配置")}handleClearDraft(){confirm("确定清空本地草稿？")&&(C(),this.draftLoaded=!1,this.draftBannerMessage=null,this.renderDraftBanner(),this.showToast("草稿已清空"))}handleExport(){this.exportConfig();const e=b();e&&this.isConfigSameAs(e)&&this.showToast("已导出（草稿仍保留）")}exportConfig(){const e=JSON.stringify(this.config,null,2),t=new Blob([e],{type:"application/json"}),i=URL.createObjectURL(t),s=document.createElement("a");s.href=i,s.download="config.json",s.click(),URL.revokeObjectURL(i)}isConfigSameAs(e){try{return JSON.stringify(this.config)===JSON.stringify(e)}catch{return!1}}render(){this.element.innerHTML=`
      <div class="studio-container">
        <div class="draft-banner" id="draft-banner" aria-live="polite"></div>
        <!-- 顶部工具条 -->
        <div class="studio-toolbar">
          <div class="toolbar-left">
            <button class="toolbar-btn" id="import-btn">📥 导入配置</button>
            <button class="toolbar-btn" id="export-btn">📤 导出配置</button>
            <button class="toolbar-btn" id="reset-btn">🔄 重置为示例</button>
            <button class="toolbar-btn" id="clear-draft-btn">🗑️ 清空草稿</button>
          </div>
          <div class="toolbar-right">
            <label class="simple-toggle">
              <input type="checkbox" id="simple-mode-toggle" checked>
              <span>简易模式</span>
            </label>
            <div class="validation-status" id="validation-status">⏳ 校验中...</div>
          </div>
        </div>

        <!-- 主内容区：左右两栏 -->
        <div class="studio-content">
          <!-- 左栏：馆/场景树 -->
          <div class="studio-sidebar">
            <div class="sidebar-header">配置结构</div>
            <div class="sidebar-tree" id="sidebar-tree"></div>
          </div>

          <!-- 右栏：表单编辑区 -->
          <div class="studio-editor">
            <div class="editor-header" id="editor-header">选择左侧项目进行编辑</div>
            <div class="editor-form" id="editor-form"></div>
          </div>
        </div>

        <!-- 底部：错误面板 -->
        <div class="studio-errors" id="studio-errors"></div>
      </div>

      <!-- 隐藏的文件输入 -->
      <input type="file" id="file-input" accept=".json" style="display: none;">
    `,this.renderSidebar(),this.renderEditor(),this.bindEvents()}renderSidebar(){const e=this.element.querySelector("#sidebar-tree");e&&(e.innerHTML=`
      <div class="tree-item ${this.editingTarget.type==="global"?"active":""}" data-target="global">
        <span class="tree-icon">🌐</span>
        <span class="tree-label">全局配置</span>
      </div>
      ${this.config.museums.map((t,i)=>`
        <div class="tree-item museum-item ${this.editingTarget.type==="museum"&&this.editingTarget.museumIndex===i?"active":""}" data-target="museum:${i}">
          <span class="tree-icon">🏛️</span>
          <span class="tree-label">${this.escapeHtml(t.name)}</span>
          <button class="tree-btn-add" data-action="add-scene" data-museum="${i}" title="添加场景">+</button>
          <button class="tree-btn-del" data-action="del-museum" data-museum="${i}" title="删除博物馆">×</button>
        </div>
        ${t.scenes.map((s,n)=>`
          <div class="tree-item scene-item ${this.editingTarget.type==="scene"&&this.editingTarget.museumIndex===i&&this.editingTarget.sceneIndex===n?"active":""}" data-target="scene:${i}:${n}">
            <span class="tree-icon">📷</span>
            <span class="tree-label">${this.escapeHtml(s.name)}</span>
            ${this.simpleMode?`
              <button class="tree-btn-add" data-action="add-hotspot-scene" data-museum="${i}" data-scene="${n}" title="添加跳转热点">+ 添加跳转</button>
              <button class="tree-btn-add" data-action="add-hotspot-video" data-museum="${i}" data-scene="${n}" title="添加视频热点">+ 添加视频</button>
            `:`
              <button class="tree-btn-add" data-action="add-hotspot" data-museum="${i}" data-scene="${n}" title="添加热点">+</button>
            `}
            <button class="tree-btn-del" data-action="del-scene" data-museum="${i}" data-scene="${n}" title="删除场景">×</button>
          </div>
          ${s.hotspots.map((a,r)=>`
            <div class="tree-item hotspot-item ${this.editingTarget.type==="hotspot"&&this.editingTarget.museumIndex===i&&this.editingTarget.sceneIndex===n&&this.editingTarget.hotspotIndex===r?"active":""}" data-target="hotspot:${i}:${n}:${r}">
              <span class="tree-icon">📍</span>
              <span class="tree-label">${this.escapeHtml(a.label)}${this.simpleMode&&a.type!=="scene"&&a.type!=="video"?"（高级模式编辑）":""}</span>
              <button class="tree-btn-del" data-action="del-hotspot" data-museum="${i}" data-scene="${n}" data-hotspot="${r}" title="删除热点">×</button>
            </div>
          `).join("")}
        `).join("")}
      `).join("")}
      <div class="tree-item tree-item-add">
        <button class="tree-btn-add-main" id="add-museum-btn">+ 添加博物馆</button>
      </div>
    `)}renderEditor(){const e=this.element.querySelector("#editor-header"),t=this.element.querySelector("#editor-form");!e||!t||(this.simpleMode?this.renderSimpleForm(e,t):this.renderAdvancedForm(e,t))}renderSimpleForm(e,t){if(this.editingTarget.type==="global"){e.textContent="全局配置",t.innerHTML=`
        <div class="form-group">
          <label>应用名称</label>
          <input type="text" id="field-appName" value="${this.escapeHtml(this.config.appName)}" placeholder="应用名称">
        </div>
      `;return}if(this.editingTarget.type==="museum"){const i=this.config.museums[this.editingTarget.museumIndex];e.textContent=`编辑博物馆：${i.name}`,t.innerHTML=`
        <div class="form-group">
          <label>馆ID</label>
          <input type="text" id="field-id" value="${this.escapeHtml(i.id)}" placeholder="museum_id">
        </div>
        <div class="form-group">
          <label>馆名</label>
          <input type="text" id="field-name" value="${this.escapeHtml(i.name)}" placeholder="博物馆名称">
        </div>
        <div class="form-group">
          <label>封面图 URL</label>
          <input type="text" id="field-cover" value="${this.escapeHtml(i.cover)}" placeholder="https://...">
          <div class="input-hint">建议使用可直接访问的 https 链接</div>
        </div>
      `;return}if(this.editingTarget.type==="scene"){const i=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex];e.textContent=`编辑场景：${i.name}`,t.innerHTML=`
        <div class="form-group">
          <label>场景ID</label>
          <input type="text" id="field-id" value="${this.escapeHtml(i.id)}" placeholder="scene_id">
        </div>
        <div class="form-group">
          <label>场景名</label>
          <input type="text" id="field-name" value="${this.escapeHtml(i.name)}" placeholder="场景名称">
        </div>
        <div class="form-group">
          <label>缩略图</label>
          <input type="text" id="field-thumb" value="${this.escapeHtml(i.thumb)}" placeholder="https://...">
          <div class="input-hint">建议使用可直接访问的 https 链接</div>
        </div>
        <div class="form-group">
          <label>低清全景 (panoLow)</label>
          <input type="text" id="field-panoLow" value="${i.panoLow?this.escapeHtml(i.panoLow):""}" placeholder="https://...">
          <div class="input-hint">首屏快速加载，网络慢时优先使用</div>
        </div>
        <div class="form-group">
          <label>高清全景 (pano)</label>
          <input type="text" id="field-pano" value="${i.pano?this.escapeHtml(i.pano):""}" placeholder="https://...">
          <div class="input-hint">建议使用可直接访问的 https 链接</div>
        </div>
        <div class="form-actions">
          <button class="btn-preview" id="preview-scene-btn">👁️ 预览此场景</button>
          <button class="btn-pick-hotspot" id="pick-hotspot-btn">🎯 用拾取落点新增热点</button>
        </div>
      `;return}if(this.editingTarget.type==="hotspot"){const i=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex],s=i.type==="scene",n=i.type==="video";if(e.textContent=`编辑热点：${i.label}`,!s&&!n){t.innerHTML=`
          <div class="notice-box">
            该热点类型仅可在高级模式编辑，请切换到高级模式。
          </div>
        `;return}t.innerHTML=`
        <div class="form-actions" style="margin-bottom: 16px;">
          <button class="btn-pick-reposition" id="pick-reposition-btn">🎯 重新拾取位置</button>
        </div>
        <div class="form-group">
          <label>热点类型</label>
          <select id="field-type">
            <option value="scene" ${s?"selected":""}>跳转场景</option>
            <option value="video" ${n?"selected":""}>播放视频</option>
          </select>
        </div>
        <div class="form-group">
          <label>热点标题</label>
          <input type="text" id="field-label" value="${this.escapeHtml(i.label)}" placeholder="如：进入展厅">
        </div>
        <div class="form-group">
          <label>左右角度 (yaw)</label>
          <input type="number" id="field-yaw" value="${i.yaw??0}" step="0.1">
        </div>
        <div class="form-group">
          <label>上下角度 (pitch)</label>
          <input type="number" id="field-pitch" value="${i.pitch??0}" step="0.1">
        </div>
        ${s?`
          <div class="form-group">
            <label>目标场景 ID</label>
            <input type="text" id="field-target-sceneId" value="${i.target.sceneId||""}" placeholder="scene_id">
            <div class="input-hint">跳转到同馆内的场景 ID</div>
          </div>
        `:`
          <div class="form-group">
            <label>视频链接</label>
            <input type="text" id="field-target-url" value="${i.target.url||""}" placeholder="https://...">
            <div class="input-hint">建议使用可直接访问的 https 链接</div>
          </div>
        `}
      `;return}}renderAdvancedForm(e,t){if(this.editingTarget.type==="global")e.textContent="全局配置",t.innerHTML=this.renderGlobalForm();else if(this.editingTarget.type==="museum"){const i=this.config.museums[this.editingTarget.museumIndex];e.textContent=`编辑博物馆：${i.name}`,t.innerHTML=this.renderMuseumForm(i,this.editingTarget.museumIndex)}else if(this.editingTarget.type==="scene"){const i=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex];e.textContent=`编辑场景：${i.name}`,t.innerHTML=this.renderSceneForm(i,this.editingTarget.museumIndex,this.editingTarget.sceneIndex)}else if(this.editingTarget.type==="hotspot"){const i=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex];e.textContent=`编辑热点：${i.label}`,t.innerHTML=this.renderHotspotForm(i,this.editingTarget.museumIndex,this.editingTarget.sceneIndex,this.editingTarget.hotspotIndex)}}renderGlobalForm(){return`
      <div class="form-group">
        <label>应用名称</label>
        <input type="text" id="field-appName" value="${this.escapeHtml(this.config.appName)}" placeholder="应用名称">
      </div>
    `}renderMuseumForm(e,t){return`
      <div class="form-group">
        <label>博物馆 ID</label>
        <input type="text" id="field-id" value="${this.escapeHtml(e.id)}" placeholder="museum_id">
      </div>
      <div class="form-group">
        <label>博物馆名称</label>
        <input type="text" id="field-name" value="${this.escapeHtml(e.name)}" placeholder="博物馆名称">
      </div>
      <div class="form-group">
        <label>封面图 URL</label>
        <input type="text" id="field-cover" value="${this.escapeHtml(e.cover)}" placeholder="https://...">
      </div>
    `}renderSceneForm(e,t,i){return`
      <div class="form-group">
        <label>场景 ID</label>
        <input type="text" id="field-id" value="${this.escapeHtml(e.id)}" placeholder="scene_id">
      </div>
      <div class="form-group">
        <label>场景名称</label>
        <input type="text" id="field-name" value="${this.escapeHtml(e.name)}" placeholder="场景名称">
      </div>
      <div class="form-group">
        <label>缩略图 URL</label>
        <input type="text" id="field-thumb" value="${this.escapeHtml(e.thumb)}" placeholder="https://...">
      </div>
      <div class="form-group">
        <label>低清全景图 URL (panoLow)</label>
        <input type="text" id="field-panoLow" value="${e.panoLow?this.escapeHtml(e.panoLow):""}" placeholder="https://...">
      </div>
      <div class="form-group">
        <label>高清全景图 URL (pano)</label>
        <input type="text" id="field-pano" value="${e.pano?this.escapeHtml(e.pano):""}" placeholder="https://...">
      </div>
      <div class="form-actions">
        <button class="btn-preview" id="preview-scene-btn">👁️ 预览此场景</button>
      </div>
    `}renderHotspotForm(e,t,i,s){const n=e.type==="scene";return`
      <div class="form-actions" style="margin-bottom: 16px;">
        <button class="btn-pick-reposition" id="pick-reposition-btn">🎯 重新拾取位置</button>
      </div>
      <div class="form-group">
        <label>热点类型</label>
        <select id="field-type">
          <option value="scene" ${n?"selected":""}>场景跳转</option>
          <option value="video" ${n?"":"selected"}>视频播放</option>
        </select>
      </div>
      <div class="form-group">
        <label>热点标签</label>
        <input type="text" id="field-label" value="${this.escapeHtml(e.label)}" placeholder="热点标签">
      </div>
      <div class="form-group">
        <label>水平角度 (yaw)</label>
        <input type="number" id="field-yaw" value="${e.yaw??0}" step="0.1">
      </div>
      <div class="form-group">
        <label>垂直角度 (pitch)</label>
        <input type="number" id="field-pitch" value="${e.pitch??0}" step="0.1">
      </div>
      ${n?`
        <div class="form-group">
          <label>目标博物馆 ID</label>
          <input type="text" id="field-target-museumId" value="${e.target.museumId||""}" placeholder="museum_id">
        </div>
        <div class="form-group">
          <label>目标场景 ID</label>
          <input type="text" id="field-target-sceneId" value="${e.target.sceneId||""}" placeholder="scene_id">
        </div>
      `:`
        <div class="form-group">
          <label>视频 URL</label>
          <input type="text" id="field-target-url" value="${e.target.url||""}" placeholder="https://...">
        </div>
      `}
    `}bindEvents(){var a;const e=this.element.querySelector("#import-btn"),t=this.element.querySelector("#export-btn"),i=this.element.querySelector("#reset-btn"),s=this.element.querySelector("#clear-draft-btn");this.element.querySelector("#file-input");const n=this.element.querySelector("#simple-mode-toggle");n&&(n.checked=this.simpleMode,n.addEventListener("change",()=>{this.simpleMode=n.checked,this.renderSidebar(),this.renderEditor(),this.bindEvents()})),e==null||e.addEventListener("click",()=>{const r=prompt("请粘贴 JSON 配置：");if(r)try{const l=JSON.parse(r);this.config=l,this.initialConfig=JSON.parse(JSON.stringify(l)),this.draftLoaded=!1,this.draftBannerMessage=null,this.renderSidebar(),this.renderEditor(),this.validateConfig(),this.notifyChange(),this.renderDraftBanner()}catch(l){alert("JSON 格式错误："+l)}}),t==null||t.addEventListener("click",()=>{this.handleExport()}),i==null||i.addEventListener("click",async()=>{try{const l=await(await fetch("./config.json",{cache:"no-store"})).json();this.config=l,this.initialConfig=JSON.parse(JSON.stringify(l)),this.draftLoaded=!1,this.draftBannerMessage=null,this.renderSidebar(),this.renderEditor(),this.validateConfig(),this.notifyChange(),this.renderDraftBanner()}catch(r){alert("加载示例配置失败："+r)}}),s==null||s.addEventListener("click",()=>{this.handleClearDraft()}),this.element.querySelectorAll(".tree-item[data-target]").forEach(r=>{r.addEventListener("click",l=>{const o=r.getAttribute("data-target");if(o){if(o==="global")this.editingTarget={type:"global"};else if(o.startsWith("museum:")){const c=parseInt(o.split(":")[1]);this.editingTarget={type:"museum",museumIndex:c}}else if(o.startsWith("scene:")){const[c,u,h]=o.split(":").map(Number);this.editingTarget={type:"scene",museumIndex:u,sceneIndex:h}}else if(o.startsWith("hotspot:")){const[c,u,h,m]=o.split(":").map(Number);this.editingTarget={type:"hotspot",museumIndex:u,sceneIndex:h,hotspotIndex:m}}this.renderSidebar(),this.renderEditor(),this.bindFormEvents()}})}),(a=this.element.querySelector("#add-museum-btn"))==null||a.addEventListener("click",()=>{this.addMuseum()}),this.element.querySelectorAll("[data-action]").forEach(r=>{r.addEventListener("click",l=>{l.stopPropagation();const o=r.getAttribute("data-action"),c=parseInt(r.getAttribute("data-museum")||"0"),u=parseInt(r.getAttribute("data-scene")||"0"),h=parseInt(r.getAttribute("data-hotspot")||"0");o==="add-scene"?this.addScene(c):o==="del-museum"?confirm("确定删除此博物馆？")&&this.deleteMuseum(c):o==="add-hotspot"?this.addHotspot(c,u,"scene"):o==="add-hotspot-scene"?this.addHotspot(c,u,"scene"):o==="add-hotspot-video"?this.addHotspot(c,u,"video"):o==="del-scene"?confirm("确定删除此场景？")&&this.deleteScene(c,u):o==="del-hotspot"&&confirm("确定删除此热点？")&&this.deleteHotspot(c,u,h)})}),this.bindFormEvents()}bindFormEvents(){if(this.editingTarget.type==="global"){const e=this.element.querySelector("#field-appName");e==null||e.addEventListener("input",()=>{this.config.appName=e.value,this.debouncedValidate(),this.notifyChange()})}if(this.editingTarget.type==="museum"){const e=this.element.querySelector("#field-id"),t=this.element.querySelector("#field-name"),i=this.element.querySelector("#field-cover");e==null||e.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].id=e.value,this.debouncedValidate(),this.notifyChange()}),t==null||t.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].name=t.value,this.renderSidebar(),this.debouncedValidate(),this.notifyChange()}),i==null||i.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].cover=i.value,this.debouncedValidate(),this.notifyChange()})}if(this.editingTarget.type==="scene"){const e=this.element.querySelector("#field-id"),t=this.element.querySelector("#field-name"),i=this.element.querySelector("#field-thumb"),s=this.element.querySelector("#field-panoLow"),n=this.element.querySelector("#field-pano"),a=this.element.querySelector("#preview-scene-btn");e==null||e.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].id=e.value,this.debouncedValidate(),this.notifyChange()}),t==null||t.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].name=t.value,this.renderSidebar(),this.debouncedValidate(),this.notifyChange()}),i==null||i.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].thumb=i.value,this.debouncedValidate(),this.notifyChange()}),s==null||s.addEventListener("input",()=>{const l=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex];s.value?l.panoLow=s.value:delete l.panoLow,this.debouncedValidate(),this.notifyChange()}),n==null||n.addEventListener("input",()=>{const l=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex];n.value?l.pano=n.value:delete l.pano,this.debouncedValidate(),this.notifyChange()}),a==null||a.addEventListener("click",()=>{const l=this.config.museums[this.editingTarget.museumIndex],o=l.scenes[this.editingTarget.sceneIndex];w(l.id,o.id)});const r=this.element.querySelector("#pick-hotspot-btn");r==null||r.addEventListener("click",()=>{this.handleAddHotspotFromPick()})}if(this.editingTarget.type==="hotspot"){const e=this.element.querySelector("#field-type"),t=this.element.querySelector("#field-label"),i=this.element.querySelector("#field-yaw"),s=this.element.querySelector("#field-pitch"),n=this.element.querySelector("#field-target-museumId"),a=this.element.querySelector("#field-target-sceneId"),r=this.element.querySelector("#field-target-url");e==null||e.addEventListener("change",()=>{const o=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex];o.type=e.value,o.type==="scene"?o.target={museumId:"",sceneId:""}:o.target={url:""},this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}),t==null||t.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].label=t.value,this.renderSidebar(),this.debouncedValidate(),this.notifyChange()}),i==null||i.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].yaw=parseFloat(i.value)||0,this.debouncedValidate(),this.notifyChange()}),s==null||s.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].pitch=parseFloat(s.value)||0,this.debouncedValidate(),this.notifyChange()});const l=this.element.querySelector("#pick-reposition-btn");l==null||l.addEventListener("click",()=>{this.handleRepositionHotspot()}),n&&n.addEventListener("input",()=>{const o=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].target;o.museumId||(o.museumId=""),o.museumId=n.value,this.debouncedValidate(),this.notifyChange()}),a&&a.addEventListener("input",()=>{const o=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].target;o.sceneId||(o.sceneId=""),o.sceneId=a.value,this.debouncedValidate(),this.notifyChange()}),r&&r.addEventListener("input",()=>{const o=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].target;o.url||(o.url=""),o.url=r.value,this.debouncedValidate(),this.notifyChange()})}}addMuseum(){const e={id:`museum_${Date.now()}`,name:"新博物馆",cover:"",map:{image:"",width:1e3,height:600},scenes:[]};this.config.museums.push(e),this.editingTarget={type:"museum",museumIndex:this.config.museums.length-1},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}addScene(e){const t={id:`scene_${Date.now()}`,name:"新场景",thumb:"",pano:"",initialView:{yaw:0,pitch:0,fov:75},mapPoint:{x:0,y:0},hotspots:[]};this.config.museums[e].scenes.push(t),this.editingTarget={type:"scene",museumIndex:e,sceneIndex:this.config.museums[e].scenes.length-1},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}addHotspot(e,t,i="scene"){const s={id:`hotspot_${Date.now()}`,type:i,label:i==="video"?"新视频热点":"新跳转热点",yaw:0,pitch:0,target:i==="video"?{url:""}:{museumId:this.config.museums[e].id,sceneId:""}};this.config.museums[e].scenes[t].hotspots.push(s),this.editingTarget={type:"hotspot",museumIndex:e,sceneIndex:t,hotspotIndex:this.config.museums[e].scenes[t].hotspots.length-1},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}deleteMuseum(e){this.config.museums.splice(e,1),this.editingTarget={type:"global"},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}deleteScene(e,t){this.config.museums[e].scenes.splice(t,1),this.editingTarget={type:"museum",museumIndex:e},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}deleteHotspot(e,t,i){this.config.museums[e].scenes[t].hotspots.splice(i,1),this.editingTarget={type:"scene",museumIndex:e,sceneIndex:t},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}debouncedValidate(){this.validationDebounceTimer&&clearTimeout(this.validationDebounceTimer),this.validationDebounceTimer=window.setTimeout(()=>{this.validateConfig()},200)}validateConfig(){this.validationErrors=T(this.config),this.updateValidationStatus(),this.renderErrors()}scheduleDraftSave(e){e||(this.draftSaveTimer&&clearTimeout(this.draftSaveTimer),this.draftSaveTimer=window.setTimeout(()=>{const t=k(this.config);t.ok?this.draftLoaded=!0:this.showToast(`草稿保存失败：${t.reason||"未知原因"}`)},300))}updateValidationStatus(){const e=this.element.querySelector("#validation-status");e&&(this.validationErrors.length===0?(e.innerHTML="✅ 配置通过",e.className="validation-status status-ok"):(e.innerHTML=`❌ ${this.validationErrors.length} 个错误`,e.className="validation-status status-error"))}renderErrors(){const e=this.element.querySelector("#studio-errors");if(e){if(this.validationErrors.length===0){e.innerHTML="";return}e.innerHTML=`
      <div class="studio-errors-content">
        <div class="errors-header">配置错误 (${this.validationErrors.length} 个)</div>
        <div class="errors-list">
          ${this.validationErrors.map(t=>{const i=t.code&&S[t.code]||"配置错误",s=t.code&&E[t.code]||"请检查配置",n=[];t.museumName&&n.push(`馆：${t.museumName}`),t.sceneName&&n.push(`点位：${t.sceneName}`);const a=n.length>0?n.join(" / "):"全局配置";return`
              <div class="error-card-mini">
                <div class="error-card-header">
                  <span class="error-icon">❌</span>
                  <span class="error-title">${this.escapeHtml(i)}</span>
                </div>
                <div class="error-card-body">
                  <div class="error-location">📍 ${this.escapeHtml(a)}</div>
                  ${t.fieldName?`<div class="error-field">字段：${this.escapeHtml(t.fieldName)}</div>`:""}
                  <div class="error-hint">💡 ${this.escapeHtml(s)}</div>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `}}notifyChange(e){this.onConfigChange&&this.onConfigChange(this.config),this.scheduleDraftSave(!!(e!=null&&e.skipDraftSave))}showToast(e){const t=document.createElement("div");t.className="studio-toast",t.textContent=e,this.element.appendChild(t),requestAnimationFrame(()=>{t.classList.add("show")}),window.setTimeout(()=>{t.classList.remove("show"),window.setTimeout(()=>t.remove(),300)},2e3)}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}handleAddHotspotFromPick(){const e=f();if(!e){p("没有拾取点：先点右上角🎯，在全景里点一下");return}if(this.editingTarget.type!=="scene"){p("请先选择一个场景");return}const{museumIndex:t,sceneIndex:i}=this.editingTarget,s=this.config.museums[t].scenes[i],n={id:`hs_${Date.now()}`,type:"scene",yaw:e.yaw,pitch:e.pitch,label:"进入场景",target:{sceneId:""}};s.hotspots||(s.hotspots=[]),s.hotspots.push(n),this.renderSidebar(),this.renderEditor(),this.bindFormEvents();const a=s.hotspots.length-1;this.highlightNewHotspot(t,i,a),this.editingTarget={type:"hotspot",museumIndex:t,sceneIndex:i,hotspotIndex:a},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange(),p("已新增热点：请在配置里补全目标场景")}highlightNewHotspot(e,t,i){window.setTimeout(()=>{const s=this.element.querySelector("#sidebar-tree");if(!s)return;const n=s.querySelectorAll(".hotspot-item"),a=n[n.length-1];a&&(a.classList.add("tree-item--flash"),window.setTimeout(()=>{a.classList.remove("tree-item--flash")},300))},50)}handleRepositionHotspot(){if(this.editingTarget.type!=="hotspot"){p("请先选择一个热点");return}const e=f();if(!e){p("没有拾取点：先点右上角🎯，在全景里点一下");return}const{museumIndex:t,sceneIndex:i,hotspotIndex:s}=this.editingTarget,n=this.config.museums[t].scenes[i].hotspots[s],a=o=>Math.round(o*10)/10,r=a(e.yaw),l=a(e.pitch);n.yaw=r,n.pitch=l,this.renderEditor(),this.bindFormEvents(),this.highlightHotspotItem(t,i,s),this.debouncedValidate(),this.notifyChange(),window.dispatchEvent(new CustomEvent("vr:pickmode",{detail:{enabled:!1}})),p(`已更新位置 yaw:${r.toFixed(1)} pitch:${l.toFixed(1)}`)}highlightHotspotItem(e,t,i){window.setTimeout(()=>{const s=this.element.querySelector("#sidebar-tree");if(!s)return;const n=`hotspot:${e}:${t}:${i}`,a=s.querySelector(`[data-target="${n}"]`);a&&(a.classList.add("tree-item--flash"),window.setTimeout(()=>{a.classList.remove("tree-item--flash")},300))},50)}getConfig(){return this.config}getElement(){return this.element}remove(){this.element.remove()}applyStyles(){const e=document.createElement("style");e.textContent=`
      .config-studio {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #1a1a1a;
        z-index: 20000;
        display: flex;
        flex-direction: column;
        color: #fff;
        font-family: var(--vr-font-ui, "STKaiti", "Kaiti SC", "KaiTi", "Songti SC", "SimSun", "Source Han Serif SC", "Noto Serif SC", Georgia, serif);
      }
      .studio-container {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .studio-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 20px;
        background: #252525;
        border-bottom: 1px solid #333;
      }
      .draft-banner {
        display: none;
        align-items: center;
        justify-content: space-between;
        padding: 8px 16px;
        background: #2c3e50;
        border-bottom: 1px solid #34495e;
        font-size: 14px;
        color: #fff;
      }
      .draft-banner-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        gap: 12px;
      }
      .draft-banner-text {
        flex: 1;
      }
      .draft-banner-actions {
        display: flex;
        gap: 8px;
        flex-shrink: 0;
      }
      .banner-btn {
        padding: 6px 10px;
        background: #4a90e2;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
      }
      .banner-btn:hover {
        background: #357abd;
      }
      .toolbar-left {
        display: flex;
        gap: 8px;
      }
      .toolbar-right {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .simple-toggle {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
      }
      .simple-toggle input {
        width: 16px;
        height: 16px;
      }
      .toolbar-btn {
        padding: 8px 16px;
        background: #4a90e2;
        color: #fff;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
      }
      .toolbar-btn:hover {
        background: #357abd;
      }
      .validation-status {
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
      }
      .status-ok {
        background: #27ae60;
        color: #fff;
      }
      .status-error {
        background: #e74c3c;
        color: #fff;
      }
      .studio-content {
        display: flex;
        flex: 1;
        overflow: hidden;
      }
      .studio-sidebar {
        width: 300px;
        background: #1f1f1f;
        border-right: 1px solid #333;
        overflow-y: auto;
      }
      .sidebar-header {
        padding: 16px;
        font-weight: 600;
        border-bottom: 1px solid #333;
      }
      .sidebar-tree {
        padding: 8px;
      }
      .tree-item {
        padding: 8px 12px;
        margin: 2px 0;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        position: relative;
        transition: background 0.2s;
      }
      .tree-item:hover {
        background: #2a2a2a;
      }
      .tree-item.active {
        background: #4a90e2;
      }
      .tree-item-add {
        margin-top: 16px;
        padding: 0;
      }
      .tree-icon {
        font-size: 16px;
      }
      .tree-label {
        flex: 1;
        font-size: 14px;
      }
      .museum-item {
        font-weight: 500;
      }
      .scene-item {
        padding-left: 32px;
        font-size: 13px;
      }
      .hotspot-item {
        padding-left: 56px;
        font-size: 12px;
        color: #ccc;
      }
      .tree-btn-add,
      .tree-btn-del {
        padding: 2px 6px;
        background: transparent;
        border: 1px solid #555;
        color: #fff;
        border-radius: 3px;
        cursor: pointer;
        font-size: 12px;
        opacity: 0;
        transition: opacity 0.2s;
      }
      .tree-item:hover .tree-btn-add,
      .tree-item:hover .tree-btn-del {
        opacity: 1;
      }
      .tree-btn-add:hover {
        background: #27ae60;
        border-color: #27ae60;
      }
      .tree-btn-del:hover {
        background: #e74c3c;
        border-color: #e74c3c;
      }
      .tree-btn-add-main {
        width: 100%;
        padding: 10px;
        background: #4a90e2;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      }
      .tree-btn-add-main:hover {
        background: #357abd;
      }
      .studio-editor {
        flex: 1;
        overflow-y: auto;
        padding: 24px;
      }
      .editor-header {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 24px;
        padding-bottom: 12px;
        border-bottom: 1px solid #333;
      }
      .form-group {
        margin-bottom: 20px;
      }
      .form-group label {
        display: block;
        margin-bottom: 6px;
        font-size: 14px;
        color: #ccc;
      }
      .form-group input,
      .form-group select {
        width: 100%;
        padding: 10px;
        background: #252525;
        border: 1px solid #444;
        border-radius: 6px;
        color: #fff;
        font-size: 14px;
        font-family: inherit;
      }
      .input-hint {
        margin-top: 4px;
        color: #888;
        font-size: 12px;
      }
      .notice-box {
        padding: 12px;
        background: #252525;
        border-left: 3px solid #f39c12;
        border-radius: 6px;
        color: #f1c40f;
        font-size: 13px;
      }
      .form-group input:focus,
      .form-group select:focus {
        outline: none;
        border-color: #4a90e2;
      }
      .form-actions {
        margin-top: 24px;
      }
      .btn-preview {
        padding: 10px 20px;
        background: #27ae60;
        color: #fff;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
      }
      .btn-preview:hover {
        background: #229954;
      }
      .btn-pick-hotspot {
        padding: 10px 20px;
        background: #f39c12;
        color: #fff;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        margin-left: 8px;
      }
      .btn-pick-hotspot:hover {
        background: #e67e22;
      }
      .btn-pick-reposition {
        padding: 10px 20px;
        background: #4a90e2;
        color: #fff;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
      }
      .btn-pick-reposition:hover {
        background: #357abd;
      }
      .tree-item--flash {
        animation: tree-item-flash 0.3s ease-out;
      }
      @keyframes tree-item-flash {
        0% { background: rgba(74, 144, 226, 0.4); }
        100% { background: transparent; }
      }
      .studio-errors {
        max-height: 200px;
        overflow-y: auto;
        border-top: 1px solid #333;
        background: #0f0f0f;
      }
      .studio-errors-content {
        padding: 16px;
      }
      .errors-header {
        font-weight: 600;
        margin-bottom: 12px;
        color: #ff6b6b;
      }
      .errors-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .error-card-mini {
        padding: 12px;
        background: #252525;
        border-left: 3px solid #ff6b6b;
        border-radius: 6px;
        font-size: 12px;
      }
      .error-card-header {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 8px;
      }
      .error-icon {
        font-size: 14px;
      }
      .error-title {
        font-weight: 600;
        color: #ff6b6b;
      }
      .error-card-body {
        display: flex;
        flex-direction: column;
        gap: 4px;
        color: #ccc;
      }
      .error-location {
        color: #4a90e2;
      }
      .error-field {
        color: #ffd93d;
      }
      .error-hint {
        color: #999;
        font-size: 11px;
      }
      .studio-toast {
        position: fixed;
        right: 20px;
        top: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        padding: 10px 14px;
        border-radius: 6px;
        font-size: 13px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
        opacity: 0;
        transform: translateY(-8px);
        transition: opacity 0.2s ease, transform 0.2s ease;
        z-index: 30000;
      }
      .studio-toast.show {
        opacity: 1;
        transform: translateY(0);
      }
    `,document.head.appendChild(e)}}const z=Object.freeze(Object.defineProperty({__proto__:null,ConfigStudio:$},Symbol.toStringTag,{value:"Module"}));class L{constructor(){d(this,"element");d(this,"isVisible",!1);d(this,"currentYaw",0);d(this,"currentPitch",0);d(this,"currentFov",75);d(this,"clickX",0);d(this,"clickY",0);this.element=document.createElement("div"),this.element.className="debug-panel",this.element.style.display="none",this.render(),this.applyStyles()}render(){this.element.innerHTML=`
      <div class="debug-panel-content">
        <div class="debug-panel-header">
          <h3>🔧 调试信息</h3>
          <button class="debug-close-btn" id="debug-close-btn">×</button>
        </div>
        <div class="debug-info">
          <div class="debug-item">
            <span class="debug-label">Yaw:</span>
            <span class="debug-value" id="debug-yaw">0</span>°
          </div>
          <div class="debug-item">
            <span class="debug-label">Pitch:</span>
            <span class="debug-value" id="debug-pitch">0</span>°
          </div>
          <div class="debug-item">
            <span class="debug-label">FOV:</span>
            <span class="debug-value" id="debug-fov">75</span>°
          </div>
        </div>
        <div class="debug-actions">
          <button class="debug-btn" id="debug-copy-btn">📋 复制热点 JSON</button>
        </div>
      </div>
    `;const e=this.element.querySelector("#debug-close-btn");e&&e.addEventListener("click",()=>{this.hide()});const t=this.element.querySelector("#debug-copy-btn");t&&t.addEventListener("click",()=>{this.copyHotspotJSON()})}show(e,t,i,s,n){this.clickX=e,this.clickY=t,this.currentYaw=i,this.currentPitch=s,this.currentFov=n;const a=this.element.querySelector("#debug-yaw"),r=this.element.querySelector("#debug-pitch"),l=this.element.querySelector("#debug-fov");a&&(a.textContent=i.toFixed(1)),r&&(r.textContent=s.toFixed(1)),l&&(l.textContent=n.toFixed(1));const o=280,c=200,u=20;let h=e-o/2,m=t-c/2;h=Math.max(u,Math.min(h,window.innerWidth-o-u)),m=Math.max(u,Math.min(m,window.innerHeight-c-u)),this.element.style.left=`${h}px`,this.element.style.top=`${m}px`,this.element.style.display="block",this.isVisible=!0}hide(){this.element.style.display="none",this.isVisible=!1}updateView(e,t,i){if(this.currentYaw=e,this.currentPitch=t,this.currentFov=i,this.isVisible){const s=this.element.querySelector("#debug-yaw"),n=this.element.querySelector("#debug-pitch"),a=this.element.querySelector("#debug-fov");s&&(s.textContent=e.toFixed(1)),n&&(n.textContent=t.toFixed(1)),a&&(a.textContent=i.toFixed(1))}}async copyHotspotJSON(){const e={id:`hs_${Date.now()}`,yaw:Math.round(this.currentYaw*10)/10,pitch:Math.round(this.currentPitch*10)/10,type:"scene",targetSceneId:"",label:"热点"},t=JSON.stringify(e,null,2);try{await navigator.clipboard.writeText(t),this.showToast("✅ 已复制到剪贴板")}catch{const s=document.createElement("textarea");s.value=t,s.style.position="fixed",s.style.opacity="0",document.body.appendChild(s),s.select();try{document.execCommand("copy"),this.showToast("✅ 已复制到剪贴板")}catch{this.showToast("❌ 复制失败，请手动复制")}document.body.removeChild(s)}}showToast(e){const t=document.createElement("div");t.className="debug-toast",t.textContent=e,document.body.appendChild(t),setTimeout(()=>{t.classList.add("show")},10),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>{document.body.removeChild(t)},300)},2e3)}applyStyles(){const e=document.createElement("style");e.textContent=`
      .debug-panel {
        position: fixed;
        z-index: 10001;
        background: rgba(0, 0, 0, 0.95);
        border: 2px solid #4a90e2;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        min-width: 280px;
        max-width: 90vw;
      }
      .debug-panel-content {
        padding: 16px;
      }
      .debug-panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid #333;
      }
      .debug-panel-header h3 {
        margin: 0;
        font-size: 18px;
        color: #4a90e2;
      }
      .debug-close-btn {
        background: none;
        border: none;
        color: #fff;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: background 0.2s;
      }
      .debug-close-btn:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      .debug-info {
        margin-bottom: 16px;
      }
      .debug-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid #222;
      }
      .debug-item:last-child {
        border-bottom: none;
      }
      .debug-label {
        color: #999;
        font-size: 14px;
      }
      .debug-value {
        color: #4a90e2;
        font-weight: 600;
        font-family: 'Courier New', monospace;
      }
      .debug-actions {
        display: flex;
        gap: 8px;
      }
      .debug-btn {
        flex: 1;
        padding: 10px;
        background: #4a90e2;
        color: #fff;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        cursor: pointer;
        transition: background 0.2s;
        font-family: inherit;
      }
      .debug-btn:hover {
        background: #357abd;
      }
      .debug-btn:active {
        transform: scale(0.98);
      }
      .debug-toast {
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: rgba(0, 0, 0, 0.9);
        color: #fff;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 10002;
        opacity: 0;
        transition: all 0.3s;
        pointer-events: none;
      }
      .debug-toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    `,document.head.appendChild(e)}getElement(){return this.element}remove(){this.element.remove()}}const O=Object.freeze(Object.defineProperty({__proto__:null,DebugPanel:L},Symbol.toStringTag,{value:"Module"}));class H{constructor(e){d(this,"element");d(this,"overlay");d(this,"getCurrentYaw");d(this,"sceneId");d(this,"onClose");d(this,"currentYawEl",null);d(this,"resultEl",null);d(this,"updateTimer",null);d(this,"northYawValue",null);d(this,"handleOverlayClick",null);d(this,"handleKeyDown",null);this.getCurrentYaw=e.getCurrentYaw,this.sceneId=e.sceneId,this.onClose=e.onClose,this.overlay=document.createElement("div"),this.overlay.className="vr-north-calibration-overlay",this.overlay.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 3000;
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      padding: 16px;
      padding-top: calc(16px + env(safe-area-inset-top, 0px));
    `,this.element=document.createElement("div"),this.element.className="vr-north-calibration-panel",this.element.style.cssText=`
      pointer-events: auto;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-radius: 12px;
      padding: 20px;
      min-width: 280px;
      max-width: 380px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.1);
    `,this.render(),this.overlay.appendChild(this.element),document.body.appendChild(this.overlay),this.startYawUpdate(),this.handleOverlayClick=t=>{t.target===this.overlay&&this.close()},this.overlay.addEventListener("click",this.handleOverlayClick),this.handleKeyDown=t=>{t.key==="Escape"&&(this.close(),t.preventDefault())},window.addEventListener("keydown",this.handleKeyDown)}render(){const t=this.getCurrentYaw().toFixed(1);this.element.innerHTML=`
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: rgba(255, 255, 255, 0.95);">
          🧭 校准北向
        </h3>
        <button class="vr-close-btn" style="
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          font-size: 20px;
          line-height: 1;
          padding: 4px 8px;
          border-radius: 4px;
          transition: background 0.2s, color 0.2s;
        ">×</button>
      </div>

      <div style="margin-bottom: 16px; font-size: 13px; color: rgba(255, 255, 255, 0.7); line-height: 1.6;">
        <div style="margin-bottom: 8px;">
          <strong>场景 ID：</strong><code style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; font-size: 12px;">${this.sceneId}</code>
        </div>
        <div style="margin-bottom: 12px;">
          <strong>当前 yaw：</strong><span class="vr-current-yaw" style="font-weight: 600; color: rgba(255, 255, 255, 0.9);">${t}°</span>
        </div>
        <div style="margin-top: 12px; padding: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; border-left: 3px solid rgba(255, 255, 255, 0.3);">
          <div style="margin-bottom: 8px; font-weight: 600; color: rgba(255, 255, 255, 0.9);">使用说明：</div>
          <div style="font-size: 12px; line-height: 1.5;">
            1. 将画面对准现实中的<strong>正北方向</strong><br>
            2. 点击下方【设为北】按钮<br>
            3. 复制显示的 <code>northYaw</code> 值<br>
            4. 在 config.json 中该场景的 <code>northYaw</code> 字段填入该值
          </div>
        </div>
        <div style="margin-top: 12px; font-size: 12px; color: rgba(255, 255, 255, 0.6);">
          <strong>含义：</strong>northYaw 表示当你"面向现实北"时的 yaw 值。校准就是：面向北 → 记录当前 yaw → 写入该场景的 northYaw。
        </div>
      </div>

      <div class="vr-calibration-result" style="
        ${this.northYawValue===null?"display: none;":""}
        margin-bottom: 16px;
        padding: 12px;
        background: rgba(76, 175, 80, 0.15);
        border: 1px solid rgba(76, 175, 80, 0.3);
        border-radius: 8px;
      ">
        <div style="font-size: 13px; color: rgba(255, 255, 255, 0.9); margin-bottom: 8px; font-weight: 600;">
          ✅ 已设为北向
        </div>
        <div class="vr-copy-target" style="
          font-family: 'Courier New', monospace;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.95);
          background: rgba(0, 0, 0, 0.3);
          padding: 8px 12px;
          border-radius: 6px;
          margin-bottom: 8px;
          word-break: break-all;
          user-select: all;
        "></div>
        <button class="vr-copy-btn" style="
          width: 100%;
          padding: 8px;
          background: rgba(76, 175, 80, 0.3);
          border: 1px solid rgba(76, 175, 80, 0.5);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.95);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        ">点击复制</button>
      </div>

      <div style="display: flex; gap: 8px;">
        <button class="vr-set-north-btn" style="
          flex: 1;
          padding: 10px;
          background: rgba(33, 150, 243, 0.3);
          border: 1px solid rgba(33, 150, 243, 0.5);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.95);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        ">设为北</button>
      </div>
    `;const i=this.element.querySelector(".vr-close-btn");i&&(i.addEventListener("click",()=>this.close()),i.addEventListener("mouseenter",function(){this.style.background="rgba(255, 255, 255, 0.1)",this.style.color="rgba(255, 255, 255, 0.9)"}),i.addEventListener("mouseleave",function(){this.style.background="none",this.style.color="rgba(255, 255, 255, 0.6)"}));const s=this.element.querySelector(".vr-set-north-btn");s&&(s.addEventListener("click",()=>this.handleSetNorth()),s.addEventListener("mouseenter",function(){this.style.background="rgba(33, 150, 243, 0.4)"}),s.addEventListener("mouseleave",function(){this.style.background="rgba(33, 150, 243, 0.3)"}),s.addEventListener("mousedown",function(){this.style.transform="scale(0.98)"}),s.addEventListener("mouseup",function(){this.style.transform="scale(1)"}));const n=this.element.querySelector(".vr-copy-btn");n&&(n.addEventListener("click",()=>this.handleCopy()),n.addEventListener("mouseenter",function(){this.style.background="rgba(76, 175, 80, 0.4)"}),n.addEventListener("mouseleave",function(){this.style.background="rgba(76, 175, 80, 0.3)"}),n.addEventListener("mousedown",function(){this.style.transform="scale(0.98)"}),n.addEventListener("mouseup",function(){this.style.transform="scale(1)"})),this.currentYawEl=this.element.querySelector(".vr-current-yaw"),this.resultEl=this.element.querySelector(".vr-calibration-result")}startYawUpdate(){const e=()=>{if(this.currentYawEl&&!this.northYawValue){const t=this.getCurrentYaw();this.currentYawEl.textContent=`${t.toFixed(1)}°`}this.updateTimer=window.setTimeout(e,100)};e()}stopYawUpdate(){this.updateTimer!==null&&(clearTimeout(this.updateTimer),this.updateTimer=null)}handleSetNorth(){const e=this.getCurrentYaw();this.northYawValue=e,this.resultEl&&(this.resultEl.style.display="block");const t=this.element.querySelector(".vr-copy-target");if(t){const i=`"northYaw": ${e.toFixed(1)}`;t.textContent=i,t.setAttribute("data-copy-text",i)}this.stopYawUpdate(),this.currentYawEl&&(this.currentYawEl.textContent=`${e.toFixed(1)}°`),p(`已记录北向值: ${e.toFixed(1)}°`)}async handleCopy(){const e=this.element.querySelector(".vr-copy-target");if(!e)return;const t=e.getAttribute("data-copy-text")||e.textContent||"";if(await I(t)){p("已复制到剪贴板");const s=this.element.querySelector(".vr-copy-btn");if(s){const n=s.textContent;s.textContent="✓ 已复制",setTimeout(()=>{s.textContent=n},2e3)}}else p("复制失败，请手动选择文本")}close(){this.stopYawUpdate(),this.handleOverlayClick&&(this.overlay.removeEventListener("click",this.handleOverlayClick),this.handleOverlayClick=null),this.handleKeyDown&&(window.removeEventListener("keydown",this.handleKeyDown),this.handleKeyDown=null),this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay),this.onClose&&this.onClose()}getElement(){return this.overlay}}const V=Object.freeze(Object.defineProperty({__proto__:null,NorthCalibrationPanel:H},Symbol.toStringTag,{value:"Module"}));export{z as C,O as D,V as N};
