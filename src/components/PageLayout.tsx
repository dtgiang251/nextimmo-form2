'use client'; // Thêm dòng này để chuyển thành Client Component
import {useTranslations} from 'next-intl';
import {ReactNode, useState} from 'react';
import BookingForm from './BookingForm';
import Image from 'next/image';

type Props = {
  children?: ReactNode;
  title: ReactNode;
  isNotFoundPage?: boolean;
};

const Icon1 = () => (
  <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M28.6992 8.8001L16.8992 2.0001C16.8992 1.9001 4.49922 8.8001 4.49922 8.8001C4.29922 8.9001 4.19922 9.1001 4.19922 9.3001V23.0001C4.19922 23.2001 4.29922 23.3001 4.49922 23.4001L15.9992 30.0001L28.7992 23.4001C28.9992 23.3001 28.9992 23.1001 28.9992 23.0001V9.3001C28.9992 9.1001 28.8992 8.9001 28.6992 8.8001ZM16.5992 3.8001L26.8992 9.6001L23.7992 11.2001L13.5992 5.4001L16.5992 3.8001ZM12.9992 5.9001L22.8992 11.8001L20.7992 12.7001L10.6992 7.3001L12.9992 5.9001ZM23.4992 12.7001V16.4001H22.4992C22.3992 16.4001 22.1992 16.5001 22.0992 16.6001L21.5992 17.3001V13.8001L23.4992 12.7001ZM14.7992 27.5001L5.99922 22.4001V10.8001L14.7992 16.1001V27.5001ZM16.1992 15.0001L6.59922 9.4001L9.89922 7.8001L19.7992 13.3001L16.1992 15.0001ZM27.1992 22.3001L16.5992 27.8001V16.3001L20.4992 14.4001V18.6001C20.4992 18.8001 20.5992 19.0001 20.7992 19.1001H20.9992C21.0992 19.1001 21.2992 19.0001 21.2992 18.9001L22.5992 17.4001H23.7992C23.8992 17.4001 24.0992 17.3001 24.1992 17.2001C24.2992 17.1001 24.2992 17.0001 24.2992 16.8001V12.0001L26.9992 10.7001V22.3001H27.1992Z" fill="#B91C1C"/>
  </svg> 
);

