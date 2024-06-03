import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const GoBackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="outline"
      className="p-2 flex items-center gap-1"
      onClick={() => navigate(-1)}
    >
      <ArrowLeft size={20} />
      Go Back
    </Button>
  );
};
