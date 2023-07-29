'use strict';

///////////////////////////////////////
// Modal window

//variables
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const firstSection = document.getElementById('section--1');
const secondSection = document.getElementById('section--2');
const tabs = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');
const tabContainer = document.querySelector('.operations__tab-container');

//functions

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// addEventListener

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', () => {
  firstSection.scrollIntoView({ behavior: 'smooth' });
});
// tabs.forEach(el => {
//   el.addEventListener('click', e => {
//     const activeContent = document.querySelector(
//       '.operations__content--active'
//     );
//     const activeTab = document.querySelector('.operations__tab--active');
//     const tabIndex = e.target.dataset.tab;
//     if (activeTab !== e.target) {
//       activeTab.classList.remove('operations__tab--active');
//       e.target.classList.add('operations__tab--active');

//       tabContent[tabIndex - 1].classList.add(
//         'operations__content--active'
//       );
//       activeContent.classList.remove('operations__content--active');
//     }
//   });
// }); //bad practice

//tab
// tabContainer.addEventListener('click', e => {
//   const activeContent = document.querySelector('.operations__content--active');
//   const activeTab = document.querySelector('.operations__tab--active');
//   const clickedTab = e.target.closest('.operations__tab') || e.target;
//   const tabIndex = clickedTab.dataset?.tab - 1;
//   // console.log('clickedTab :>> ', clickedTab);
//   // console.log('e.target :>> ', e.target);
//   // console.log(' tabIndex:>> ', tabIndex);
//   if (
//     activeTab !== clickedTab &&
//     clickedTab.classList.contains('operations__tab')
//   ) {
//     activeTab.classList.remove('operations__tab--active');
//     clickedTab.classList.add('operations__tab--active');

//     tabContent[tabIndex].classList.add('operations__content--active');
//     activeContent.classList.remove('operations__content--active');
//   }
// });
/**
 * tab comp
 */
tabContainer.addEventListener('click', e => {
  const clickedTab = e.target.closest('.operations__tab');
  if (!clickedTab) return;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  clickedTab.classList.add('operations__tab--active');
  tabContent[clickedTab.dataset.tab - 1].classList.add(
    'operations__content--active'
  );
});
