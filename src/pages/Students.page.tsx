// Components //
import Student_index from "../components/Profiles/Student/Student_index.component";
// Contexts //
import { StudentsContextProvider } from "../contexts/Student.context";
import fade_transition from "../animations/fade_transition.transition";

const Students = () => {
  return (
    <StudentsContextProvider>
      <Student_index />
    </StudentsContextProvider>
  );
};

export default fade_transition(Students);
