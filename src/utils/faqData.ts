// accordionData.ts

export interface AccordionItem {
  id: number;
  title: string;
  content: string | string[];
}

export const accordionData: AccordionItem[] = [
  {
    id: 1,
    title:
      "1. I received a payment receipt, but my acquired courses/events aren't showing up.",
    content: [
      `Don't worry! This can sometimes happen if the transaction was interrupted before it was fully processed. So make sure to please do not switch tabs or interrupt while processing. Wait for the pop up. Please click the link down below to complete the transaction.`,
    ],
  },
  {
    id: 2,
    title: "2. What are the dates for the conference?",
    content: [`May 23-25, 2024`],
  },
  {
    id: 3,
    title: "3. Where will the conference be held?",
    content: [`Isabela Convention Center, Cauayan City, Isabela`],
  },
  {
    id: 4,
    title: "4. Who can attend the conference?",
    content: [
      `The conference is open to everyone! This includes PSME members, PSME Chapter Officers, PSME National, Associate Members, Certified Plant Mechanics, Businessmen, Entrepreneurs, Explorers, and anyone interested in the field.`,
    ],
  },
  {
    id: 5,
    title: "5. How can I participate in the conference?",
    content: [
      `There are two ways to participate in the conference:`,
      `Onsite: This option allows you to network with professionals face-to-face, attend engaging sessions and workshops, earn CPD credits, experience an immersive learning environment.`,
      `Virtual: This option allows you to attend the conference from the comfort of your home or office. It offers reduced costs, flexibility, global reach, and interactive learning opportunities.`,
    ],
  },
  {
    id: 6,
    title: "6. What are the benefits of attending the conference?",
    content: [
      `By attending the PSME conference, you can gain valuable knowledge, skills, and connections to achieve your career goals and contribute to the advancement of the engineering industry. Additionally, you'll have access to PSME resources and support, the opportunity to contribute to the engineering community, and the chance to stay connected with colleagues and friends.`,
    ],
  },
  {
    id: 7,
    title: "7. Are there specific benefits for each participation option?",
    content: [
      `Yes! Here's a breakdown of the specific benefits for each option:`,
      `Onsite: Network face-to-face, participate in hands-on activities, and enjoy member benefits (discounts, events).`,
      `Virtual: Benefit from reduced costs, flexibility, global reach, and interactive learning.`,
    ],
  },
  {
    id: 8,
    title: "8. How can I register for the conference?",
    content: [`Please visit www.ztellar.tech`],
  },
  {
    id: 9,
    title: "9. What payment methods are accepted?",
    content: [
      `We offer a variety of secure payment options to ensure a smooth registration process:`,
      `Debit/Credit Cards`,
      `Online Banking: BPI and UnionBank`,
      `E-wallets:Gcash and Paymaya`,
      `Buy Now, Pay Later via Billease`,
    ],
  },
  {
    id: 10,
    title:
      "10. I'm interested, but I have a scheduling conflict and the venue is too far. Can I still participate?",
    content: [
      `Absolutely! Distance and busy schedules shouldn't stop you from learning. You can attend the conference virtually.`,
      `Join the Live Stream`,
      `Earn CPD Credits`,
      `Download Your Certificate`,
      `Learn Anytime, Anywhere`,
    ],
  },
  {
    id: 11,
    title: "11. How many CPD credits can I earn by attending the conference?",
    content: [`Approved 16 CPD`],
  },
  {
    id: 12,
    title:
      "12. I don't have cash on hand right now. Do you offer a register-now-pay-later option?",
    content: [
      `Absolutely! We understand that budgeting is important. You can utilize Billease as a convenient register-now-pay-later option for your conference registration.`,
      `Subject to Approval: Please note that using Billease requires approval based on their creditworthiness assessment.`,
      `Flexible Payment Terms: Billease typically offers flexible payment plans that allow you to spread out the cost of registration over several installments.`,
      `We recommend visiting the Billease website or app for more information on their services and eligibility requirements. https://billease.ph/`,
    ],
  },
  {
    id: 13,
    title: "13. Where can I get my conference certificate?",
    content: [
      `Your certificate for the 10th PSME Luzon Regional Conference will be downloadable electronically through the Ztellar Platform after the conference.`,
    ],
  },
  {
    id: 14,
    title: "14.  How to contact us?",
    content: [`Email : psmelrc@vizcom.ph`, `https://www.facebook.com/PSMELRC`],
  },
];
