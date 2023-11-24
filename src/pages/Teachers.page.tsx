import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TeacherInterface } from "../interfaces/user.interface";
import fade_transition from "../animations/fade_transition.transition";
// Functions //
import { has_number } from "../functions/string.function";
// Contexts //
import { MajorContextProvider } from "../contexts/Major.context";
import { useContext_Teachers } from "../contexts/Teacher.context";
// Components //
import PageHeader from "../components/miscellaneous/common/PageHeader.component";
import Teachers_filters from "../components/Profiles/Teacher/filters/Teachers_filters.component";
import Teachers_rolodex from "../components/Profiles/Teacher/Teachers_rolodex.component";
import Skeleton_Rolodex from "../components/Profiles/rolodex/Skeleton_Profiles_Rolodex.component";

const Teachers = () => {
  const { teachers, teacherCount, fetchTeachers } = useContext_Teachers();

  const [selectedMajor, setSelectedMajor] = useState(0);
  const [searchField, setSearchField] = useState("");

  const onMajorChange = (event: any) => {
    setSelectedMajor(parseInt(event.target.value));
  };
  const onSearchFieldChange = (event: any) => {
    setSearchField(event.target.value.toLowerCase());
  };

  const filteredTeacherMajor: TeacherInterface[] =
    selectedMajor !== 0
      ? teachers.result.filter(
          (teacher: TeacherInterface) => teacher.teacher_major === selectedMajor
        )
      : teachers.result;

  const filteredTeachers: TeacherInterface[] = filteredTeacherMajor.filter(
    (teacher: TeacherInterface) => {
      if (has_number(searchField)) {
        return teacher.teacher_ID.toString().includes(searchField);
      } else {
        return (teacher.teacher_first_name + teacher.teacher_last_name)
          .toLowerCase()
          .includes(searchField);
      }
    }
  );

  useEffect(() => {
    fetchTeachers();
  }, [teachers]);

  const { t } = useTranslation("page_teachers");

  return (
    <>
      <PageHeader
        icon="fa-solid fa-chalkboard-user"
        text={t("header")}
        subtext={teacherCount}
      />

      <div className="flex flex-col gap-8">
        <MajorContextProvider>
          <Teachers_filters
            onMajorChangeHandler={onMajorChange}
            onSearchFieldChangeHandler={onSearchFieldChange}
          />
        </MajorContextProvider>

        {teachers.status ? (
          <Teachers_rolodex filteredTeachers={filteredTeachers} />
        ) : (
          <Skeleton_Rolodex />
        )}
      </div>
    </>
  );
};

export default fade_transition(Teachers);
