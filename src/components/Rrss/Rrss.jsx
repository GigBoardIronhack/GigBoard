/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { FaSpotify, FaYoutube, FaInstagram, FaTiktok, FaFacebook, FaTwitter } from "react-icons/fa"; 

const ExpandableFields = ({ handleChange, artistData }) => {
  const socialFields = [
    { name: "spotiUrl", icon: <FaSpotify className="text-green-500 text-2xl" /> },
    { name: "youtubeUrl", icon: <FaYoutube className="text-red-500 text-2xl" /> },
    { name: "instagram", icon: <FaInstagram className="text-pink-500 text-2xl" /> },
    { name: "tiktok", icon: <FaTiktok className="text-black text-2xl" /> },
    { name: "facebook", icon: <FaFacebook className="text-blue-600 text-2xl" /> },
    { name: "twitter", icon: <FaTwitter className="text-blue-400 text-2xl" /> },
  ];

  const [visibleFields, setVisibleFields] = useState([]);

  useEffect(() => {
    const fieldsWithData = socialFields
      .map((field) => field.name)
      .filter((name) => artistData[name]?.trim() !== "");
    setVisibleFields(fieldsWithData);
  }, [artistData]);

  const handleClick = (field, event) => {
    event.preventDefault();
    setVisibleFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  return (
    <div className="relative">
      {socialFields.map(({ name, icon }) => (
        <div key={name} className="flex items-center gap-3 mb-3">
          <button
            onClick={(e) => handleClick(name, e)}
            className="bg-white p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110"
          >
            {icon}
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ${
              visibleFields.includes(name) ? "w-full opacity-100 max-h-20" : "w-0 opacity-0 max-h-0"
            }`}
          >
            <FloatLabel>
              <InputText
                type="text"
                name={name}
                id={name}
                onChange={handleChange}
                value={artistData[name] || ""}
                className="dark:bg-[#101C29] p-2 border-[#d76a03] border rounded dark:text-zinc-300 w-full"
              />
              <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
            </FloatLabel>
           
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpandableFields;
