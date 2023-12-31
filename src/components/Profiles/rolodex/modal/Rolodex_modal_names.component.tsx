import i18n from "i18next";

interface CurrentComponentProp {
  object: any;
}

const Rolodex_modal_names = (props: CurrentComponentProp) => {
  const { object } = props;

  return (
    <div className="w-[200px] sm:w-full">
      {i18n.language === "th" ? (
        <>
          <h1 className="mb-2 text-2xl font-semibold line-clamp-4">
            {object.first_name_thai} {object.last_name_thai}
          </h1>
          <h1 className="text-xl">
            {object.first_name} {object.last_name}
          </h1>
        </>
      ) : (
        <>
          <h1 className="mb-2 text-2xl font-semibold line-clamp-4">
            {object.first_name} {object.last_name}
          </h1>
          <h1 className="text-xl">
            {object.first_name_thai} {object.last_name_thai}
          </h1>
        </>
      )}
      {object.nickname && object.nickname_thai && (
        <h1 className="mt-2 text-xl font-semibold line-clamp-4">
          {i18n.language === "th"
            ? `${object.nickname_thai} · ${object.nickname}`
            : `${object.nickname} · ${object.nickname_thai}`}
        </h1>
      )}
    </div>
  );
};

export default Rolodex_modal_names;
