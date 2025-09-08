import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import Image from 'next/image';

export default function BookingForm() {
  const t = useTranslations('Form');
  
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error' | 'inform';
    message: string;
  } | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [errorFields, setErrorFields] = useState<string[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);

  const [formData, setFormData] = useState({
    description: '',
    date: '',
    budget: '',
    firstName: '',
    surname: '',
    phone: '',
    phonePrefix: '352',
    email: '',
    postalCode: '',
    city: '',
    houseNumber: '',
    street: '',
    privacyPolicy: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const validate = () => {
    const requiredFields = [
      'description', 'date', 'budget', 'firstName', 'surname', 'phone', 'email', 'privacyPolicy'
    ];
    const errors: string[] = [];
    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData] || (field === 'privacyPolicy' && !formData.privacyPolicy)) {
        errors.push(field);
      }
    });
    setErrorFields(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    if (!validate()) {
      setFormError('Please fill in all required fields and agree to the privacy policy.');
      setTimeout(() => {
        const firstError = errorFields[0];
        if (firstError) {
          const el = document.querySelector(`[name="${firstError}"]`);
          if (el && 'focus' in el) (el as HTMLElement).focus();
        }
      }, 0);
      return;
    }
    setLoading(true);
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, typeof value === 'boolean' ? (value ? 'true' : 'false') : value);
      });
      if (files) {
        Array.from(files).forEach((file) => {
          form.append('file-upload', file);
        });
      }
      const response = await fetch('/api/send-request', {
        method: 'POST',
        body: form,
      });
      setErrorFields([]);
      if (response.ok) {
        setSubmitMessage({
          type: 'success',
          message: 'Your request has been sent successfully!'
        });
      } else {
        setSubmitMessage({
          type: 'error',
          message: 'An error occurred. Please try again.'
        });
      }
    } catch {
      setSubmitMessage({
        type: 'error',
        message: 'An error occurred. Please try again.'
      });
    }
    setLoading(false);
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    handleChange(e);
    const { name, type } = e.target;
    setErrorFields((prev) => prev.filter((f) => f !== name));
    // Nếu là checkbox thì kiểm tra checked
    if (type === 'checkbox' && (e.target as HTMLInputElement).checked) {
      setErrorFields((prev) => prev.filter((f) => f !== name));
    }
  };

  return (
    <div className="mx-auto">
      <form onSubmit={handleSubmit} noValidate>
        
        {submitMessage?.type === 'success' ? (
          <div className="flex flex-col items-center mt-15">
            <Image src="/success.svg" alt="success" width={150} height={150} />
            <p className="mt-10 text-xl">{t('submit_success')}</p>
            <p className="text-xl">{t('submit_success2')}</p>
          </div>
        ) : (
          <div>
            <div className="border-b border-[#D1D5DB] pb-10">
              <h3 className="font-inter font-bold text-xl leading-6 text-[#171C28] flex items-center mb-6">
                <svg className="mr-[10px]" width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25.0996 6.8001L13.2996 9.99863e-05C13.2996 -0.0999 0.89961 6.8001 0.89961 6.8001C0.69961 6.9001 0.599609 7.1001 0.599609 7.3001V21.0001C0.599609 21.2001 0.69961 21.3001 0.89961 21.4001L12.3996 28.0001L25.1996 21.4001C25.3996 21.3001 25.3996 21.1001 25.3996 21.0001V7.3001C25.3996 7.1001 25.2996 6.9001 25.0996 6.8001ZM12.9996 1.8001L23.2996 7.6001L20.1996 9.2001L9.99961 3.4001L12.9996 1.8001ZM9.39961 3.9001L19.2996 9.8001L17.1996 10.7001L7.09961 5.3001L9.39961 3.9001ZM19.8996 10.7001V14.4001H18.8996C18.7996 14.4001 18.5996 14.5001 18.4996 14.6001L17.9996 15.3001V11.8001L19.8996 10.7001ZM11.1996 25.5001L2.39961 20.4001V8.8001L11.1996 14.1001V25.5001ZM12.5996 13.0001L2.99961 7.4001L6.29961 5.8001L16.1996 11.3001L12.5996 13.0001ZM23.5996 20.3001L12.9996 25.8001V14.3001L16.8996 12.4001V16.6001C16.8996 16.8001 16.9996 17.0001 17.1996 17.1001H17.3996C17.4996 17.1001 17.6996 17.0001 17.6996 16.9001L18.9996 15.4001H20.1996C20.2996 15.4001 20.4996 15.3001 20.5996 15.2001C20.6996 15.1001 20.6996 15.0001 20.6996 14.8001V10.0001L23.3996 8.7001V20.3001H23.5996Z" fill="#B91C1C"/>
                </svg> 
                {t('quoteDetails.title')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-6">
                <div className="col-span-1">
                  <h4 className="font-inter font-medium text-sm leading-5 text-[#171C28] mb-1">{t('quoteDetails.details')}</h4>
                  <textarea 
                    rows={5}
                    name="description"
                    value={formData.description}
                    onChange={handleFieldChange}
                    className={`shadow-sm block w-full p-2 border ${errorFields.includes('description') ? 'border-red-500' : 'border-[#D1D5DB]'} rounded-md focus:ring-[#B91C1C] focus:border-[#B91C1C] outline-none resize-none`}
                    placeholder={t('quoteDetails.description')}
                  />
                </div>

                <div className="col-span-1">
                  <h4 className="font-inter font-medium text-sm leading-5 text-[#171C28] mb-1">{t('quoteDetails.attachments.title')}</h4>
                  <div className="flex flex-col items-center justify-center px-6 pt-5 pb-5 border-2 border-dashed border-[#E5E7EB] rounded-md text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M28.5 8H12.5C11.4391 8 10.4217 8.42143 9.67157 9.17157C8.92143 9.92172 8.5 10.9391 8.5 12V32M8.5 32V36C8.5 37.0609 8.92143 38.0783 9.67157 38.8284C10.4217 39.5786 11.4391 40 12.5 40H36.5C37.5609 40 38.5783 39.5786 39.3284 38.8284C40.0786 38.0783 40.5 37.0609 40.5 36V28M8.5 32L17.672 22.828C18.4221 22.0781 19.4393 21.6569 20.5 21.6569C21.5607 21.6569 22.5779 22.0781 23.328 22.828L28.5 28M40.5 20V28M40.5 28L37.328 24.828C36.5779 24.0781 35.5607 23.6569 34.5 23.6569C33.4393 23.6569 32.4221 24.0781 31.672 24.828L28.5 28M28.5 28L32.5 32M36.5 8H44.5M40.5 4V12M28.5 16H28.52" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    <div className="flex text-sm text-gray-600 mt-2">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-[#B91C1C] hover:text-[#A81919] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#B91C1C]">
                        <span>{t('quoteDetails.attachments.uploadText')}</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{t('quoteDetails.attachments.allowedTypes')}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-inter font-medium text-sm leading-5 text-[#171C28] mb-1">{t('quoteDetails.date')}</h4>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleFieldChange}
                    className={`shadow-sm block w-full px-4 py-[6px] border ${errorFields.includes('date') ? 'border-red-500' : 'border-[#D1D5DB]'} rounded-md focus:ring-[#B91C1C] focus:border-[#B91C1C] outline-none`}
                  />
                </div>

                <div>
                  <h4 className="font-inter font-medium text-sm leading-5 text-[#171C28] mb-1">{t('quoteDetails.budget')}</h4>
                  <div className="relative mt-1 rounded-md">
                    <div className="bg-[#F9FAFB] absolute inset-y-0 left-0 flex items-center pointer-events-none w-[35px] h-[32px] ml-px mt-[1px] rounded-l-[12px] justify-center border-r border-[#D1D5DB]">
                      <span className="text-[#6B7280] font-inter font-normal text-sm leading-5">€</span>
                    </div>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleFieldChange}
                      className={`shadow-sm block w-full pl-12 px-4 py-[6px] border ${errorFields.includes('budget') ? 'border-red-500' : 'border-[#D1D5DB]'} rounded-md focus:ring-[#B91C1C] focus:border-[#B91C1C] outline-none`}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F9FAFB] pt-10 pb-14 sm:py-10 px-4 md:p-10 rounded-[8px] my-10">
              <h3 className="text-xl font-bold text-[#171C28] flex items-center mb-6">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.7812 18.6846C17.5719 17.5346 18.7563 15.5283 18.7563 13.2408C18.7563 9.67207 15.8656 6.77832 12.2937 6.77832C8.72187 6.77832 5.83125 9.66895 5.83125 13.2408C5.83125 15.5252 7.01875 17.5346 8.80625 18.6846C5.43125 20.0064 3.04688 23.2096 3.04688 27.0689H4.94375C5.175 23.2064 8.38125 20.3189 12.3 20.3189C16.2188 20.3189 19.425 23.2064 19.6562 27.0689H21.5469C21.5438 23.2096 19.1625 20.0064 15.7812 18.6846ZM7.62187 13.2439C7.62187 10.6939 9.6875 8.6252 12.2406 8.6252C14.7938 8.6252 16.8594 10.6908 16.8594 13.2439C16.8594 15.7971 14.7938 17.8627 12.2406 17.8627C9.6875 17.8627 7.62187 15.7939 7.62187 13.2439Z" fill="#B91C1C"/>
                  <path d="M17.1777 6.78145H17.8434L17.8496 4.93457H27.0902C28.1184 4.93457 28.9527 5.76895 28.9527 6.79707V25.2096C28.9527 26.2377 28.1184 27.0721 27.0902 27.0721H23.3902V25.2189H26.0309C26.6246 25.2189 27.1059 24.7377 27.1059 24.1439V7.85645C27.1059 7.2627 26.6246 6.78145 26.0309 6.78145H17.8465" fill="#B91C1C"/>
                  <path d="M19.6904 8.62793H25.2311V10.4748H19.6904V8.62793ZM19.6904 12.3217H25.2311V14.1686H19.6904V12.3217ZM19.6904 16.0154H25.2311V17.8623H19.6904V16.0154ZM21.5373 19.7092H25.2311V21.5561H21.5373V19.7092Z" fill="#B91C1C"/>
                </svg>
                {t('contactData.title')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-4">
                <div>
                  <h4 className="font-inter font-medium text-sm leading-5 text-[#171C28] mb-1">{t('contactData.firstName')}</h4>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFieldChange}
                    className={`shadow-sm block w-full px-4 py-[6px] border ${errorFields.includes('firstName') ? 'border-red-500' : 'border-[#D1D5DB]'} rounded-md focus:ring-[#B91C1C] focus:border-[#B91C1C] outline-none`}
                  />
                </div>
                <div>
                  <h4 className="font-inter font-medium text-sm leading-5 text-[#171C28] mb-1">{t('contactData.surname')}</h4>
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleFieldChange}
                    className={`shadow-sm block w-full px-4 py-[6px] border ${errorFields.includes('surname') ? 'border-red-500' : 'border-[#D1D5DB]'} rounded-md focus:ring-[#B91C1C] focus:border-[#B91C1C] outline-none`}
                  />
                </div>
                <div className="flex">
                  <div className="w-full">
                    <h4 className="font-inter font-medium text-sm leading-5 text-[#171C28] mb-1">{t('contactData.phone')}</h4>
                    <div className="flex shadow-sm">
                      <select 
                        className="w-[85px] h-[38px] p-2 border border-[#D1D5DB] rounded-l-[6px] shadow-sm focus:ring-[#B91C1C] focus:border-[#B91C1C] outline-none"
                        name="phonePrefix"
                        value={formData.phonePrefix}
                        onChange={handleChange}
                      >
                        <option>352</option>
                      </select>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFieldChange}
                        className={`block w-full h-[38px] px-4 py-[6px] border border-l-0 ${errorFields.includes('phone') ? 'border-red-500' : 'border-[#D1D5DB]'} rounded-r-md shadow-sm focus:ring-[#B91C1C] focus:border-[#B91C1C] outline-none`}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-inter font-medium text-sm leading-5 text-[#171C28] mb-1">{t('contactData.email')}</h4>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFieldChange}
                    className={`shadow-sm block w-full px-4 py-[6px] border ${errorFields.includes('email') ? 'border-red-500' : 'border-[#D1D5DB]'} rounded-md focus:ring-[#B91C1C] focus:border-[#B91C1C] outline-none`}
                  />
                </div>
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-4 lg:gap-4 mt-1 sm:mt-2 lg:mt-0">
                  <div>
                    <h4 className="font-inter font-medium text-sm leading-5 text-[#171C28] mb-1">{t('contactData.postalCode')}</h4>
                    <div className="relative mt-1 rounded-md">
                      <div className="bg-[#F9FAFB] absolute inset-y-0 left-0 flex items-center pointer-events-none w-[35px] h-[32px] ml-px mt-[1px] rounded-l-[12px] justify-center border-r border-[#D1D5DB]">
                        <span className="text-[#6B7280] font-inter font-normal text-sm leading-5">L-</span>
                      </div>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleFieldChange}
                        className={`shadow-sm block w-full pl-12 px-4 py-[6px] border ${errorFields.includes('postalCode') ? 'border-red-500' : 'border-[#D1D5DB]'} rounded-md focus:ring-[#B91C1C] focus:border-[#B91C1C] outline-none`}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-inter font-medium text-sm leading-5 text-[#171C28] mb-1">{t('contactData.city')}</h4>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleFieldChange}
                      className={`shadow-sm block w-full px-4 py-[6px] border ${errorFields.includes('city') ? 'border-red-500' : 'border-[#D1D5DB]'} rounded-md focus:ring-[#B91C1C] focus:border-[#B91C1C] outline-none`}
                    />
                  </div>
                  <div>
                    <h4 className="font-inter font-medium text-sm leading-5 text-[#171C28] mb-1">{t('contactData.houseNumber')}</h4>
                    <input
                      type="text"
                      name="houseNumber"
                      value={formData.houseNumber}
                      onChange={handleFieldChange}
                      className={`shadow-sm block w-full px-4 py-[6px] border ${errorFields.includes('houseNumber') ? 'border-red-500' : 'border-[#D1D5DB]'} rounded-md focus:ring-[#B91C1C] focus:border-[#B91C1C] outline-none`}
                    />
                  </div>
                  <div>
                    <h4 className="font-inter font-medium text-sm leading-5 text-[#171C28] mb-1">{t('contactData.street')}</h4>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleFieldChange}
                      className={`shadow-sm block w-full px-4 py-[6px] border ${errorFields.includes('street') ? 'border-red-500' : 'border-[#D1D5DB]'} rounded-md focus:ring-[#B91C1C] focus:border-[#B91C1C] outline-none`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:flex items-center justify-between pt-10 pb-16 border-t border-[#E5E7EB]">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="privacy-policy"
                    name="privacyPolicy"
                    type="checkbox"
                    checked={formData.privacyPolicy}
                    onChange={handleFieldChange}
                    className={`h-4 w-4 text-[#B91C1C] rounded border ${errorFields.includes('privacyPolicy') ? 'border-red-500' : 'border-[#D1D5DB]'} focus:ring-[#B91C1C]`}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="privacy-policy" className="font-inter font-medium text-sm leading-5 text-[#171C28]">
                    {t('privacyPolicy.title')}
                  </label>
                  <p className="font-inter font-normal text-sm leading-5 text-gray-500">
                    {t('privacyPolicy.consent')}
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-5 lg:mt-0 lg:max-w-72 w-full inline-flex justify-center py-[11px] px-8 border border-transparent text-sm font-semibold rounded-full text-white bg-[#B91C1C] hover:bg-[#A81919] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B91C1C] disabled:opacity-50"
              >
                {loading ? 'Loading...' : t('submit')}
              </button>
            </div>

            {formError && (
              <div className="mb-4 text-red-600 font-medium">{formError}</div>
            )}

            {(submitMessage && (submitMessage.type === 'error' || submitMessage.type === 'inform')) && (
              <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-lg shadow-lg z-50 ${
                submitMessage.type === 'inform' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}>
                {submitMessage.message}
                <button onClick={() => setSubmitMessage(null)} className="ml-4 text-white hover:opacity-75">✕</button>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}