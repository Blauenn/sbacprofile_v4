import Custom_Modal from "../../../Custom/Custom_modal";
import i18n from "../../../../i18n";
// Components //
import Rolodex_modal_image from "./Rolodex_modal_image.component";
import Rolodex_modal_names from "./Rolodex_modal_names.component";
import Rolodex_modal_majorAndClassroom from "./Rolodex_modal_majorAndClassroom.component";
// Contexts //
import { ClassroomContextProvider } from "../../../../contexts/Classroom.context";
import Rolodex_modal_contacts from "./Rolodex_modal_contacts.component";

interface CurrentComponentProp {
  profile: string;
  object: any;
  open: boolean;
  onModalClose: () => void;
}

const Rolodex_modal = (props: CurrentComponentProp) => {
  const { profile, object, open, onModalClose } = props;

  // Icons for the modal header to display. //
  let profileIcon;
  if (profile === "teacher") {
    profileIcon = "fa-solid fa-chalkboard-user";
  } else {
    profileIcon = "fa-solid fa-graduation-cap";
  }

  return (
    <Custom_Modal
      open={open}
      onModalClose={onModalClose}
      icon={profileIcon}
      title={
        i18n.language === "th"
          ? `${object.first_name_thai} ${object.last_name_thai}`
          : `${object.first_name} ${object.last_name}`
      }>
      <div className="flex flex-col lg:flex-row lg:gap-12 px-2">
        <div className="flex items-center flex-col gap-1 mb-4 | w-full lg:mb-0 lg:w-1/2">
          <Rolodex_modal_image image={object.image} major={object.major} />
          <h1 className="font-semibold opacity-75">{object.ID}</h1>
        </div>
        <div className="flex justify-start items-start flex-col px-4 lg:px-0 lg:mt-4">
          <div className="flex flex-col gap-4">
            <Rolodex_modal_names object={object} />
            <ClassroomContextProvider>
              <Rolodex_modal_majorAndClassroom
                object={object}
                profile={profile}
              />
            </ClassroomContextProvider>
            <div className="w-11/12 lg:w-full">
              <Rolodex_modal_contacts object={object} />
            </div>
          </div>
        </div>
      </div>
    </Custom_Modal>
  );
};

export default Rolodex_modal;
