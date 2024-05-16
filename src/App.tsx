import TitleBar from "./components/TitleBar.tsx";
import CurrentFilms from "./components/CurrentFilms.tsx";
import FutureFilms from "./components/FutureFilms.tsx";
import NewCategory from "./components/NewCategory.tsx";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

function App() {
  return (
    <>
      <Theme className="text-white text-base font-kannada cursor-default">
        <TitleBar />
        <CurrentFilms />
        <FutureFilms />
        <NewCategory />
      </Theme>
    </>
  );
}

export default App;