// import '../json/planos.json';
const PLANOS = {
   valor_mensal: 244.99,
   desconto_por_perfil: [
      0.50,
      0.50,
      0.50,
      0.50,
      0.65,
      0.80,
      0.95,
      1.10,
      1.35,
      1.50
   ],
   desconto_plano_anual: 20
}

let clients_number = 1;
let payment_option = '';

const profilesCounter = document.querySelector('.controls div p');
const profilesSlider = document.querySelector('#profiles-slider');
const arrowBadgeLeft = document.querySelector('.ti-arrow-badge-left-filled');
const arrowBadgeRight = document.querySelector('.ti-arrow-badge-right-filled');
const finalPriceDisplay = document.querySelector('#final-price-display');
const monthlyButton = document.querySelector('#payment-period #montly');
const anualButton = document.querySelector('#payment-period #anual');
const discountDisplay = document.querySelector('#discount');
const profileAmount = document.querySelector('#profile-amount');
const buyNowButton = document.querySelector('#bottom-container a');

arrowBadgeLeft.addEventListener('click', () => {
   if (clients_number > 1) {
      clients_number--;
      profilesSlider.value = clients_number;
      ChangeClientsNumberDisplay(clients_number);
   }
});

arrowBadgeRight.addEventListener('click', () => {
   if (clients_number < 10) {
      clients_number++;
      profilesSlider.value = clients_number;
      ChangeClientsNumberDisplay(clients_number);
   }
});

profilesSlider.addEventListener('change', (e) => {
   clients_number = e.target.value;
   ChangeClientsNumberDisplay(clients_number);
})

monthlyButton.addEventListener('click', () => {
   TogglePaymentMethod('monthly');
});

anualButton.addEventListener('click', () => {
   TogglePaymentMethod('anual');
});

function TogglePaymentMethod (method) {
   payment_option = method;
   anualButton.removeAttribute('enabled')
   monthlyButton.removeAttribute('enabled');

   if (payment_option === 'anual') {
      anualButton.setAttribute('enabled', '');
   } else if (payment_option === 'monthly') {
      monthlyButton.setAttribute('enabled', '');
   }

   ChangeFinalPriceDisplay();
}

function ChangeClientsNumberDisplay (value) {
   profilesCounter.innerText = value;
   ChangeFinalPriceDisplay();
}

function ChangeFinalPriceDisplay () {
   if (payment_option !== '') {
      let valorFinal = 0;
      let valorBruto = PLANOS.valor_mensal * clients_number;
      
      if (payment_option === 'monthly') 
      {
         let descontoTotal = (PLANOS.desconto_por_perfil[clients_number - 1] / 100) * valorBruto;
         valorFinal = valorBruto - descontoTotal;

         discountDisplay.innerText = `${Dot2Comma(PLANOS.desconto_por_perfil[clients_number - 1])}% de desconto`;
         profileAmount.innerText = 'EQUIVALENTE À 1 MENSALIDADE';
      } 
      else if (payment_option === 'anual') 
      {
         let descontoAnual = (PLANOS.desconto_por_perfil[clients_number - 1] * 12.75);
         valorFinal = (valorBruto * 12) * (1 - (descontoAnual / 100));

         discountDisplay.innerText = `${Dot2Comma(DecimalFormat(descontoAnual))}% de desconto`;
         profileAmount.innerText = 'EQUIVALENTE À 1 ANO';
      }
      
      buyNowButton.removeAttribute('disabled');
      buyNowButton.innerHTML = 'Comprar agora <i class="ti ti-shopping-cart"></i>'
      buyNowButton.setAttribute('href', `/checkout?payment_method=${payment_option}&profile_amount=${clients_number}&final_price=${DecimalFormat(valorFinal)}`);
      finalPriceDisplay.innerText = `R$ ${DecimalFormat(valorFinal)}`;
   }
}

function Dot2Comma (value) {
   return typeof(value) === 'string' ? value.replace(/\./, ',') : `${value}`.replace(/\./, ',');
}

function DecimalFormat (value) {
   let integerPart = `${value}`.split('.')[0];
   let decimalPart = `${value}`.split('.')[1].match(/\d{2}/);
   return `${ integerPart },${ decimalPart }`;
}