const Icon2 = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.2311 17.8062H18.8311C19.0717 17.8062 19.2311 17.6469 19.2311 17.4062V15.8062C19.2311 15.5656 19.0717 15.4062 18.8311 15.4062H17.2311C16.9904 15.4062 16.8311 15.5656 16.8311 15.8062V17.4062C16.8311 17.6469 16.9904 17.8062 17.2311 17.8062ZM21.2311 17.8062H22.8311C23.0717 17.8062 23.2311 17.6469 23.2311 17.4062V15.8062C23.2311 15.5656 23.0717 15.4062 22.8311 15.4062H21.2311C20.9904 15.4062 20.8311 15.5656 20.8311 15.8062V17.4062C20.8311 17.6469 20.9904 17.8062 21.2311 17.8062ZM13.2311 17.8062H14.8311C15.0717 17.8062 15.2311 17.6469 15.2311 17.4062V15.8062C15.2311 15.5656 15.0717 15.4062 14.8311 15.4062H13.2311C12.9904 15.4062 12.8311 15.5656 12.8311 15.8062V17.4062C12.8311 17.6469 12.9904 17.8062 13.2311 17.8062ZM21.2311 23.4937H22.8311C23.0717 23.4937 23.2311 23.3344 23.2311 23.0938V21.4937C23.2311 21.2531 23.0717 21.0938 22.8311 21.0938H21.2311C20.9904 21.0938 20.8311 21.2531 20.8311 21.4937V23.0938C20.8311 23.3344 20.9904 23.4937 21.2311 23.4937ZM17.2311 23.4937H18.8311C19.0717 23.4937 19.2311 23.3344 19.2311 23.0938V21.4937C19.2311 21.2531 19.0717 21.0938 18.8311 21.0938H17.2311C16.9904 21.0938 16.8311 21.2531 16.8311 21.4937V23.0938C16.8311 23.3344 16.9904 23.4937 17.2311 23.4937ZM9.23105 23.4937H10.8311C11.0717 23.4937 11.2311 23.3344 11.2311 23.0938V21.4937C11.2311 21.2531 11.0717 21.0938 10.8311 21.0938H9.23105C8.99043 21.0938 8.83105 21.2531 8.83105 21.4937V23.0938C8.83105 23.3344 8.99043 23.4937 9.23105 23.4937ZM9.23105 17.8062H10.8311C11.0717 17.8062 11.2311 17.6469 11.2311 17.4062V15.8062C11.2311 15.5656 11.0717 15.4062 10.8311 15.4062H9.23105C8.99043 15.4062 8.83105 15.5656 8.83105 15.8062V17.4062C8.83105 17.6469 8.99043 17.8062 9.23105 17.8062ZM13.2311 23.4937H14.8311C15.0717 23.4937 15.2311 23.3344 15.2311 23.0938V21.4937C15.2311 21.2531 15.0717 21.0938 14.8311 21.0938H13.2311C12.9904 21.0938 12.8311 21.2531 12.8311 21.4937V23.0938C12.8311 23.3344 12.9904 23.4937 13.2311 23.4937Z" fill="#B91C1C"/>
  <path d="M25.0938 28.1562H6.84375C5.29375 28.1562 4.03125 26.8937 4.03125 25.3438V8.125C4.03125 6.575 5.29375 5.3125 6.84375 5.3125H25.0938C26.6437 5.3125 27.9062 6.575 27.9062 8.125V25.3438C27.9062 26.8937 26.6437 28.1562 25.0938 28.1562ZM6.84375 7.1875C6.32812 7.1875 5.90625 7.60938 5.90625 8.125V25.3438C5.90625 25.8594 6.32812 26.2812 6.84375 26.2812H25.0938C25.6094 26.2812 26.0312 25.8594 26.0312 25.3438V8.125C26.0312 7.60938 25.6094 7.1875 25.0938 7.1875H6.84375Z" fill="#B91C1C"/>
  <path d="M5.53125 10.5312H26.4062V12.4062H5.53125V10.5312ZM10.6875 8.625C10.1687 8.625 9.75 8.20625 9.75 7.6875V4.84375C9.75 4.325 10.1687 3.90625 10.6875 3.90625C11.2063 3.90625 11.625 4.325 11.625 4.84375V7.6875C11.625 8.20625 11.2063 8.625 10.6875 8.625ZM20.7812 8.625C20.2625 8.625 19.8438 8.20625 19.8438 7.6875V4.84375C19.8438 4.325 20.2625 3.90625 20.7812 3.90625C21.3 3.90625 21.7188 4.325 21.7188 4.84375V7.6875C21.7188 8.20625 21.3 8.625 20.7812 8.625Z" fill="#B91C1C"/>
  </svg> 
);

