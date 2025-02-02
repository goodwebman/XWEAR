import React, { useState } from 'react';

interface AccordionItemProps {
  title: string;
  links: { text: string; href: string }[];
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title,  links  }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" border-b  border-white/40 mb-2">
      <button
        className="flex justify-between cursor-pointer items-center w-full py-4 text-left font-medium"
        onClick={toggleAccordion}
      >
        <span className='text-[16px] text-white font-[900] leading-[28px]'>{title}</span>
        <svg
          className={`w-5 h-5 transition-transform transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={` text-white ${isOpen ? '' : 'hidden'}`}
        style={{
            transition: "max-height 0.3s ease-in-out",
            maxHeight: isOpen ? '1000px' : 0,
             overflow: "hidden",
         }}
      >
        {links.map((link, index) => (
          <a
            key={index}
            href=''
            className="block py-2  rounded"
          >
            {link.text}
          </a>
        ))}
      </div>
    </div>
  );
};

export default AccordionItem;
