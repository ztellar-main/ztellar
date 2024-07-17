import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { accordionData, AccordionItem } from "../utils/faqData";

export function FAQ() {
  const [open, setOpen] = React.useState<number>(0);

  const handleOpen = (id: number) => setOpen(open === id ? 0 : id);

  return (
    <div className="bg-[#F8FAFC] border laptopMin:w-[1280px] laptopMin:mx-auto border-[#ECEFF1] mx-[10px] p-[5px] rounded-[5px]">
      {accordionData.map(({ id, title, content }: AccordionItem) => (
        <Accordion
          key={id}
          open={open === id}
          className="max-w-[1280px] px-[20px] mobile:px-[10px] flex flex-col"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <AccordionHeader
            onClick={() => handleOpen(id)}
            className="border-b-2 border-[#CFD8DC] flex justify-between w-full"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <p className="w-[calc(100%-30px)] text-left">{title}</p>
            <MdOutlineKeyboardArrowDown
              className={`duration-300 transform ${
                open === id ? "rotate-[540deg]" : "rotate-0"
              } text-[20px]`}
            />
          </AccordionHeader>
          <AccordionBody>
            {Array.isArray(content) ? (
              content.map((line, index) => <p key={index}>{line.trim()}</p>)
            ) : (
              <div>{content}</div>
            )}
          </AccordionBody>
        </Accordion>
      ))}
    </div>
  );
}
