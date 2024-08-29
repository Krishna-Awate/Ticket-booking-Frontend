import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { IconButton } from "@mui/material";

const WhatsAppShareButton = ({ message }) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

  return (
    <IconButton
      component="a"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      color="primary"
      style={{ color: "#25D366" }}
    >
      <div className="text-xs font-semibold flex items-center justify-center">
        <WhatsAppIcon /> <span className="ml-1">Share on Whatsapp</span>
      </div>
    </IconButton>
  );
};

export default WhatsAppShareButton;
