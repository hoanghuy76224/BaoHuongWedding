(function(){'use strict';const $=id=>document.getElementById(id);
let giftOpen=false;
function toggleGift(){giftOpen=!giftOpen;$('giftStage').classList.toggle('open',giftOpen);$('giftCard').setAttribute('aria-hidden',String(!giftOpen));$('giftCard').inert=!giftOpen;for(const id of ['openGift','giftToggle'])$(id).setAttribute('aria-expanded',String(giftOpen));$('giftToggle').textContent=giftOpen?'DONG BAO LI XI':'CH?M D? M? BAO LI XI';}
$('openGift').onclick=toggleGift;$('giftToggle').onclick=toggleGift;
$('copyAccount').onclick=async()=>{try{await navigator.clipboard.writeText('0935857258');$('giftStatus').textContent='Da sao ch�p s? t�i kho?n.';}catch{$('giftStatus').textContent='S? t�i kho?n: 0935857258';}};
$('saveQR').onclick=async()=>{const button=$('saveQR');button.disabled=true;try{const res=await fetch($('giftQR').src);if(!res.ok)throw Error('qr');const blob=await res.blob();const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='QR-Kim-Huong.png';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);$('giftStatus').textContent='Da t?i ma QR.';}catch{window.open($('giftQR').src,'_blank','noopener');$('giftStatus').textContent='Nh?n gi? ma QR d? luu ?nh.';}finally{button.disabled=false;}};
$('giftQR').addEventListener('error',()=>{$('giftStatus').textContent='Chua t?i du?c QR. B?n c� th? sao ch�p s? t�i kho?n b�n du?i.';});

})();