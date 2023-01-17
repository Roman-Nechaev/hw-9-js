import BSN from 'bootstrap.native';

const modal = new BSN.Modal('#modal-boot');

const btnModRef = document.querySelector('button.my-btn-save');
console.log('btnModRef', btnModRef);

const btnRef = document.querySelector('.Mybtn');
btnRef.addEventListener('click', () => {
  modal.show();
});

btnModRef.addEventListener('click', () => {
  console.log('object');
  modal.hide();
});

function name(params) {}
