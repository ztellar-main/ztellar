// ICONS AND IMAGES IMPORT
const FBImage =
  'https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/ztellar-homepage%2Ffooter-icons%2FFacebook.png?alt=media&token=20d7059f-d67e-404f-b158-a53384cb2ceb';
const IGImage =
  'https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/ztellar-homepage%2Ffooter-icons%2FInstagram.png?alt=media&token=54299e52-68b5-4486-a87b-8ff43555491d';
const TwitterImage =
  'https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/ztellar-homepage%2Ffooter-icons%2FTwitter.png?alt=media&token=705b67ca-00dc-4837-973c-e640a448e14b';
const LinkedinImage =
  'https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/ztellar-homepage%2Ffooter-icons%2FLinkedIn.png?alt=media&token=f0641aca-e0aa-40e9-88cb-394874f34e47';

const Footer: React.FC = () => {
  // SOCIAL MEDIA DATA
  const socialMedia = [
    {
      img: FBImage,
      href: 'https://www.facebook.com/profile.php?id=61558414566241',
    },
    {
      img: IGImage,
      href: '/',
    },
    {
      img: TwitterImage,
      href: '/',
    },
    {
      img: LinkedinImage,
      href: 'https://www.linkedin.com/authwall?trk=bf&trkInfo=AQFf_bwb2IY7vwAAAZTPDU0YlsF5uSGuHXIzb_Xbgkmh3q7GM_OlWbcrwsN8QES7pgDDyWyDHrGKGlsUNmDT8wO90V8e-2Z2kqxVcgKqjIIHWrfT_ZS9xPeyw1VDMnRa7KHZqf8=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fjeferson-binay-an-rmee-assoc-asean-engr-99271532%2F',
    },
  ];

  // QUICK LINKS DATA
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About us', href: '/' },
    { name: 'Contact us', href: '/' },
    { name: 'Reviews', href: '/' },
  ];

  // SERVICES DATA
  const services = [
    { name: 'Event Management', href: '/' },
    { name: 'Live Streaming Events', href: '/' },
    { name: 'Courses', href: '/' },
    { name: 'Entertainment', href: '/' },
  ];

  // TERMS AND CONDITION DATA
  const TermsLinks = [
    { name: 'Terms and Conditions', href: '/' },
    { name: 'Services Agreement', href: '/' },
    { name: 'Cookie Policy', href: '/' },
    { name: 'Privacy Policy', href: '/' },
  ];

  // CONTACT DATA
  const Contact = [
    { name: 'Mobile:', title: '0956 - 448 - 4530' },
    { name: 'Email:', title: 'admin@ztellar.tech' },
  ];

  return (
    <div className="bg-[#071C34] p-[20px]">
      <div className="flex justify-between flex-wrap flex-row">
        {/* ZTELLAR SECTION */}
        <div>
          <p className="text-[48px] font-extrabold text-[#EFEFEF]">
            Ztellar.tech
          </p>
        </div>

        {/* SOCIAL MEDIA SECTION */}
        <div className="flex flex-col justify-center  items-center mt-[40px] sm:mt-[40px]">
          <h1 className="text-white font-bold text-[20px] mb-4">
            Follow us on Social Media
          </h1>
          <div className="flex space-x-8">
            {socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-125 transition duration-300"
              >
                <img src={social.img} className="w-[24px] h-[24px]" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* QUICK LINKS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-[56px] max-w-[1280px] mx-auto">
        <div className="flex flex-col">
          <h1 className="text-white font-bold text-[20px] mb-4">Quick Links</h1>
          {quickLinks.map((link, index) => (
            <p className="py-1" key={index}>
              <a
                href={link.href}
                className="text-white hover:text-gray-400 duration-300 transition"
              >
                {link.name}
              </a>
            </p>
          ))}
        </div>

        {/* SERVICES SECTION */}
        <div className="flex flex-col">
          <h1 className="text-white font-bold text-[20px] mb-4">Services</h1>
          {services.map((service, index) => (
            <p className="py-1" key={index}>
              <a
                href={service.href}
                className="text-white hover:text-gray-400 duration-300 transition"
              >
                {service.name}
              </a>
            </p>
          ))}
        </div>

        {/* TERMS AND CONDITIONS SECTION */}
        <div className="flex flex-col">
          <h1 className="text-white font-bold text-[20px] mb-4">
            Terms and Conditions
          </h1>
          {TermsLinks.map((item, index) => (
            <p className="py-1" key={index}>
              <a
                href={item.href}
                className="text-white hover:text-gray-400 duration-300 transition"
              >
                {item.name}
              </a>
            </p>
          ))}
        </div>

        {/* CONTACT SECTION */}
        <div className="flex flex-col">
          <h1 className="text-white font-bold text-[20px] mb-[16px]">
            Contact us
          </h1>
          {Contact.map((item, index) => (
            <div className="py-1 text-white flex" key={index}>
              <p className="text-[#9CA3AF]">{item.name}</p>

              <p className="text-white pl-[12px]">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <hr className="w-full border-t-1 my-[25px] border-[#00D4D4]" />
      <div className="flex sm:flex-row flex-col justify-between">
        <p className="text-center text-[#89929F] mb-[12px]">ztellar.tech</p>
        <p className="text-center text-[#89929F] mb-[12px]">
          Copyright 2024 Ztellar. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
