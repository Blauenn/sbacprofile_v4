import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StudentInterface } from "../interfaces/user.interface";
import fade_transition from "../animations/fade_transition.transition";
// Functions //
import { has_number } from "../functions/string.function";
// Contexts //
import { useContext_Students } from "../contexts/Student.context";
import { MajorContextProvider } from "../contexts/Major.context";
// Components //
import PageHeader from "../components/miscellaneous/common/PageHeader.component";
import Student_rolodex from "../components/Profiles/Student/Student_rolodex.component";
import Student_filters from "../components/Profiles/Student/filters/Student_filters.component";
import Skeleton_Rolodex from "../components/Profiles/rolodex/Skeleton_Rolodex.component";

const Students = () => {
  const { students, studentCount, fetchStudents } = useContext_Students();

  const [selectedMajor, setSelectedMajor] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [selectedClass, setSelectedClass] = useState(0);
  const [searchField, setSearchField] = useState("");

  const onMajorChange = (event: any) => {
    setSelectedMajor(parseInt(event.target.value));
  };
  const onLevelChange = (event: any) => {
    setSelectedClass(0);
    setSelectedLevel(parseInt(event.target.value));
  };
  const onClassChange = (event: any) => {
    setSelectedClass(parseInt(event.target.value));
  };
  const onSearchFieldChange = (event: any) => {
    setSearchField(event.target.value.toLowerCase());
  };

  const filteredStudentMajor: StudentInterface[] =
    selectedMajor !== 0
      ? students.result.filter(
          (student: StudentInterface) => student.student_major === selectedMajor
        )
      : students.result;

  const filteredStudentLevel: StudentInterface[] =
    selectedLevel !== 0
      ? filteredStudentMajor.filter((student: StudentInterface) => {
          return student.student_level === selectedLevel;
        })
      : filteredStudentMajor;

  const filteredStudentClass: StudentInterface[] =
    selectedClass !== 0
      ? filteredStudentLevel.filter(
          (student: StudentInterface) => student.student_class === selectedClass
        )
      : filteredStudentLevel;

  const filteredStudents: StudentInterface[] = filteredStudentClass.filter(
    (student: StudentInterface) => {
      if (has_number(searchField)) {
        return student.student_ID.toString().includes(searchField);
      } else {
        return (student.student_first_name + student.student_last_name)
          .toLowerCase()
          .includes(searchField);
      }
    }
  );

  useEffect(() => {
    fetchStudents();
  }, [students]);

  const { t } = useTranslation("page_students");

  return (
    <>
      <PageHeader
        icon="fa-solid fa-graduation-cap"
        text={t("header")}
        subtext={studentCount}
      />

      <div className="flex flex-col gap-8">
        <MajorContextProvider>
          <Student_filters
            selectedMajor={selectedMajor}
            selectedLevel={selectedLevel}
            onMajorChangeHandler={onMajorChange}
            onLevelChangeHandler={onLevelChange}
            onClassChangeHandler={onClassChange}
            onSearchFieldChangeHandler={onSearchFieldChange}
          />
        </MajorContextProvider>

        {students.status ? (
          <Student_rolodex filteredStudents={filteredStudents} />
        ) : (
          <Skeleton_Rolodex />
        )}
      </div>
    </>
  );
};

export default fade_transition(Students);
