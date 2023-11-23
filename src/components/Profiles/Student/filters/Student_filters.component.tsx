import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import i18n from "../../../../i18n";
import axios, { AxiosResponse } from "axios";
import {
  ClassroomInterface,
  MajorInterface,
} from "../../../../interfaces/common.interface";
// Components //
import Student_filter_class from "./Student_filter_class.component";
// Contexts //
import { useContext_Majors } from "../../../../contexts/Major.context";
// Constants //
import {
  level_name,
  level_name_german,
  level_name_thai,
} from "../../../../constants/names/level_name";
import {
  major_name_thai,
  major_name_german,
  major_name,
} from "../../../../constants/names/major_name";
import { API_ENDPOINT } from "../../../../constants/ENDPOINTS";

interface CurrentComponentProp {
  onSearchFieldChangeHandler: any;
  onMajorChangeHandler: any;
  onLevelChangeHandler: any;
  onClassChangeHandler: any;
  selectedLevel: number;
  selectedMajor: number;
}

const postClassrooms = async (level: number, callback: any) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${API_ENDPOINT}/api/v1/classroom/getClassroomByLevel`,
      { level },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    callback(response.data.result);
  } catch (error) {
    callback([]);
  }
};

const Student_filters = (props: CurrentComponentProp) => {
  const {
    selectedMajor,
    selectedLevel,
    onMajorChangeHandler,
    onLevelChangeHandler,
    onClassChangeHandler,
    onSearchFieldChangeHandler,
  } = props;

  const { majors, fetchMajors } = useContext_Majors();

  const [lowerLevel1, setLowerLevel1] = useState([]);
  const [lowerLevel2, setLowerLevel2] = useState([]);
  const [lowerLevel3, setLowerLevel3] = useState([]);
  const [higherLevel1, setHigherLevel1] = useState([]);
  const [higherLevel2, setHigherLevel2] = useState([]);

  // Fetch levels //
  useEffect(() => {
    fetchMajors();

    postClassrooms(1, setLowerLevel1);
    postClassrooms(2, setLowerLevel2);
    postClassrooms(3, setLowerLevel3);
    postClassrooms(4, setHigherLevel1);
    postClassrooms(5, setHigherLevel2);
  }, []);

  const allClasses = [
    [],
    lowerLevel1,
    lowerLevel2,
    lowerLevel3,
    higherLevel1,
    higherLevel2,
  ];
  const newArray = allClasses.concat();
  const filteredClass =
    selectedMajor == 0
      ? allClasses[selectedLevel]
      : newArray[selectedLevel].filter(
          (classroom: ClassroomInterface) =>
            classroom.classroom_major == selectedMajor
        );

  const { t } = useTranslation("rolodex_filters");

  return (
    <div className="flex-col md:flex-row | flex justify-between gap-4">
      {/* Major */}
      <div className="flex md:w-1/3">
        <TextField
          label={t("label_major")}
          select
          onChange={onMajorChangeHandler}
          className="w-full"
          SelectProps={{ native: true }}
          InputProps={{ sx: { borderRadius: 3, background: "#FFFFFF" } }}>
          <option value="0">{t("option_all_title")}</option>
          {majors.result.map((major: MajorInterface) => (
            <option key={major.major_ID} value={major.major_ID}>
              {i18n.language === "th"
                ? major_name_thai[major.major_ID]
                : i18n.language === "de"
                ? major_name_german[major.major_ID]
                : major_name[major.major_ID]}
            </option>
          ))}
        </TextField>
      </div>
      <div className="flex justify-between flex-row gap-2 md:w-1/3">
        {/* Level */}
        <TextField
          label={t("label_level")}
          select
          onChange={onLevelChangeHandler}
          className="w-full"
          SelectProps={{ native: true }}
          InputProps={{ sx: { borderRadius: 3, background: "#FFFFFF" } }}>
          <option value="0">{t("option_all_title")}</option>
          <option value="1">
            {i18n.language === "th"
              ? level_name_thai[1]
              : i18n.language === "de"
              ? level_name_german[1]
              : level_name[1]}
          </option>
          <option value="2">
            {i18n.language === "th"
              ? level_name_thai[2]
              : i18n.language === "de"
              ? level_name_german[2]
              : level_name[2]}
          </option>
          <option value="3">
            {i18n.language === "th"
              ? level_name_thai[3]
              : i18n.language === "de"
              ? level_name_german[3]
              : level_name[3]}
          </option>
          <option value="4">
            {i18n.language === "th"
              ? level_name_thai[4]
              : i18n.language === "de"
              ? level_name_german[4]
              : level_name[4]}
          </option>
          <option value="5">
            {i18n.language === "th"
              ? level_name_thai[5]
              : i18n.language === "de"
              ? level_name_german[5]
              : level_name[5]}
          </option>
        </TextField>
        {/* Class */}
        <Student_filter_class
          onChangeHandler={onClassChangeHandler}
          classes={filteredClass}
        />
      </div>
      {/* Search */}
      <div className="md:w-1/3">
        <TextField
          label={t("label_search")}
          className="w-full"
          onChange={onSearchFieldChangeHandler}
          InputProps={{ sx: { borderRadius: 3, background: "#FFFFFF" } }}
        />
      </div>
    </div>
  );
};

export default Student_filters;
