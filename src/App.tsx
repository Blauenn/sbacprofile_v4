import { Suspense } from "react";

const App = () => {
  return (
    <div className="flex flex-row">
      <div className="relative ms-20 me-8 my-16 | sm:ms-32 sm:me-20 sm:my-20 | lg:ms-40 lg:me-28 | w-full">
        <Suspense>
          <h1>UwU</h1>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