const Icon3 = () => (
  <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.6536 1.25571L28.3595 5.79888C28.9632 6.05506 29.4794 6.49034 29.8426 7.04945C30.2058 7.60856 30.3996 8.26628 30.3994 8.93912V23.0617C30.3995 23.7344 30.2056 24.392 29.8424 24.9509C29.4792 25.5098 28.9631 25.945 28.3595 26.2011L17.6536 30.7443C16.8502 31.0852 15.9486 31.0852 15.1452 30.7443L4.4393 26.2011C3.83573 25.945 3.31961 25.5098 2.95642 24.9509C2.59324 24.392 2.39937 23.7344 2.39941 23.0617V8.93912C2.3992 8.26628 2.593 7.60856 2.95619 7.04945C3.31939 6.49034 3.8356 6.05506 4.4393 5.79888L15.1452 1.25571C15.9486 0.914764 16.8502 0.914764 17.6536 1.25571ZM17.0261 2.82583C16.6705 2.67481 16.2749 2.6568 15.9078 2.77491L15.7727 2.82583L5.06683 7.36815C4.78571 7.48726 4.54206 7.68422 4.36285 7.93722C4.18363 8.19022 4.07584 8.4894 4.05141 8.80163L4.04647 8.93742V23.0626C4.04647 23.3756 4.13047 23.6826 4.28918 23.9495C4.44789 24.2164 4.67512 24.4329 4.94577 24.575L5.06683 24.6327L15.7727 29.1759C16.1284 29.3266 16.524 29.3443 16.8911 29.2259L17.0261 29.175L27.732 24.6327C28.0131 24.5136 28.2568 24.3166 28.436 24.0636C28.6152 23.8106 28.723 23.5114 28.7474 23.1992L28.7524 23.0634V8.93742C28.7524 8.62438 28.6684 8.31744 28.5097 8.05053C28.3509 7.78362 28.1237 7.56713 27.8531 7.42501L27.732 7.3673L17.0261 2.82413V2.82583Z" fill="#B91C1C"/>
  <path d="M13.4261 18.8588L3.87326 24.697C3.67975 24.8171 3.44752 24.8583 3.22449 24.8122C3.00145 24.7661 2.80464 24.6361 2.67464 24.4491C2.54465 24.2621 2.4914 24.0323 2.52587 23.8072C2.56035 23.582 2.67992 23.3787 2.85993 23.2392L2.94615 23.1796L12.3648 17.4232C12.6182 17.9684 12.9792 18.4567 13.4261 18.8588ZM20.5061 17.2588L30.3817 22.3556C30.5834 22.4595 30.7378 22.6365 30.8132 22.8505C30.8887 23.0645 30.8794 23.2992 30.7874 23.5066C30.6953 23.714 30.5275 23.8783 30.3182 23.9659C30.1089 24.0535 29.874 24.0578 29.6617 23.9779L29.5666 23.9352L19.499 18.7405C19.9284 18.3228 20.2724 17.8196 20.5061 17.2588ZM16.3995 1.64453C16.6173 1.64459 16.8276 1.72464 16.9903 1.8695C17.153 2.01436 17.2569 2.21393 17.2821 2.43031L17.2884 2.53342V11.2001C16.7015 11.0808 16.0966 11.0808 15.5097 11.2001L15.5106 2.53342C15.5106 2.3157 15.5906 2.10556 15.7352 1.94287C15.8799 1.78017 16.0793 1.67623 16.2955 1.65075L16.3995 1.64453Z" fill="#B91C1C"/>
  <path d="M16.3995 11.1113C17.5783 11.1113 18.7087 11.5796 19.5422 12.4131C20.3757 13.2466 20.844 14.377 20.844 15.5558C20.844 16.7345 20.3757 17.865 19.5422 18.6985C18.7087 19.532 17.5783 20.0002 16.3995 20.0002C15.2208 20.0002 14.0903 19.532 13.2568 18.6985C12.4233 17.865 11.9551 16.7345 11.9551 15.5558C11.9551 14.377 12.4233 13.2466 13.2568 12.4131C14.0903 11.5796 15.2208 11.1113 16.3995 11.1113ZM16.3995 12.8891C15.6923 12.8891 15.014 13.1701 14.5139 13.6702C14.0138 14.1703 13.7329 14.8485 13.7329 15.5558C13.7329 16.263 14.0138 16.9413 14.5139 17.4414C15.014 17.9415 15.6923 18.2224 16.3995 18.2224C17.1068 18.2224 17.785 17.9415 18.2851 17.4414C18.7852 16.9413 19.0662 16.263 19.0662 15.5558C19.0662 14.8485 18.7852 14.1703 18.2851 13.6702C17.785 13.1701 17.1068 12.8891 16.3995 12.8891Z" fill="#B91C1C"/>
  </svg> 
);

