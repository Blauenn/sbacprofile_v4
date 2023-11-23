import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import { ClassroomInterface } from "../../../../interfaces/common.interface";

interface ClassFilterProps {
  classes: ClassroomInterface[];
  onChangeHandler: () => void;
}

const Student_filter_class = (props: ClassFilterProps) => {
  const { classes, onChangeHandler } = props;

  const { t } = useTranslation("rolodex_filters");

  const sortedClasses = classes.sort(
    (a: ClassroomInterface, b: ClassroomInterface) =>
      a.classroom_class - b.classroom_class
  );

  if (sortedClasses?.length > 0) {
    return (
      <TextField
        label={t("label_class")}
        select
        onChange={onChangeHandler}
        className="w-full"
        SelectProps={{ native: true }}
        InputProps={{ sx: { borderRadius: 3, background: "#FFFFFF" } }}>
        <option value="0">{t("option_all_title")}</option>
        {sortedClasses.map((classroom: ClassroomInterface) => (
          <option
            key={classroom.classroom_ID}
            value={classroom.classroom_class}>
            {classroom.classroom_class}
          </option>
        ))}
      </TextField>
    );
  } else {
    return (
      <TextField
        label={t("label_class")}
        select
        disabled
        onChange={onChangeHandler}
        className="w-full"
        SelectProps={{ native: true }}
        InputProps={{ sx: { borderRadius: 3 } }}>
        <option value="0">{t("option_all_title")}</option>
      </TextField>
    );
  }
};

export default Student_filter_class;
