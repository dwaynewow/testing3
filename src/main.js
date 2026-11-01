import './style.css';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/400-italic.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';

document.querySelectorAll('.wordmark').forEach(el=>el.innerHTML='<img src="/images/logo.png" alt="IVA AMU"><span>natural stone jewelry</span>');

const paths = {
 search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
 arrow: '<path d="M4 12h15m-5-5 5 5-5 5"/>',
 heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
 bag: '<path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/>',
 close: '<path d="m6 6 12 12M6 18 18 6"/>',
 plus: '<path d="M12 5v14M5 12h14"/>', minus:'<path d="M5 12h14"/>',
 menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
 spark:'<path d="m12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7L12 2Z"/>',
 stone:'<path d="m8 3 9 1 5 8-7 9-10-3L2 10l6-7Z"/><path d="m8 3 2 8 7-7m5 8-12-1 5 10M2 10l8 1-5 7"/>',
 gift:'<path d="M3 8h18v4H3zM5 12v9h14v-9M12 8v13"/><path d="M12 8C4 9 5 2 8 3c3 0 4 5 4 5s1-5 4-5c3-1 4 6-4 5Z"/>',
 hand:'<path d="m3 13 3-1 5 3h5c3 0 3 3 0 3H9m8-4 3-2c3-1 4 1 2 3l-6 6H9l-6-4M5 4l2 3 3 1-3 1-2 3-1-3-3-1 3-1 1-3Z"/>',
 flower:'<path d="M12 12C1 7 7-4 12 7c5-11 11 0 0 5Zm0 0c5-11 16-5 5 0 11 5 0 11-5 0Zm0 0c11 5 5 16 0 5-5 11-11 0 0-5Zm0 0C1 17-4 7 7 12-4 7 7 1 12 12Z"/>',
 check:'<path d="m5 12 4 4L19 6"/>',
};
const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.spark}</svg>`;
document.querySelectorAll('[data-icon]').forEach(el => el.innerHTML = icon(el.dataset.icon));
document.querySelector('#bag-icon').innerHTML = icon('bag');
document.querySelector('#favorites-button').innerHTML = icon('heart');
document.querySelector('#menu-button').innerHTML = icon('menu');
document.querySelector('#year').textContent = new Date().getFullYear();

const products = [
 { id:'jade',name:'Тихая гармония',stone:'Нефрит · золотистый акцент',mood:'Гармония',price:2900,position:'0%',description:'Глубокие зелёные оттенки нефрита и лаконичный золотистый акцент. Спокойное сочетание, которое легко вписать в повседневный образ. Символичный выбор для тех, кому близки баланс и естественность.' },
 { id:'rose',name:'Нежность к себе',stone:'Розовый кварц · золотистый акцент',mood:'Любовь',price:2600,position:'33.333%',description:'Мягкий розовый кварц с полупрозрачными переливами. Нежный браслет как личное напоминание о внимании к себе и тёплом отношении к близким.' },
 { id:'smoke',name:'Внутренняя опора',stone:'Дымчатый кварц · золотистый акцент',mood:'Уверенность',price:3100,position:'66.667%',description:'Дымчатый кварц глубокого коричневого оттенка с прозрачными гранями света. Сдержанное украшение с характером для тех, кто выбирает простоту и выразительные детали.' },
 { id:'tiger',name:'Тёплый импульс',stone:'Тигровый глаз · золотистый акцент',mood:'Энергия',price:2800,position:'100%',description:'Медовые оттенки тигрового глаза оживают на свету. Тёплый акцент в образе, который можно выбрать как символ вдохновения и движения к новым идеям.' },
];
const money=n=>new Intl.NumberFormat('ru-RU').format(n)+' ₽';
const readSaved=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
const savedCart=readSaved('iva-cart',[]),savedFavorites=readSaved('iva-favorites',[]);
let cart=(Array.isArray(savedCart)?savedCart:[]).filter(x=>x&&products.some(p=>p.id===x.id)&&/^(15|16|17|18|19|20|21)$/.test(x.size)&&Number.isInteger(x.quantity)&&x.quantity>0&&x.quantity<=99);
let favorites=(Array.isArray(savedFavorites)?savedFavorites:[]).filter(id=>products.some(p=>p.id===id));
let currentFilter='all',favoritesOnly=false,currentSearch='';
let selectedSize='17',quizStep=0,quizAnswers=[];
const save=()=>{try{localStorage.setItem('iva-cart',JSON.stringify(cart));localStorage.setItem('iva-favorites',JSON.stringify(favorites))}catch{}updateCount()};
function updateCount(){const count=cart.reduce((sum,item)=>sum+item.quantity,0);document.querySelector('.cart-count').textContent=count;document.querySelector('#cart-button').setAttribute('aria-label',`Открыть корзину: ${count} товаров`)}
function renderProducts(){
 const list=products.filter(p=>(currentFilter==='all'||p.mood===currentFilter)&&(!favoritesOnly||favorites.includes(p.id))&&(!currentSearch||`${p.name} ${p.stone} ${p.mood}`.toLocaleLowerCase('ru').includes(currentSearch)));
 document.querySelector('#product-count').textContent=`${list.length} ${list.length===1?'украшение':'украшения'}`;
 document.querySelector('#products').innerHTML=list.length?list.map(p=>`<article class="product-card"><div class="product-image"><div class="product-photo" style="background-position:${p.position} center" role="img" aria-label="Браслет ${p.name}"></div><button class="product-open" data-detail="${p.id}" aria-label="Подробнее: ${p.name}"></button><span class="product-tag">${p.mood}</span><button class="product-favorite ${favorites.includes(p.id)?'active':''}" data-favorite="${p.id}" aria-label="${favorites.includes(p.id)?'Убрать из':'Добавить в'} избранное: ${p.name}" aria-pressed="${favorites.includes(p.id)}">${icon('heart')}</button></div><div class="product-info"><h3><button class="text-button" data-detail="${p.id}">${p.name}</button></h3><p>${p.stone}</p><div class="product-bottom"><span>${money(p.price)}</span><button class="add-button" data-detail="${p.id}" aria-label="Выбрать размер и добавить: ${p.name}">${icon('plus')}</button></div></div></article>`).join(''):`<div class="empty-products"><p>${favoritesOnly?'Здесь будут любимые украшения.<br>Нажми на сердечко в карточке браслета.':currentSearch?'По запросу ничего не нашлось.<br>Попробуй название камня: нефрит, кварц или тигровый глаз.':'В этой категории пока нет украшений.'}</p><button class="underlined" data-reset>Показать всю коллекцию</button></div>`;
 document.querySelector('#favorites-button').classList.toggle('is-active',favoritesOnly);
}
let toastTimer;
function toast(message){const el=document.querySelector('#toast');el.textContent=message;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),2800)}
const drawer=document.querySelector('#drawer'),overlay=document.querySelector('#overlay');
let lastFocus;
function openDrawer(title,content){if(drawer.hidden)lastFocus=document.activeElement;drawer.innerHTML=`<div class="drawer-top"><h2 id="drawer-title">${title}</h2><button class="icon-button" data-close aria-label="Закрыть">${icon('close')}</button></div>${content}`;drawer.hidden=false;overlay.hidden=false;document.body.style.overflow='hidden';drawer.querySelector('[data-close]').focus()}
function closeDrawer(){drawer.hidden=true;overlay.hidden=true;document.body.style.overflow='';lastFocus?.focus()}
overlay.addEventListener('click',closeDrawer);
document.addEventListener('keydown',event=>{if(drawer.hidden)return;if(event.key==='Escape')closeDrawer();if(event.key==='Tab'){const focusables=[...drawer.querySelectorAll('button,a,input,select,textarea,[tabindex="0"]')].filter(el=>!el.disabled);const first=focusables[0],last=focusables.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}});
function sizeOptions(value='17'){return ['15','16','17','18','19','20','21'].map(size=>`<option value="${size}" ${size===value?'selected':''}>${size} см</option>`).join('')}
function productDetails(id){const p=products.find(p=>p.id===id);selectedSize='17';openDrawer(p.name,`<div class="detail-image" role="img" aria-label="${p.name}" style="background-position:${p.position} center"></div><p class="drawer-note">${p.stone}</p><p class="detail-description">${p.description}</p><div class="detail-price">${money(p.price)}</div><label class="field">Обхват запястья<select id="product-size">${sizeOptions()}</select></label><p class="drawer-note">Укажи обхват без прибавки. Рекомендация для свободной посадки: добавить 1–1,5 см при изготовлении.</p><button class="button primary" data-add="${p.id}">Добавить в корзину ${icon('plus')}</button><p class="drawer-note">Пример изделия и цены. Продажи ещё не запущены.</p>`)}
function addToCart(id,size){const item=cart.find(x=>x.id===id&&x.size===size);if(item){if(item.quantity>=99)return toast('Достигнуто максимальное количество');item.quantity++}else cart.push({id,size,quantity:1});save();toast('Браслет добавлен в корзину');renderCart()}
function renderCart(){openDrawer('Твой выбор',cart.length?`<p class="drawer-intro">Украшения, которые откликнулись.</p><div>${cart.map((item,index)=>{const p=products.find(p=>p.id===item.id);return `<article class="cart-item"><div class="cart-thumb" role="img" aria-label="${p.name}" style="background-position:${p.position} center"></div><div><h3>${p.name}</h3><p>Запястье ${item.size} см · ${money(p.price)}</p><div class="quantity-row"><div class="quantity"><button data-quantity="${index}" data-delta="-1" aria-label="Уменьшить количество ${p.name}">${icon('minus')}</button><span>${item.quantity}</span><button data-quantity="${index}" data-delta="1" aria-label="Увеличить количество ${p.name}" ${item.quantity>=99?'disabled':''}>${icon('plus')}</button></div><button class="remove" data-remove="${index}">Убрать</button></div></div></article>`}).join('')}</div><div class="cart-total"><span>Итого</span><strong>${money(cart.reduce((sum,item)=>sum+products.find(p=>p.id===item.id).price*item.quantity,0))}</strong></div><button class="button primary" id="save-order">Скачать список выбора ${icon('arrow')}</button><p class="drawer-note">Это демонстрационная корзина. Оплата, доставка и отправка заказа пока недоступны. Скачанный список останется у тебя.</p>`:`<div class="cart-empty">${icon('bag')}<h3>Здесь начинается твоя история</h3><p>Выбери браслет в коллекции<br>или начни с персонального подбора.</p><button class="button primary" data-close>Перейти к коллекции ${icon('arrow')}</button><button class="underlined" data-quiz>Найти свой камень</button></div>`)}
const quizQuestions=[
 {title:'Чего хочется сейчас?',options:['Больше спокойствия','Тепла и заботы о себе','Чувствовать уверенность','Вдохновения и новых идей']},
 {title:'Какие оттенки тебе ближе?',options:['Природные зелёные','Нежные и светлые','Глубокие и сдержанные','Тёплые и золотистые']},
 {title:'Какой обхват запястья?',size:true},
];
function startQuiz(){quizStep=0;quizAnswers=[];renderQuiz()}
function renderQuiz(){const q=quizQuestions[quizStep];openDrawer('Найди свой камень',`<div class="quiz-progress"><span style="width:${(quizStep+1)/3*100}%"></span></div><p class="step-label">Вопрос ${quizStep+1} из 3</p><h3>${q.title}</h3>${q.size?`<p class="drawer-intro">Измерь запястье сантиметровой лентой без натяжения. Размер можно изменить в карточке браслета.</p><label class="field">Обхват<select id="quiz-size">${sizeOptions(quizAnswers[2])}</select></label><button class="button primary" id="quiz-finish">Посмотреть рекомендацию ${icon('arrow')}</button>`:`<div class="quiz-options">${q.options.map((text,index)=>`<button class="quiz-option" data-answer="${index}">${text}${icon('arrow')}</button>`).join('')}</div>`}${quizStep>0?'<button class="quiz-back" id="quiz-back">Назад</button>':'<p class="drawer-note">Выбирай по ощущению. Здесь нет правильных и неправильных ответов.</p>'}`)}
function quizResult(){
 const p=products[quizAnswers[0]],alternative=products[quizAnswers[1]];
 const secondary=p.id!==alternative.id?`<section class="quiz-alternative"><p class="drawer-note">Ещё один вариант — по любимой палитре</p><article class="cart-item"><div class="cart-thumb" role="img" aria-label="${alternative.name}" style="background-position:${alternative.position} center"></div><div><h3>${alternative.name}</h3><p>${alternative.stone}</p><p>${money(alternative.price)}</p></div></article><button class="underlined" data-quiz-add="${alternative.id}">Выбрать этот браслет ${icon('plus')}</button></section>`:'';
 openDrawer('Твой отклик',`<div class="quiz-result"><p class="drawer-note">Твоему настроению созвучен</p><h3>${p.name}</h3><div class="detail-image" role="img" aria-label="${p.name}" style="background-position:${p.position} center"></div><p class="detail-description">${p.description}</p><p class="drawer-note">${p.id===alternative.id?'Твой запрос и любимая палитра совпали. ':''}${p.stone} · запястье ${quizAnswers[2]} см</p><div class="detail-price">${money(p.price)}</div><button class="button primary" data-quiz-add="${p.id}">Добавить в корзину ${icon('plus')}</button>${secondary}<button class="underlined" data-quiz>Пройти подбор ещё раз</button><p class="drawer-note">Подбор учитывает твои эстетические предпочтения. Камни не заменяют медицинскую или психологическую помощь.</p></div>`)
}
function downloadOrder(){const lines=['IVA AMU — мой выбор','Демонстрационный список. Не является оформленным заказом.','',...cart.map(item=>{const p=products.find(p=>p.id===item.id);return `${p.name} | ${p.stone} | запястье ${item.size} см | ${item.quantity} шт. | ${money(p.price*item.quantity)}`;}),'',`Итого по демонстрационным ценам: ${money(cart.reduce((sum,item)=>sum+products.find(p=>p.id===item.id).price*item.quantity,0))}`];const url=URL.createObjectURL(new Blob(['\uFEFF'+lines.join('\n')],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='IVA-AMU-мой-выбор.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Список выбора сохранён')}
document.addEventListener('click',event=>{
 const target=event.target.closest('button,a');if(!target)return;
 if(target.hasAttribute('data-close')){closeDrawer();return}
 if(target.hasAttribute('data-quiz')){startQuiz();return}
 if(target.dataset.category){currentFilter=target.dataset.category;favoritesOnly=false;currentSearch='';document.querySelector('#catalog-search').value='';document.querySelectorAll('[data-filter]').forEach(el=>el.classList.toggle('active',el.dataset.filter===currentFilter));renderProducts();document.querySelector('#collection').scrollIntoView({behavior:'smooth'})}
 if(target.dataset.filter){currentFilter=target.dataset.filter;favoritesOnly=false;document.querySelectorAll('[data-filter]').forEach(el=>el.classList.toggle('active',el===target));renderProducts()}
 if(target.dataset.favorite){const id=target.dataset.favorite;favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];save();renderProducts();toast(favorites.includes(id)?'Добавлено в избранное':'Убрано из избранного')}
 if(target.dataset.detail)productDetails(target.dataset.detail);
 if(target.dataset.add)addToCart(target.dataset.add,document.querySelector('#product-size').value);
 if(target.dataset.quizAdd)addToCart(target.dataset.quizAdd,quizAnswers[2]);
 if(target.hasAttribute('data-quantity')){const index=Number(target.dataset.quantity);const quantity=cart[index].quantity+Number(target.dataset.delta);if(quantity<=0)cart.splice(index,1);else cart[index].quantity=quantity;save();renderCart()}
 if(target.hasAttribute('data-remove')){cart.splice(Number(target.dataset.remove),1);save();renderCart()}
 if(target.hasAttribute('data-answer')){quizAnswers[quizStep]=Number(target.dataset.answer);quizStep++;renderQuiz()}
 if(target.id==='quiz-back'){quizStep--;renderQuiz()}
 if(target.id==='quiz-finish'){quizAnswers[2]=document.querySelector('#quiz-size').value;quizResult()}
 if(target.id==='save-order')downloadOrder();
 if(target.id==='cart-button')renderCart();
 if(target.id==='favorites-button'||target.id==='menu-favorites'){if(target.id==='menu-favorites')closeDrawer();currentSearch='';document.querySelector('#catalog-search').value='';favoritesOnly=target.id==='menu-favorites'?true:!favoritesOnly;currentFilter='all';document.querySelectorAll('[data-filter]').forEach(el=>el.classList.toggle('active',el.dataset.filter==='all'));renderProducts();document.querySelector('#collection').scrollIntoView({behavior:'smooth'})}
 if(target.hasAttribute('data-reset')||target.id==='view-all'){currentSearch='';document.querySelector('#catalog-search').value='';favoritesOnly=false;currentFilter='all';document.querySelectorAll('[data-filter]').forEach(el=>el.classList.toggle('active',el.dataset.filter==='all'));renderProducts()}
 if(target.id==='menu-button')openDrawer('IVA AMU','<nav class="mobile-navigation"><a href="#collection" data-close>Коллекция</a><a href="#approach" data-close>Наш подход</a><button class="text-button" id="menu-favorites" style="text-align:left">Избранное</button><button class="text-button" data-quiz style="text-align:left">Найти свой камень</button></nav>');
 if(target.id==='privacy-button')openDrawer('Конфиденциальность','<p class="privacy-text">Корзина и избранное сохраняются в локальном хранилище твоего браузера. Ответы анкеты используются только на этой странице и не отправляются на сервер. Форм оплаты и сбора контактных данных в демонстрационной версии нет.</p><p class="privacy-text">Перед запуском продаж здесь появятся полные условия обработки персональных данных и сведения о продавце.</p><button class="underlined" id="clear-data">Удалить сохранённый выбор</button>');
 if(target.id==='clear-data'){cart=[];favorites=[];save();renderProducts();toast('Корзина и избранное очищены')}
});
document.querySelector('.search-form').addEventListener('submit',event=>{event.preventDefault();currentSearch=document.querySelector('#catalog-search').value.trim().toLocaleLowerCase('ru');currentFilter='all';favoritesOnly=false;document.querySelectorAll('[data-filter]').forEach(el=>el.classList.toggle('active',el.dataset.filter==='all'));renderProducts();document.querySelector('#collection').scrollIntoView({behavior:'smooth'})});
updateCount();renderProducts();
