(function(){'use strict';const $=id=>document.getElementById(id);
let giftOpen=false;
function toggleGift(){giftOpen=!giftOpen;$('giftStage').classList.toggle('open',giftOpen);$('giftCard').setAttribute('aria-hidden',String(!giftOpen));$('giftCard').inert=!giftOpen;for(const id of ['openGift','giftToggle'])$(id).setAttribute('aria-expanded',String(giftOpen));$('giftToggle').textContent=giftOpen?'ĐÓNG BAO LÌ XÌ':'CHẠM ĐỂ MỞ BAO LÌ XÌ';}
$('openGift').onclick=toggleGift;$('giftToggle').onclick=toggleGift;
$('copyAccount').onclick=async()=>{try{await navigator.clipboard.writeText('0935857258');$('giftStatus').textContent='Đã sao chép số tài khoản.';}catch{$('giftStatus').textContent='Số tài khoản: 0935857258';}};
$('saveQR').onclick=async()=>{const button=$('saveQR');button.disabled=true;try{const res=await fetch($('giftQR').src);if(!res.ok)throw Error('qr');const blob=await res.blob();const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='QR-Kim-Huong.png';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);$('giftStatus').textContent='Đã tải mã QR.';}catch{window.open($('giftQR').src,'_blank','noopener');$('giftStatus').textContent='Nhấn giữ mã QR để lưu ảnh.';}finally{button.disabled=false;}};
$('giftQR').addEventListener('error',()=>{$('giftStatus').textContent='Chưa tải được QR. Bạn có thể sao chép số tài khoản bên dưới.';});

})();