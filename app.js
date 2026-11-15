'use strict';
document.documentElement.classList.add('js');
const $=id=>document.getElementById(id), reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const guest=(new URLSearchParams(location.search).get('to')||'').trim().slice(0,100);
if(guest){$('gateGuest').textContent=guest;$('guestName').textContent=guest;$('personal').hidden=false;}
document.body.classList.add('gated');
let opened=false;
function openInvitation(){if(opened)return;opened=true;$('openInvite').disabled=true;$('openText').disabled=true;$('coverEnvelope').classList.add('open');startMusic();setTimeout(()=>{$('gate').classList.add('dismissed');document.body.classList.remove('gated');$('gate').setAttribute('inert','');setTimeout(()=>$('gate').hidden=true,750);},reduced?20:1400);}
$('openInvite').addEventListener('click',openInvitation);$('openText').addEventListener('click',openInvitation);
const observer=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:.08});document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));
const chapters=new IntersectionObserver(es=>{for(const e of es){if(e.isIntersecting)$('chapterLabel').textContent=e.target.dataset.chapter;}},{rootMargin:'-30% 0px -40% 0px',threshold:0});document.querySelectorAll('[data-chapter]').forEach(e=>chapters.observe(e));
function countdown(){let diff=Math.max(0,new Date('2026-12-13T11:00:00+07:00').getTime()-Date.now());const days=Math.floor(diff/86400000);diff%=86400000;const hours=Math.floor(diff/3600000);diff%=3600000;const minutes=Math.floor(diff/60000);const seconds=Math.floor(diff%60000/1000);for(const [k,v] of Object.entries({days,hours,minutes,seconds}))$(k).textContent=String(v).padStart(2,'0');}countdown();setInterval(countdown,1000);
const items=[...document.querySelectorAll('.album-item')],lightbox=$('lightbox');let photoIndex=0,lastPhotoButton=null;
function displayPhoto(index){photoIndex=(index+items.length)%items.length;$('lightboxImage').src=items[photoIndex].dataset.image;$('lightboxImage').alt=items[photoIndex].querySelector('img').alt;$('lightboxCount').textContent=String(photoIndex+1).padStart(2,'0')+' / '+String(items.length).padStart(2,'0');}
items.forEach((item,i)=>item.addEventListener('click',()=>{lastPhotoButton=item;displayPhoto(i);lightbox.showModal();document.body.style.overflow='hidden';}));
function closePhoto(){lightbox.close();document.body.style.overflow='';lastPhotoButton?.focus({preventScroll:true});}
$('closeLightbox').onclick=closePhoto;$('lightboxPrev').onclick=()=>displayPhoto(photoIndex-1);$('lightboxNext').onclick=()=>displayPhoto(photoIndex+1);
lightbox.addEventListener('cancel',e=>{e.preventDefault();closePhoto();});lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')displayPhoto(photoIndex-1);if(e.key==='ArrowRight')displayPhoto(photoIndex+1);});
let touchX=0;lightbox.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].screenX;},{passive:true});lightbox.addEventListener('touchend',e=>{const dx=e.changedTouches[0].screenX-touchX;if(Math.abs(dx)>60)displayPhoto(photoIndex+(dx<0?1:-1));},{passive:true});
$('albumPrev').onclick=()=>$('albumTrack').scrollBy({left:-Math.min(innerWidth*.8,620),behavior:reduced?'instant':'smooth'});$('albumNext').onclick=()=>$('albumTrack').scrollBy({left:Math.min(innerWidth*.8,620),behavior:reduced?'instant':'smooth'});
let giftOpen=false;
function toggleGift(){giftOpen=!giftOpen;$('giftStage').classList.toggle('open',giftOpen);$('giftCard').setAttribute('aria-hidden',String(!giftOpen));$('giftCard').inert=!giftOpen;for(const id of ['openGift','giftToggle'])$(id).setAttribute('aria-expanded',String(giftOpen));$('giftToggle').textContent=giftOpen?'ĐÓNG BAO LÌ XÌ':'CHẠM ĐỂ MỞ BAO LÌ XÌ';}
$('openGift').onclick=toggleGift;$('giftToggle').onclick=toggleGift;
$('copyAccount').onclick=async()=>{try{await navigator.clipboard.writeText('0935857258');$('giftStatus').textContent='Đã sao chép số tài khoản.';}catch{$('giftStatus').textContent='Số tài khoản: 0935857258';}};
$('saveQR').onclick=async()=>{const button=$('saveQR');button.disabled=true;try{const res=await fetch($('giftQR').src);if(!res.ok)throw Error('qr');const blob=await res.blob();const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='QR-Kim-Huong.svg';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);$('giftStatus').textContent='Đã tải mã QR.';}catch{window.open($('giftQR').src,'_blank','noopener');$('giftStatus').textContent='Nhấn giữ mã QR để lưu ảnh.';}finally{button.disabled=false;}};
$('giftQR').addEventListener('error',()=>{$('giftStatus').textContent='Chưa tải được QR. Bạn có thể sao chép số tài khoản bên dưới.';});
const music=$('music'),musicButton=$('musicToggle');music.volume=.45;
async function startMusic(){musicButton.hidden=false;try{await music.play();musicButton.textContent='NHẠC: BẬT';musicButton.setAttribute('aria-label','Tắt nhạc nền');}catch{musicButton.textContent='NHẠC: TẮT';musicButton.setAttribute('aria-label','Bật nhạc nền');}}
musicButton.addEventListener('click',()=>{if(music.paused)startMusic();else{music.pause();musicButton.textContent='NHẠC: TẮT';musicButton.setAttribute('aria-label','Bật nhạc nền');}});
music.addEventListener('error',()=>{musicButton.hidden=true;});
