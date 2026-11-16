(function(){'use strict';var $=function(id){return document.getElementById(id);};
var open=false;
function T(vi,en){return (window.LANG==='en')?en:vi;}
function toggle(){open=!open;$('giftStage').classList.toggle('open',open);$('giftCard').setAttribute('aria-hidden',String(!open));$('giftCard').inert=!open;
['openGift','giftToggle'].forEach(function(id){$(id).setAttribute('aria-expanded',String(open));});
$('giftToggle').textContent=open?T('ĐÓNG BAO LÌ XÌ','CLOSE THE ENVELOPE'):T('CHẠM ĐỂ MỞ BAO LÌ XÌ','TAP TO OPEN THE ENVELOPE');}
$('openGift').onclick=toggle;$('giftToggle').onclick=toggle;
$('copyAccount').onclick=function(){var ok=function(){$('giftStatus').textContent=T('Đã chép số tài khoản.','Account number copied.');};
try{navigator.clipboard.writeText('0935857258').then(ok,function(){$('giftStatus').textContent='MB Bank · 0935857258';});}catch(e){$('giftStatus').textContent='MB Bank · 0935857258';}};
$('saveQR').onclick=function(){var b=this;b.disabled=true;fetch($('giftQR').src).then(function(r){if(!r.ok)throw 0;return r.blob();}).then(function(blob){
var u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download='QR-Kim-Huong.png';document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u);},60000);
$('giftStatus').textContent=T('Đã tải mã QR.','QR saved.');}).catch(function(){$('giftStatus').textContent=T('Nhấn giữ mã QR để lưu ảnh.','Press and hold the QR to save it.');}).then(function(){b.disabled=false;});};
})();
