import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../../i18n";
import { TextField } from "@mui/material";
import { MajorInterface } from "../../../../interfaces/common.interface";
// Contexts //
import { useContext_Majors } from "../../../../contexts/Major.context";
// Constants //
import {
    major_name_thai,
    major_name_german,
    major_name,
} from "../../../../constants/names/major_name";

interface CurrentComponentProp {
  onMajorChangeHandler: any;
  onSearchFieldChangeHandler: any;
}

const Teacher_filters = (props: CurrentComponentProp) => {
  const { onMajorChangeHandler, onSearchFieldChangeHandler } = props;

  const { majors, fetchMajors } = useContext_Majors();

  const { t } = useTranslation("rolodex_filters");

  useEffect(() => {
    fetchMajors();
  }, []);

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
      {/* Search */}
      <div className="md:w-1/3">
        <TextField
          label={t("placeholder_search")}
          className="w-full"
          onChange={onSearchFieldChangeHandler}
          InputProps={{ sx: { borderRadius: 3, background: "#FFFFFF" } }}
        />
      </div>
    </div>
  );
};

export default Teacher_filters;
