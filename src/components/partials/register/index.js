import React from "react";
import DynamicSearch from "../dynamicSearch";
import Pick from "../pick";
import RegisterFreelanceStep3 from "./registerFreelanceStep3";
import RegisterStep1 from "./registerStep1";
import RegisterStep2 from "./registerStep2";

const RegisterSteps = (props) => {
  return (
    <>
      {props.step === 0 && (
        <RegisterStep1
          userForm={props.userForm}
          handleChange={props.handleChange}
          isFreelance={props.isFreelance}
          setIsFreelance={props.setIsFreelance}
          setCanGoNextStep={props.setCanGoNextStep}
        />
      )}
      {props.step === 1 && (
        <RegisterStep2
          userForm={props.userForm}
          handleChange={props.handleChange}
          setCanGoNextStep={props.setCanGoNextStep}
        />
      )}
      {props.step === 2 && props.isFreelance && (
        <RegisterFreelanceStep3
          userForm={props.userForm}
          handleChange={props.handleChange}
          setCanGoNextStep={props.setCanGoNextStep}
        />
      )}
      {props.step === 3 && props.isFreelance && (
        <Pick
          object={props.userForm}
          field={"skills"}
          setObject={props.setUserForm}
          title="Choisissez vos Skills"
          url="/skill/getSkills"
          canSelectMultiple
        />
      )}
      {props.step === 4 && props.isFreelance && (
        <Pick
          object={props.userForm}
          field={"jobs"}
          setObject={props.setUserForm}
          title="Choisissez vos Jobs"
          url="/job/getJobs"
          canSelectMultiple
        />
      )}
      {props.step === 2 && !props.isFreelance && (
        <DynamicSearch
          canSelectMultiple={false}
          setUserForm={props.setUserForm}
          userForm={props.userForm}
        />
      )}
    </>
  );
};

export default RegisterSteps;
