import { BatchRegistrationForm } from "../BatchRegistrationForm";

export default function BatchRegistrationFormExample() {
  return (
    <BatchRegistrationForm 
      onSubmit={(data) => console.log("Form submitted:", data)} 
    />
  );
}
