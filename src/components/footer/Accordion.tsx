import React from 'react';
import AccordionItem from './AccordionItem';

interface AccordionProps {
  items: { title: string; links: { text: string; href: string }[] }[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title} links={item.links} />
      ))}
    </div>
  );
};

export default Accordion;
