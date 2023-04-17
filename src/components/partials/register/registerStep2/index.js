import Input from "@/components/UI/Input";
import React, { useEffect } from "react";

const RegisterStep2 = ({ userForm, handleChange, setCanGoNextStep }) => {
  useEffect(() => {
    if (
      userForm.firstname != "" &&
      userForm.lastname != "" &&
      userForm.phoneNumber != "" &&
      userForm.address &&
      userForm.city &&
      userForm.zipCode != ""
    ) {
      setCanGoNextStep(true);
      return;
    }
    setCanGoNextStep(false);
  }, [userForm]);

  return (
    <div>
      <Input
        type="text"
        placeholder="Prénom"
        name="firstname"
        value={userForm.firstname || ""}
        onChange={(e) => handleChange(e)}
        className="primary"
      />
      <Input
        type="text"
        placeholder="Nom"
        name="lastname"
        value={userForm.lastname || ""}
        onChange={(e) => handleChange(e)}
        className="primary"
      />
      <Input
        type="text"
        placeholder="Numéro de téléphone"
        name="phoneNumber"
        value={userForm.phoneNumber || ""}
        onChange={(e) => handleChange(e)}
        className="primary"
      />
      <Input
        type="text"
        placeholder="Adresse"
        name="address"
        value={userForm.address || ""}
        onChange={(e) => handleChange(e)}
        className="primary"
      />
      <Input
        type="text"
        placeholder="Ville"
        name="city"
        value={userForm.city || ""}
        onChange={(e) => handleChange(e)}
        className="primary"
      />
      <Input
        type="text"
        placeholder="Code postal"
        name="zipCode"
        value={userForm.zipCode || ""}
        onChange={(e) => handleChange(e)}
        className="primary"
      />
    </div>
  );
};

export default RegisterStep2;