export default function PageLayout({children, title, isNotFoundPage = false}: Props) {

  const t = useTranslations('Form');
  const [openFaq, setOpenFaq] = useState(0);
  const faqList = [
    {
      question: t('faq.questions.who.question'),
      answer: t('faq.questions.who.answer'),
    },
    {
      question: t('faq.questions.process.question'),
      answer: t('faq.questions.process.answer'),
    },
    {
      question: t('faq.questions.why.question'),
      answer: t('faq.questions.why.answer'),
    },
    {
      question: t('faq.questions.commitment.question'),
      answer: t('faq.questions.commitment.answer'),
    },
    {
      question: t('faq.questions.companies.question'),
      answer: t('faq.questions.companies.answer'),
    },
  ];

  if (isNotFoundPage) {
    return (
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-500">{title}</h1>
        {children}
      </div>
    );
  }

  return (
    <>
      <div className="font-sans antialiased text-gray-800">
      <div className="relative">
       
          <div className="flex items-center relative h-[30rem] overflow-hidden"> 
            <div className='absolute z-10 top-0 left-0 right-0 bottom-0' style={{ background: 'linear-gradient(90deg, rgba(255, 255, 255, .8) 0%, rgba(0, 0, 0, 0.07) 70%)' }}>

            </div>
            <Image
              src="/nextimmo-01.png"
              alt="Thumbnail"
              fill
              className="absolute w-full h-full object-cover"
              priority
            /> 
            <div className="gradian absolute bg-black opacity-40"></div>
            <div className="container absolute left-0 right-0 p-4 z-20">
              <h1 className="md:w-1/2 text-center sm:text-left font-inter font-extrabold text-[48px] leading-[48px] text-[#171C28]">
                {t('formTitle')}
              </h1> 
            </div> 
          </div>

        
          <div className="relative z-20 w-full max-w-[1038px] mx-auto -mt-15">
            <div className="bg-white rounded-[6px] border-b border-[#E5E7EB] p-7 grid grid-cols-5 gap-2 sm:gap-8">
                <div className="text-center">
                    <div className="flex justify-center items-center mb-2">
                        <Icon1 />
                    </div>
                    <p className="font-inter font-medium text-sm leading-snug text-center text-[#171C28]">{t('steps.step1')}</p>
                </div>
                
                <div className="max-w-[170px] w-full h-[2px] bg-[#E5E7EB] mt-5"></div>

                <div className="text-center">
                    <div className="flex justify-center items-center mb-2">
                        <Icon2 />
                    </div>
                    <p className="font-inter font-medium text-sm leading-snug text-center text-[#171C28]">{t('steps.step2')}</p>
                </div>

                <div className="max-w-[170px] w-full h-[2px] bg-[#E5E7EB] mt-5"></div>

                <div className="text-center">
                    <div className="flex justify-center items-center mb-2">
                        <Icon3 />
                    </div>
                    <p className="font-inter font-medium text-sm leading-snug text-center text-[#171C28]">{t('steps.step3')}</p>
                </div>
            </div>
        </div>
      </div>
      <div className="container p-4 mx-auto mt-11 sm:mt-15 lg:mt-11 flex flex-col-reverse md:flex-row md:gap-4 lg:gap-8">   
         <div className="md:w-3/12 lg:p-4 sticky top-2 h-fit text-center md:text-left">
          <div className="top hidden md:block">
             <div className="flex items-center">
               <div className="relative flex items-center justify-center w-8 h-8">
                 <div className="w-8 h-8 rounded-full border-2 border-[#B91C1C]"></div>
                 <div className="absolute w-2.5 h-2.5 rounded-full bg-[#B91C1C] transition-colors duration-300"></div>
              </div>
              <span className="font-inter font-semibold text-xs leading-4 tracking-[0.025em] uppercase text-[#B91C1C] ml-4">{t('quoteDetails.title')}</span>
            </div>

             <div className="relative ml-[15px] h-10 w-0.5 bg-[#E5E7EB]"></div>

             <div className="flex items-center">
               <div className="relative flex items-center justify-center w-8 h-8">
                 <div className="w-8 h-8 rounded-full border-2 border-[#E5E7EB]"></div>
                 <div className="absolute w-2.5 h-2.5 rounded-full bg-white transition-colors duration-300"></div>
              </div>
              <span className="font-inter font-semibold text-xs leading-4 tracking-[0.025em] uppercase text-[#6B7280] ml-4">{t('contactData.title')}</span>
            </div>
          </div>
          <Image 
              src="/nextimmo-02.jpg"
              alt="Thumbnail"
              width={400}
              height={400}
              className="inline-block md:mt-10 lg:mt-15"
            /> 


        </div>

         <div className="md:w-9/12 lg:p-4">
           <div className="bg-white md:px-0 lg:px-6">
              <BookingForm />
          </div>
        </div>
      </div>

      <div className="border-none md:border-t border-b border-[#E5E7EB]">
        <div className="container bg-white py-10 md:py-20 px-4 sm:px-6 lg:px-8">
           <div className="text-center max-w-2xl mx-auto">
            <p className="font-inter font-semibold text-lg leading-7 tracking-tight uppercase text-[#B91C1C]">
              {t('benefits.title')}
            </p>
            <h2 className="font-inter font-bold text-[30px] leading-9 text-[#171C28] mt-4">
              {t('benefits.subtitle')}
            </h2>
          </div>

          <div className="mt-12 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-8">
             <div className="flex items-start text-left"> 
              <div className="flex-shrink-0">
                <svg className="w-[14px] h-[10px] mt-1" 
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L5.70711 9.70711C5.31658 10.0976 4.68342 10.0976 4.29289 9.70711L0.292893 5.70711C-0.0976311 5.31658 -0.0976311 4.68342 0.292893 4.29289C0.683417 3.90237 1.31658 3.90237 1.70711 4.29289L5 7.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893Z"
                    fill="#10B981"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="font-inter font-bold text-xl leading-6 text-[#171C28]">
                  {t('benefits.items.savings.title')}
                </h3>
                <p className="font-inter font-normal text-sm leading-6 text-[#4B5563] mt-1">
                  {t('benefits.items.savings.description')}
                </p>
              </div>
            </div>
            
             <div className="flex items-start text-left">
              <div className="flex-shrink-0">
                <svg className="w-[14px] h-[10px] mt-1" 
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L5.70711 9.70711C5.31658 10.0976 4.68342 10.0976 4.29289 9.70711L0.292893 5.70711C-0.0976311 5.31658 -0.0976311 4.68342 0.292893 4.29289C0.683417 3.90237 1.31658 3.90237 1.70711 4.29289L5 7.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893Z"
                    fill="#10B981"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="font-inter font-bold text-xl leading-6 text-[#171C28]">
                  {t('benefits.items.eco.title')}
                </h3>
                <p className="font-inter font-normal text-sm leading-6 text-[#4B5563] mt-1">
                  {t('benefits.items.eco.description')}
                </p>
              </div>
            </div>
            
             <div className="flex items-start text-left">
              <div className="flex-shrink-0">
                <svg className="w-[14px] h-[10px] mt-1" 
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L5.70711 9.70711C5.31658 10.0976 4.68342 10.0976 4.29289 9.70711L0.292893 5.70711C-0.0976311 5.31658 -0.0976311 4.68342 0.292893 4.29289C0.683417 3.90237 1.31658 3.90237 1.70711 4.29289L5 7.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893Z"
                    fill="#10B981"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="font-inter font-bold text-xl leading-6 text-[#171C28]">
                  {t('benefits.items.value.title')}
                </h3>
                <p className="font-inter font-normal text-sm leading-6 text-[#4B5563] mt-1">
                  {t('benefits.items.value.description')}
                </p>
              </div>
            </div>
            
             <div className="flex items-start text-left">
              <div className="flex-shrink-0">
                <svg className="w-[14px] h-[10px] mt-1" 
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L5.70711 9.70711C5.31658 10.0976 4.68342 10.0976 4.29289 9.70711L0.292893 5.70711C-0.0976311 5.31658 -0.0976311 4.68342 0.292893 4.29289C0.683417 3.90237 1.31658 3.90237 1.70711 4.29289L5 7.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893Z"
                    fill="#10B981"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="font-inter font-bold text-xl leading-6 text-[#171C28]">
                  {t('benefits.items.independence.title')}
                </h3>
                <p className="font-inter font-normal text-sm leading-6 text-[#4B5563] mt-1">
                  {t('benefits.items.independence.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-[#E5E7EB]">
        <div className="container px-4 sm:px-10 py-20">
          <div className="flex flex-col md:flex-row rounded-lg overflow-hidden border border-[#E5E7EB] shadow-lg bg-[#171C28] md:bg-transparent">
             <div className="bg-[#171C28] px-4 py-10 sm:p-10 flex-1 flex flex-col justify-center text-white md:w-1/2">
              <h2 className="font-inter font-extrabold text-[36px] leading-10 tracking-tight mb-4 text-center sm:text-left">
                {t('cta.title')}
              </h2>
              <p className="font-inter font-normal text-base leading-6 text-white mb-6 text-center sm:text-left">
                {t('cta.description')}
              </p>
              <button className="w-full sm:w-auto self-start inline-flex justify-center py-[11px] px-8 border border-transparent text-sm font-semibold rounded-full text-white bg-[#B91C1C] hover:bg-[#A81919] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B91C1C]">
                {t('cta.button')}
              </button>
            </div>

             <div className="p-4 sm:p-0 flex-1 md:w-1/2">
              <Image
                src="/nextimmo-03.png"  
                alt="A modern house with solar panels on the roof"
                width={800}
                height={406}
                className="w-full h-[406px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-10 md:pt-20 md:pb-16 px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-4">
          <h2 className="font-inter font-bold text-[30px] leading-9 text-[#171C28]">
            {t('faq.title')}
          </h2>
        </div>

         <div className="max-w-6xl mx-auto divide-y divide-[#E5E7EB]">
           {faqList.map((item, idx) => (
            <div className="py-6" key={idx}>
              <button
                type="button"
                className="w-full text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
              >
                <h3 className="font-inter font-bold text-xl leading-6 text-[#171C28] flex items-center justify-between w-full">
                  {item.question}
                  <svg 
                    width="16" 
                    height="9" 
                    viewBox="0 0 16 9" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 text-gray-400 ml-2 transition-transform duration-200 ${openFaq === idx ? '' : 'rotate-180'}`}
                  >
                    <path d="M1 8L8 0.999999L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </h3>
              </button>
              {openFaq === idx && (
                <p className="font-inter font-normal text-sm leading-6 text-[#4B5563] mt-2">
                  {item.answer}
                </p>
              )}
            </div>
           ))}
         </div>
      </div>


      <section className="bg-[#171C28] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
           <div className="md:col-span-5 lg:col-span-7">
            <h2 className="font-inter font-bold text-[30px] leading-9 text-white mb-4">
              {t('contact.title')}
            </h2>
            <p className="font-inter font-normal text-lg leading-6 text-[#E5E7EB]">
              {t('contact.description')}
            </p>
          </div>

           <div className="md:col-span-7 lg:col-span-5 flex flex-col items-end"> 
            <div className="flex  w-full gap-4 mb-4">
              <input
                type="email"
                placeholder={t('contact.emailPlaceholder')}
                className="w-full sm:flex-1 p-3 border border-transparent rounded-md focus:ring-2 focus:ring-[#B91C1C] focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#B91C1C] text-white py-3 px-6 rounded-md font-semibold hover:bg-[#A81919] transition-colors duration-300"
              >
                {t('contact.button')}
              </button>
            </div>
            <p className="font-inter font-normal text-sm leading-5 text-[#E5E7EB]font-inter text-white">
              {t('contact.privacy')}
            </p>
          </div>
        </div>
      </section>



    </div>
    </>
  );
}
