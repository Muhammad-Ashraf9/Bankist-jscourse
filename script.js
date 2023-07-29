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
const nav = document.querySelector('.nav');

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

/**
 *passing arguments
 */
//()=>{} no this

const showLinks = function (e, opacity) {
  console.log('this :>> ', this);
  console.log('e.target :>> ', e.target);
  console.log('opacity :>> ', opacity);
  const link = e.target;
  const siblings = link.closest('.nav').querySelectorAll('.nav__link');
  const logo = link.closest('.nav').querySelector('.nav__logo');
  if (!e.target.classList.contains('nav__link')) return;
  siblings.forEach(sibling => {
    if (link !== sibling) sibling.style.opacity = this;
  });
  logo.style.opacity = this;
};
nav.addEventListener('mouseover', showLinks.bind(0.5));
nav.addEventListener('mouseout', showLinks.bind(1));
