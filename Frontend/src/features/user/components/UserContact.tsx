import React from "react";
import { UserContactDto } from "@/features/user/types";
import "./UserContact.pcss";

const icons: Record<string, React.ReactNode> = {
  'telegram': (
    <svg className="contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
      <path fill="#29b6f6" d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"/>
      <path fill="#fff"
            d="M34,15l-3.7,19.1c0,0-0.2,0.9-1.2,0.9c-0.6,0-0.9-0.3-0.9-0.3L20,28l-4-2l-5.1-1.4c0,0-0.9-0.3-0.9-1	c0-0.6,0.9-0.9,0.9-0.9l21.3-8.5c0,0,0.7-0.2,1.1-0.2c0.3,0,0.6,0.1,0.6,0.5C34,14.8,34,15,34,15z"/>
      <path fill="#b0bec5" d="M23,30.5l-3.4,3.4c0,0-0.1,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0l1-6L23,30.5z"/>
      <path fill="#cfd8dc"
            d="M29.9,18.2c-0.2-0.2-0.5-0.3-0.7-0.1L16,26c0,0,2.1,5.9,2.4,6.9c0.3,1,0.6,1,0.6,1l1-6l9.8-9.1	C30,18.7,30.1,18.4,29.9,18.2z"/>
    </svg>),
  'email': (
    <svg className="contact-icon" fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m14.778 0.030097c-2.3188 0.22225-4.0815 0.71563-6.0078 1.6818-1.4007 0.70244-2.6902 1.6216-3.8672 2.7562-1.4196 1.3686-2.4238 2.7415-3.2844 4.4898-0.79281 1.6107-1.2734 3.1909-1.5397 5.0625-0.10456 0.7351-0.10456 3.2025 0 3.9375 0.26188 1.841 0.74844 3.4536 1.5086 5 0.86006 1.7496 1.7025 2.9251 3.0933 4.316 1.3756 1.3755 2.5694 2.2345 4.2534 3.0606 1.1751 0.5765 1.9337 0.857 3.125 1.1559 3.1259 0.784 6.2609 0.6336 9.3149-0.4467 0.9258-0.3275 2.5418-1.1374 3.3726-1.6902 1.8678-1.2429 3.5825-3.0006 4.806-4.9268 0.4502-0.7087 1.1737-2.2039 1.4688-3.0355 1.4682-4.1373 1.2127-8.5779-0.7169-12.458-0.7788-1.5658-1.6457-2.793-2.863-4.0526-1.3498-1.3969-2.6738-2.3606-4.4449-3.2358-1.8513-0.91469-3.5763-1.4029-5.625-1.5923-0.6368-0.058812-2.0843-0.0715-2.5938-0.022688zm9.4037 9.5814c0.3738 0.18531 0.728 0.52746 0.9219 0.89066l0.1432 0.2682 0.017 5.0818c0.011 3.2797-0.0053 5.1649-0.046 5.3162-0.0927 0.3441-0.4169 0.799-0.7162 1.005-0.5812 0.3998-0.1643 0.3824-8.6968 0.3638l-7.7455-0.0168-0.296-0.1471c-0.36987-0.1838-0.74893-0.5472-0.93581-0.8972l-0.14319-0.2682v-5.2187c0-5.799-0.03393-5.3128 0.41019-5.8782 0.18256-0.2324 0.69688-0.54715 1.0234-0.62634 0.10525-0.0255 3.693-0.042 7.9726-0.03656l7.7813 0.00981 0.3099 0.15363zm-14.775 1.362c0.00506 0.0615 6.4966 5.7969 6.5611 5.7969 0.0584 0 6.519-5.7116 6.5496-5.7902 0.0115-0.0295-2.932-0.0535-6.5469-0.0535-3.6122 0-6.5659 0.0211-6.5638 0.0468zm-1.3164 5.0849c0 3.6786 0.01044 4.1276 0.09538 4.095 0.0525-0.0201 1.1845-0.885 2.5156-1.9221 1.3312-1.037 2.4277-1.8911 2.4367-1.8979 9e-3 -0.0069-0.6644-0.6144-1.4965-1.3502-0.832-0.7358-1.9487-1.7245-2.4815-2.1972-0.53282-0.4726-0.99144-0.8593-1.0192-0.8593s-0.05044 1.8592-0.05044 4.1317zm13.171-1.9328c-1.3647 1.2094-2.4748 2.2036-2.4667 2.2094 8e-3 0.0057 1.107 0.8602 2.4421 1.8989s2.4672 1.9037 2.5156 1.9223c0.0753 0.0289 0.0881-0.5684 0.0881-4.0978 0-2.2725-0.022-4.1317-0.0488-4.1317-0.0269 0-1.1655 0.9895-2.5303 2.1989zm-9.2646 4.9929c-1.2375 0.9635-2.2912 1.7926-2.3415 1.8425-0.08 0.0792 0.71511 0.0907 6.3107 0.0907 6.292 0 6.4002-0.0021 6.279-0.1188-0.188-0.1812-4.5547-3.5687-4.6003-3.5687-0.0219 0-0.3032 0.2345-0.6251 0.5212-0.6664 0.5935-0.7815 0.6663-1.0541 0.6663-0.2736 0-0.3902-0.0742-1.0467-0.6663-0.3179-0.2867-0.5992-0.5207-0.625-0.52-0.0259 7e-4 -1.0595 0.7896-2.297 1.7531z"
        clipRule="evenodd" fill="url(#a)" fillRule="evenodd"/>
      <defs>
        <linearGradient id="a" x2="32.8" y2=".88226" gradientUnits="userSpaceOnUse">
          <stop stopColor="#70B2FF" offset="0"/>
          <stop stopColor="#5C9CE6" offset="1"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

interface LinkDisplayProps {
  link: UserContactDto;
}

export const UserContact: React.FC<LinkDisplayProps> = ({ link }) => {
  return (
    <div className="profile-user-contact">
      {icons[link.name] ? icons[link.name] : <p>N</p>}
      <a>{link.value}</a>
    </div>
  )
}